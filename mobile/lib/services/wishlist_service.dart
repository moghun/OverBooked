import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/models/product.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';

class WishlistService {
  final apiBaseURL = "http://10.0.2.2:5001/api";

  addToWishlist(Product product) {
    User user = UserService.getCurrentUser()!;
    user.wishlist!.add({"product_id": product.id});
    var body = jsonEncode({"product_id": product.id});
    http.put(Uri.parse(apiBaseURL + "/users/addToWishlist/" + user.uid!),
        headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!},
        body: body);
  }

  removeFromWishlist(Product product) {
    User user = UserService.getCurrentUser()!;
    user.wishlist!.remove({"product_id": product.id});
    var body = jsonEncode({"product_id": product.id});
    http.put(
      Uri.parse(apiBaseURL + "/users/removeFromWishlist/" + user.uid!),
      headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!},
      body: body
    );
  }

  clearWishlist() {
    User user = UserService.getCurrentUser()!;
    user.wishlist!.clear();
    http.put(Uri.parse(apiBaseURL + "/users/clearWishlist/" + user.uid!),
        headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!});
  }
}
