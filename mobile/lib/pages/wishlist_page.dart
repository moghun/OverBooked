import 'package:flutter/material.dart';
import 'package:mobile/components/main_app_bar.dart';
import 'package:mobile/components/product_preview.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/product_service.dart';
import 'package:mobile/services/user_service.dart';
import 'package:mobile/utils/dimensions.dart';

class WishlistPage extends StatefulWidget {
  const WishlistPage({Key? key}) : super(key: key);

  @override
  _WishlistPageState createState() => _WishlistPageState();
}

class _WishlistPageState extends State<WishlistPage> {
  User user = UserService.getCurrentUser()!;
  final ProductService _productService = ProductService();

  Future<List<Product>> getAllBooks() async {
    var products = await _productService.getAllProducts();
    return products ?? [];
  }

  bool isProductInWishlist(Product product) {
    bool result = false;
    for(int i = 0; i < user.wishlist!.length; i++){
      if(user.wishlist![i]["product_id"].toString() == product.id){
        result = true;
      }
    }
    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainAppBar(
        title: "Wishlist",
      ),
      body: Center(
        child: Column(
          children: [
            FutureBuilder<List<Product>>(
              future: getAllBooks(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Column(
                    children: const [
                      SizedBox(
                        height: 121,
                      ),
                      SizedBox(
                        child: CircularProgressIndicator(
                          strokeWidth: 7,
                        ),
                        width: 70,
                        height: 70,
                      ),
                      SizedBox(
                        height: 121,
                      ),
                    ],
                  );
                } else if (snapshot.connectionState == ConnectionState.done) {
                  if (snapshot.hasError) {
                    return const Text('Error');
                  } else if (snapshot.hasData) {
                    return Column(
                      children: [
                        SizedBox(
                          height: MediaQuery.of(context).size.height - 87,
                          child: SingleChildScrollView(
                            child: Center(
                              child: Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 12.0),
                                    child: Wrap(
                                      direction: Axis.horizontal,
                                      spacing: 0,
                                      runSpacing: 12,
                                      children: List.generate(
                                        snapshot.data!.length,
                                        (index) => isProductInWishlist(snapshot.data![index])
                                            ? Padding(
                                              padding: const EdgeInsets.symmetric(horizontal: 8.0),
                                              child: SizedBox(
                                                  width: 170,
                                                  child: ProductPreview(
                                                    product: snapshot.data![index],
                                                  ),
                                                ),
                                            )
                                            : SizedBox(),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    );
                  } else {
                    return const Text('Empty data');
                  }
                } else {
                  return Text('State: ${snapshot.connectionState}');
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
