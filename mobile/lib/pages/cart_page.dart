import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/cart_service.dart';
import 'package:mobile/services/user_service.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/components/cart_preview.dart';
import 'package:mobile/components/main_app_bar.dart';

class CartPage extends StatefulWidget {
  const CartPage({Key? key}) : super(key: key);

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {

  final CartService _cartService = CartService();
  final User? user = UserService.getCurrentUser();

  @override
  void initState() {
    super.initState();

  }

  @override
  Widget build(BuildContext context) {
    if(user == null){
      return const Center(child: Text("You need to login to see your cart"),);
    }else{
    return Scaffold(
      appBar: MainAppBar(),
      body: Center(
        child: Column(
          children: [
            const SizedBox(height: 8,),
            Text("Your Cart", style: kHeadingTextStyle,),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Padding(
                padding: Dimen.regularPadding,
                child: Column(
                  children: [
                    Row(
                      children: [
                        FutureBuilder<List<dynamic>>(
                          future: _cartService.getProductsByCart(user!.cart!),
                          builder: (context, snapshot) {
                            if (snapshot.connectionState == ConnectionState.waiting) {
                              return const CircularProgressIndicator();
                            } else if (snapshot.connectionState == ConnectionState.done) {
                              if (snapshot.hasError) {
                                return const Text('Error');
                              } else if (snapshot.hasData) {
                                return SingleChildScrollView(
                                  scrollDirection: Axis.horizontal,
                                  child: Padding(
                                    padding: Dimen.regularPadding,
                                    child: Column(
                                      children: [
                                        Row(
                                          children: List.generate(
                                              snapshot.data!.length,
                                                  (index) => Row(children: [
                                                CartPreview(
                                                  product: snapshot.data![index],
                                                  amount: int.parse(user!.cart![index]["amount"]),
                                                ),
                                                const SizedBox(width: 8)
                                              ])),
                                        ),
                                        const SizedBox(height: 12,),
                                        OutlinedButton(onPressed: (){
                                          _cartService.purchaseCart(snapshot.data!);
                                        }, child: const Text("Buy your cart")),
                                      ],
                                    ),
                                  ),
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
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );}
  }
}