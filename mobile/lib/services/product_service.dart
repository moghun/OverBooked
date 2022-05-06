import 'dart:convert';
import 'package:mobile/models/product.dart';
import 'package:http/http.dart' as http;

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
        List<Product> products =
            productsJson.map((prod) => Product.fromJson(prod)).toList();
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
}
