import 'dart:convert';

import 'package:mobile/models/order.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/product_service.dart';
import 'package:mobile/services/user_service.dart';
import 'package:http/http.dart' as http;

class OrderService {
  final apiBaseURL = "http://10.0.2.2:5001/api";

  Future<List<Order>> getUserOrders() async {
    User user = UserService.getCurrentUser()!;
    var res = await http.get(
      Uri.parse(apiBaseURL + "/orders/findM/" + user.email),
      headers: {"Content-Type": "application/json"},
    );
    var orderListJson = jsonDecode(res.body) as List;
    var orderList = orderListJson
        .map((order) => Order(
            id: order["_id"],
            cost: order["cost"],
            boughtProducts: order["bought_products"],
            amounts: order["amounts"],
            buyerEmail: order["buyer_email"],
            date: order["date"],
            status: order["status"]))
        .toList();
    return orderList;
  }

  Future<List<Product>> getProductsInOrder(Order order) async {
    ProductService productService = ProductService();
    List<Product> products = [];
    for (int i = 0; i < order.boughtProducts!.length; i++) {
      Product product = await productService.getProduct(order.boughtProducts![i]);
      products.add(product);
    }
    return products;
  }

  returnOrder(String orderID) {
    User user = UserService.getCurrentUser()!;
    final body = jsonEncode({"refundDescription": "I would like to return this order, thank you."});
    http.put(
      Uri.parse(apiBaseURL + "/orders/requestReturn/" + user.uid! + "/" + orderID),
      body: body,
      headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!},
    ).then((value) => print(value.body));
  }

  cancelOrder(String orderID) {
    User user = UserService.getCurrentUser()!;
    http.put(
      Uri.parse(apiBaseURL + "/orders/cancel/" + user.uid! + "/" + orderID),
      headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!},
    ).then((value) => print(value.body));
  }
}
