import 'dart:convert';
import 'package:mobile/models/product.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';
import 'package:uuid/uuid.dart';

class ProductService {
  final apiBaseURL = "http://10.0.2.2:5001/api/products";

  Future<Product> getProduct(String productID) async {
    var resp = await http.get(Uri.parse(apiBaseURL + "/find/" + productID));
    if (resp.statusCode >= 200 && resp.statusCode < 400) {
      var productJson = jsonDecode(resp.body);
      return Product.fromJson(productJson);
    } else {
      print(resp.statusCode);
      print(resp.body);
      print(resp.headers);
      return Product(id: "1234", name: "not found", cost: 123, amount: 2);
    }
  }

  Future<List<Product>?> getAllProducts() async {
    try {
      var resp = await http.get(Uri.parse(apiBaseURL + "/"));
      if (resp.statusCode >= 200 && resp.statusCode < 400) {
        var productsJson = jsonDecode(resp.body) as List;
        print(productsJson[0]["product_id"]);
        print(productsJson[1]["product_id"]);
        print(productsJson[2]["product_id"]);
        print(productsJson[3]["product_id"]);
        print(productsJson[4]["product_id"]);
        print(productsJson[5]["product_id"]);
        print(productsJson[6]["product_id"]);
        print(productsJson[7]["product_id"]);
        List<Product> products = productsJson.map((prod) => Product.fromJson(prod)).toList();
        print(products);
        return products;
      } else {
        print(resp.statusCode);
        print(resp.body);
        print(resp.headers);
      }
    } catch (e) {
      print(e.toString());
    }
    return null;
  }

  Future<List<Product>> getProductsBySearch(String query) async {
    var resp = await http.get(Uri.parse(apiBaseURL + "/find?q=" + query),
        headers: {"Content-Type": "application/json"});
    var productsJson = jsonDecode(resp.body) as List;
    List<Product> products = productsJson.map((prod) => Product.fromJson(prod)).toList();
    return products;
  }

  addCommentOnProduct(String productID, String comment, num rating) {
    const uuid = Uuid();
    final body = jsonEncode({
      "comment_id": uuid.v1(),
      "user_id": UserService.getCurrentUser()!.uid,
      "comment": comment,
      "isApproved": false,
    });
    http
        .put(Uri.parse(apiBaseURL + "/comment/" + productID),
            headers: {
              "Content-Type": "application/json",
              "token": "Bearer " + UserService.getCurrentUser()!.token!
            },
            body: body)
        .then((value) => print(value.body));

    final body2 = jsonEncode({"user_id": UserService.getCurrentUser()!.uid, "rating": rating});

    http
        .put(Uri.parse(apiBaseURL + "/rate/" + productID),
            headers: {
              "Content-Type": "application/json",
              "token": "Bearer " + UserService.getCurrentUser()!.token!
            },
            body: body2)
        .then((value) => print(value.body));
  }

  Future<List<dynamic>> getMyOrders() async {
    User user = UserService.getCurrentUser()!;
    var resp =
        await http.get(Uri.parse("http://10.0.2.2:5001/api/orders/find/" + user.uid!), headers: {
      "Content-Type": "application/json",
    });
    print(resp.body);
    var productsJson = jsonDecode(resp.body) as List;
    print(productsJson);
    return productsJson;
  }

  Future<User> getUserByID(String userID) async {
    var resp = await http.get(Uri.parse("http://10.0.2.2:5001/api/users/find/" + userID),
        headers: {"Content-Type": "application/json"});
    print(resp.body);
    var userInfo = jsonDecode(resp.body);
    User user = User(
      email: userInfo["email"],
      username: userInfo["username"],
      name: userInfo["name"] == "" ? "no-name" : userInfo["name"],
      surname: userInfo["surname"] == "" ? "no-surname" : userInfo["surname"],
      cart: userInfo["cart"],
      uid: userInfo["_id"],
    );
    return user;
  }

  Future<List<User>> getUsersByCommentList(List<dynamic> commentList) async {
    List<User> users = [];
    for (int i = 0; i < commentList.length; i++) {
      User tempUser = await getUserByID(commentList[i]["user_id"]);
      users.add(tempUser);
    }
    return users;
  }
}
