import 'dart:io';
import 'package:flutter/material.dart';
import 'package:path/path.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:mobile/models/product.dart';
//import 'package:mobile/routes/notifications.dart';
import 'package:mobile/models/notification_item.dart';

class Service {
  static final CollectionReference productCollection =
      FirebaseFirestore.instance.collection('products');

  static final CollectionReference userCollection =
      FirebaseFirestore.instance.collection('Users');

  static final CollectionReference notificationCollection =
      FirebaseFirestore.instance.collection('notifications');

  static final CollectionReference ordersCollection =
      FirebaseFirestore.instance.collection("orders");

  static DocumentReference getProductReference(String id) {
    return FirebaseFirestore.instance.collection("products").doc(id);
  }

  static Future<DocumentReference> getSellerReferenceByPID(String pid) async {
    return (await productCollection.doc(pid).get())["seller"];
  }

  static Future addUser(String uid, String? name) async {
    userCollection.doc(uid).set({
      'notificationIDs': [1],
      'sellerName': name
    });
  }

  Future updateProductRating(String productID, num ratingGiven) async {
    var productRef = productCollection.doc(productID);
    num timesRated = (await productRef.get()).get("timesRated") ?? 0;
    num currentRating = (await productRef.get()).get("rating") ?? 0;
    num totalRating = timesRated * currentRating;
    timesRated++;
    totalRating += ratingGiven;
    totalRating /= timesRated;
    num finalRating = totalRating;
    productRef.update({
      'timesRated': timesRated,
      'rating': finalRating,
    });
  }

  Future addProductComment(String orderID, String currentComment) async {
    var OrderRef = ordersCollection.doc(orderID);
    OrderRef.update({
      'comment': currentComment,
    });
  }

  Future updateOrderAsCommented(String orderID) async {
    var OrderRef = ordersCollection.doc(orderID);
    OrderRef.update({
      'isCommented': true,
    });
  }

  Future updateOrderAsRated(String orderID) async {
    var OrderRef = ordersCollection.doc(orderID);
    OrderRef.update({
      'isRated': true,
    });
  }

  Future setOrderRating(String orderID, num givenRating) async {
    var OrderRef = ordersCollection.doc(orderID);
    OrderRef.update({
      'rating': givenRating,
    });
  }

  Future approveComment(
    String orderID,
  ) async {
    var OrderRef = ordersCollection.doc(orderID);
    OrderRef.update({
      'commentApproved': true,
    });
  }

  Future addProduct(
      String category,
      String name,
      num price,
      DocumentReference seller,
      String tag,
      File picture,
      num stocks,
      String description,
      bool onSale,
      num? oldPrice) async {
    var productRef = await productCollection.add({
      'productName': name,
      'rating': 0.0,
      'seller': seller,
      'price': price,
      'onSale': onSale,
      'description': description,
      'imgURL': "",
      'oldPrice': oldPrice,
      'category': category,
      'stocks': stocks,
      'tag': tag,
      'timesRated': 0,
    });

    var ref = FirebaseStorage.instance.ref();
    String filepath =
        "/productImages/${productRef.id}${extension(picture.path)}";
    await ref.child(filepath).putFile(picture);
    String productPictureURL = await ref.child(filepath).getDownloadURL();
    await productRef.update({"imgURL": productPictureURL});
  }

  Future editProduct(
      String id,
      String category,
      String name,
      num price,
      String tag,
      File? picture,
      num stocks,
      String description,
      bool onSale,
      num? oldPrice) async {
    var productRef = productCollection.doc(id);
    if (picture == null) {
      productRef.update({
        'productName': name,
        'price': price,
        'onSale': onSale,
        'description': description,
        'oldPrice': oldPrice,
        'category': category,
        'stocks': stocks,
        'tag': tag,
//        'rating': price,
      });
    } else {
      String oldURL = (await productRef.get()).get("picture");
      var ref = FirebaseStorage.instance.refFromURL(oldURL);
      await ref.delete();
      await ref.putFile(picture);
      String productPictureURL = await ref.getDownloadURL();
      await productRef.update({
        'productName': name,
        'price': price,
        'onSale': onSale,
        'description': description,
        'oldPrice': oldPrice,
        'category': category,
        'tag': tag,
        'stocks': stocks,
        "picture": productPictureURL,
      });
    }
  }

  Future deleteProduct(String pid) async {
    var productRef = productCollection.doc(pid);
    await productRef.update({"stocks": -1});
  }

  Future<Product> getTheProduct(String pid) async {
    var doc = await productCollection.doc(pid).get();
    DocumentReference sellerRef = doc["seller"];
    String sname = (await sellerRef.get()).get("sellerName") ?? "undefined";
    Product product = Product(
      pid: doc.id,
      category: doc["category"],
      description: doc["description"],
      imgURL: doc["imgURL"],
      onSale: doc["onSale"],
      price: doc["price"],
      oldPrice: doc["oldPrice"],
      productName: doc["productName"],
      rating: doc["rating"],
      seller: sname,
      stocks: doc["stocks"],
      tag: doc["tag"],
    );
    return product;
  }

  Future<List<Product>> getProducts() async {
    QuerySnapshot allProductsQuery = await productCollection.get();
    List<Product> list = [];
    for (var doc in allProductsQuery.docs) {
      DocumentReference sellerRef = doc["seller"];
      var sellerRefGetter = await sellerRef.get();
      String sname = sellerRefGetter.get("sellerName") ?? "unknown";
      num stock = doc["stocks"];
      if (stock > 0) {
        list.add(Product(
            pid: doc.id,
            imgURL: doc["imgURL"],
            productName: doc["productName"],
            rating: doc["rating"],
            price: doc["price"],
            seller: sname,
            description: doc["description"],
            category: doc["category"],
            tag: doc["tag"],
            stocks: doc["stocks"],
            oldPrice: doc["oldPrice"],
            onSale: doc["onSale"]));
      }
    }

    print("DB: " + list.length.toString());
    print(list);
    return list;
  }

  Future<List<Product>> getSearchResults(query) async {
    List<Product> list = [];
    /*   var products = await FirebaseFirestore.instance.collection('products')
        .where('productName', isGreaterThanOrEqualTo: query,

      isLessThan: query.substring(0, query.length - 1) +
          String.fromCharCode(query.codeUnitAt(query.length - 1) + 1),

    ).get();*/
    var products =
        await FirebaseFirestore.instance.collection('products').get();

    for (var doc in products.docs) {
      num stock = doc["stocks"];
      if (stock > 0) {
        if ((doc["productName"])
            .toString()
            .toLowerCase()
            .contains(query.toString().toLowerCase())) {
          DocumentReference sellerRef = doc["seller"];
          String sname = (await sellerRef.get()).get("sellerName") ?? "unknown";

          list.add(Product(
              pid: doc.id,
              imgURL: doc["imgURL"],
              productName: doc["productName"],
              rating: doc["rating"],
              price: doc["price"],
              seller: sname,
              description: doc["description"],
              category: doc["category"],
              tag: doc["tag"],
              stocks: doc["stocks"],
              onSale: doc["onSale"],
              oldPrice: doc["oldPrice"]));
        }

        else if ((doc["tag"])
            .toString()
            .toLowerCase()
            .contains(query.toString().toLowerCase())) {
          DocumentReference sellerRef = doc["seller"];
          String sname = (await sellerRef.get()).get("sellerName") ?? "unknown";
          list.add(Product(
              pid: doc.id,
              imgURL: doc["imgURL"],
              productName: doc["productName"],
              rating: doc["rating"],
              price: doc["price"],
              seller: sname,
              description: doc["description"],
              category: doc["category"],
              tag: doc["tag"],
              stocks: doc["stocks"],
              onSale: doc["onSale"],
              oldPrice: doc["oldPrice"]));
        }
        else if ((doc["category"])
            .toString()
            .toLowerCase()
            .contains(query.toString().toLowerCase())) {
          DocumentReference sellerRef = doc["seller"];
          String sname = (await sellerRef.get()).get("sellerName") ?? "unknown";
          list.add(Product(
              pid: doc.id,
              imgURL: doc["imgURL"],
              productName: doc["productName"],
              rating: doc["rating"],
              price: doc["price"],
              seller: sname,
              description: doc["description"],
              category: doc["category"],
              tag: doc["tag"],
              stocks: doc["stocks"],
              onSale: doc["onSale"],
              oldPrice: doc["oldPrice"]));
        }
      }
    }

    return list;
  }

  FirebaseCrashlytics crashlytics = FirebaseCrashlytics.instance;
  void doesExist(String src, var results) {
    bool ch = false;
    for (int i = 0; i < results.length; i++) {
      if (src == results[i].identifier || src == results[i].description)
        ch = true;
    }
    if (ch == false) {
      crashlytics.setCustomKey("Product not found: ", src);
    }
  }

  pushNotifications(String userID, String message) async {
    userCollection.doc(userID).update({
      "notifications": FieldValue.arrayUnion([message]),
    });
  }

  getNotifications(String userID) async {
    var userQuery = await userCollection.get();
    List notificationIDs = [];

    userQuery.docs.forEach((doc) {
      if (userID == doc.id) {
        notificationIDs.addAll(doc["notificationIDs"]);
      }
    });

    List<NotificationItem> notifications = [];
    var notificationQuery = await notificationCollection.get();

    notificationQuery.docs.forEach((element) {
      notificationIDs.forEach((item) {
        if (item.toString() == element.id.toString()) {
          notifications.add(NotificationItem(message: element["content"]));
        }
      });
    });
    return notifications;
  }
}
