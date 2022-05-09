import 'package:mobile/models/product.dart';
import 'package:mobile/services/product_service.dart';

class CartService {
  final apiBaseURL = "http://10.0.2.2:5001/api/products";
  final ProductService _productService = ProductService();

  Future<List<dynamic>> getProductsByCart(List<dynamic> cart) async {
    final List<dynamic> result = [];
    for(int i = 0; i < cart.length; i++){
      result.add(await _productService.getProduct(cart[i]["product_id"]));
    }
    print(result);
    return result;
  }

  addToCart(Product product){

  }
}