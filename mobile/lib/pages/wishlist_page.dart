import 'package:flutter/material.dart';
import 'package:mobile/components/main_app_bar.dart';
import 'package:mobile/components/product_preview.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';

class WishlistPage extends StatefulWidget {
  const WishlistPage({Key? key}) : super(key: key);

  @override
  _WishlistPageState createState() => _WishlistPageState();
}

class _WishlistPageState extends State<WishlistPage> {
  User user = UserService.getCurrentUser()!;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainAppBar(),
      body: Center(
        child: Column(
          children: [
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: List.generate(
                    user.wishlist!.length, (index) => ProductPreview(product: user.wishlist![index])),
              ),
            )
          ],
        ),
      ),
    );
  }
}
