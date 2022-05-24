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
      UserService.userCart.add({"product_id": product.id, "amount": amount});
    } else {
      var toBeAdded = {"product_id": product.id, "amount": amount};
      user.cart!.add(toBeAdded);
      var body = jsonEncode(toBeAdded);
      http.put(Uri.parse(apiBaseURL + "/users/addToCart/" + user.uid!),
          headers: {
            "Content-Type": "application/json",
            "token": "Bearer " + user.token!
          },
          body: body);
    }
  }

  removeFromCart(Product product, int amount) {
    User? user = UserService.getCurrentUser();
    if (user == null) {
    } else {
      var toBeRemoved = {"product": product.id, "amount": amount};
      user.cart!.remove(toBeRemoved);
      var body = jsonEncode(toBeRemoved);
      http.put(Uri.parse(apiBaseURL + "/users/removeFromCart/" + user.uid!),
          headers: {
            "Content-Type": "application/json",
            "token": "Bearer " + user.token!
          },
          body: body);
    }
  }

  clearCart() {
    User? user = UserService.getCurrentUser();
    if (user == null) {
      UserService.userCart.clear();
    } else {
      http.put(Uri.parse(apiBaseURL + "/users/clearCart/" + user.uid!),
          headers: {
            "Content-Type": "application/json",
            "token": "Bearer " + user.token!
          });
    }
  }

  purchaseCart(List<dynamic> products) {
    User user = UserService.getCurrentUser()!;
    var totalCost = 0;
    for (int i = 0; i < user.cart!.length; i++) {
      totalCost +=
          (products[i].cost as int) * user.cart![i]["amount"] as int;
    }
    List<String> boughtProducts =
        user.cart!.map((e) => e["product_id"].toString()).toList();
    final body = jsonEncode({
      "buyer_email": user.email,
      "status": "shipped",
      "cost": totalCost,
      "date": DateTime.now().toIso8601String(),
      "bought_products": boughtProducts,
      "amounts": user.cart!.map((e) => e["amount"]).toList(),
    });
    http
        .post(Uri.parse(apiBaseURL + "/orders/"),
            headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!},
            body: body)
        .then((resp) => print(resp.body + resp.statusCode.toString()));
    UserService.updateUser(User(
      username: user.username,
      cart: [],
      email: user.email,
      uid: user.uid,
      name: user.name,
      surname: user.surname,
      token: user.token,
    ));
  }
}
