import 'dart:convert';
import 'dart:math';
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

  addToCart(Product product) {

  }

  removeFromCart(Product product) {

  }

  deleteCart() {

  }

  purchaseCart(List<dynamic> products) {
    User user = UserService.getCurrentUser()!;
    var totalCost = 0;
    for (int i = 0; i < user.cart!.length; i++) {
      totalCost +=
          (products[i].cost as int) * int.parse(user.cart![i]["amount"]);
    }
    List<String> boughtProducts =
    user.cart!.map((e) => e["product_id"].toString()).toList();
    final body = jsonEncode({
      "buyer_email": user.email,
      "status": "shipped",
      "cost": totalCost,
      "date": DateTime.now().toIso8601String(),
      "bought_products": boughtProducts,
      "amounts": user.cart!.map((e) => int.parse(e["amount"])).toList(),
    });
    http
        .post(Uri.parse(apiBaseURL + "/orders/"),
        headers: {"Content-Type": "application/json", "token": user.token!},
        body: body)
        .then((resp) => print(resp.body + resp.statusCode.toString()));
    UserService.updateUser(User(username: user.username,
      cart: [],
      email: user.email,
      uid: user.uid,
      name: user.name,
      surname: user.surname,
      token: user.token,
    ));
  }
}
