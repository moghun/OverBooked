import 'dart:convert';

import 'package:mobile/models/order.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';
import 'package:http/http.dart' as http;

class OrderService {
  final apiBaseURL = "http://10.0.2.2:5001/api";

  Future<List<Order>> getUserOrders() async {
    User user = UserService.getCurrentUser()!;
    print(user.uid!);
    var res = await http.get(
      Uri.parse(apiBaseURL + "/orders/findM/" + user.email),
      headers: {"Content-Type": "application/json"},
    );
    print(res.body);
    var orderListJson = jsonDecode(res.body) as List;
    var orderList = orderListJson.map((order) =>
      Order(
          id: order["_id"],
          cost: order["cost"],
          boughtProducts: order["bought_products"],
          amounts: order["amounts"],
          buyerEmail: order["buyer_email"],
          //date: order["date"]["\$date"],
          status: order["status"])
    ).toList();
    return orderList;
  }
}
