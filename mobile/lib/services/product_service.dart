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
        List<Product> products = productsJson.map((prod) => Product.fromJson(prod)).toList();
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
    var productsJson = jsonDecode(resp.body) as List;
    return productsJson;
  }

  Future<String> getUsernameByID(String userID) async {
    var resp = await http.get(Uri.parse("http://10.0.2.2:5001/api/users/getUsername/" + userID),
        headers: {"Content-Type": "application/json"});
    var userInfo = jsonDecode(resp.body);
    return userInfo;
  }

  Future<List<String>> getUsersByCommentList(List<dynamic> commentList) async {
    List<String> users = [];
    for (int i = 0; i < commentList.length; i++) {
      String tempUsername = await getUsernameByID(commentList[i]["user_id"]);
      users.add(tempUsername);
    }
    return users;
  }
}
