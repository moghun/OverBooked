import 'package:http/http.dart' as http;
import 'package:mobile/models/product.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';

class WishlistService {
  final apiBaseURL = "http://10.0.2.2:5001/api";

  addToWishlist(Product product) {}

  removeFromWishlist(Product product) {}

  clearWishlist() {
    User user = UserService.getCurrentUser()!;
    user.wishlist!.clear();
    http.put(Uri.parse(apiBaseURL + "/users/clearWishlist/" + user.uid!),
        headers: {"Content-Type": "application/json", "token": "Bearer " + user.token!});
  }
}
