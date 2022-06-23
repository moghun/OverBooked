import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/models/product.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/product_service.dart';
import 'package:mobile/services/user_service.dart';

class CartService {
  final apiBaseURL = "http://10.0.2.2:5001/api";
  final ProductService _productService = ProductService();

  Future<List<dynamic>> getProductsByCart(List<dynamic> cart) async {
    final List<dynamic> result = [];
    for (int i = 0; i < cart.length; i++) {
      result.add(await _productService.getProduct(cart[i]["product_id"]));
    }
    print(result);
    return result;
  }

  addToCart(Product product, int amount) {
    User? user = UserService.getCurrentUser();
    if (user == null) {
      bool exists = false;
      for (int i = 0; i < UserService.userCart.length; i++) {
        if (UserService.userCart[i]["product_id"] == product.id) {
          exists = true;
          UserService.userCart[i]["amount"] += amount;
        }
      }
      if (!exists) {
        UserService.userCart.add({"product_id": product.id, "amount": amount});
      }
    } else {
      bool exists = false;
      for (int i = 0; i < user.cart!.length; i++) {
        if (product.id == user.cart![i]["product_id"]) {
          exists = true;
          user.cart![i]["amount"] += amount;
        }
      }
      var toBeAdded = {"product_id": product.id, "amount": amount};
      if (!exists) {
        user.cart!.add(toBeAdded);
      }
      var body = jsonEncode(toBeAdded);
      http.put(Uri.parse(apiBaseURL + "/users/addToCart/" + user.uid!),
          headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!},
          body: body);
    }
  }

  removeFromCart(Product product) {
    User? user = UserService.getCurrentUser();
    if (user == null) {
      for (int i = 0; i < UserService.userCart.length; i++) {
        if (UserService.userCart[i]["product_id"] == product.id) {
          UserService.userCart.removeAt(i);
        }
      }
    } else {
      var toBeRemoved = {"product_id": product.id};
      for (int i = 0; i < user.cart!.length; i++) {
        if (user.cart![i]["product_id"] == product.id) {
          user.cart!.removeAt(i);
        }
      }
      var body = jsonEncode(toBeRemoved);
      http.put(Uri.parse(apiBaseURL + "/users/removeFromCart/" + user.uid!),
          headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!},
          body: body).then((value) => print(value.body));
    }
  }

  clearCart() {
    User? user = UserService.getCurrentUser();
    if (user == null) {
      UserService.userCart.clear();
    } else {
      User user = UserService.getCurrentUser()!;
      user.cart!.clear();
      UserService.updateUser(user);
      http.put(Uri.parse(apiBaseURL + "/users/clearCart/" + user.uid!), headers: {
        "Content-Type": "application/json",
        "token": "Bearer " + user.token!
      }).then((value) => print(value.body));
    }
  }

  purchaseCart(List<dynamic> products) {
    User user = UserService.getCurrentUser()!;
    // CREATE ORDER
    double totalCost = 0;
    for (int i = 0; i < user.cart!.length; i++) {
      totalCost += (products[i].cost) * user.cart![i]["amount"];
    }
    List<String> boughtProducts = user.cart!.map((e) => e["product_id"].toString()).toList();
    final body = jsonEncode({
      "buyer_email": user.email,
      "status": "Processing",
      "cost": totalCost,
      "date": DateTime.now().toIso8601String(),
      "bought_products": boughtProducts,
      "amounts": user.cart!.map((e) => e["amount"]).toList(),
      "last_four_digit": 4242,
      "payment_method": "CreditCard",
      "user_adress": "Sabanci, Tuzla",
    });
    http
        .post(Uri.parse(apiBaseURL + "/orders/"),
            headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!},
            body: body)
        .then((resp) => print(resp.body + resp.statusCode.toString()));
  }
}
