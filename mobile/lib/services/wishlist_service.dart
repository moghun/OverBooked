import 'package:http/http.dart' as http;
import 'package:mobile/models/product.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';

class WishlistService {
  addToWishlist(Product product) {

  }

  removeFromWishlist(Product product) {

  }

  clearWishlist() {
    User user = UserService.getCurrentUser()!;
  }
}