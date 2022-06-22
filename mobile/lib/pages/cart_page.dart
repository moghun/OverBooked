import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/cart_service.dart';
import 'package:mobile/services/user_service.dart';
import 'package:mobile/utils/colors.dart';
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
    return Scaffold(
      appBar: MainAppBar(),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            children: [
              const SizedBox(
                height: 8,
              ),
              Text(
                "Your Cart",
                style: kHeadingTextStyle,
              ),
              Padding(
                padding: Dimen.regularPadding,
                child: Column(
                  children: [
                    FutureBuilder<List<dynamic>>(
                      future: user == null
                          ? _cartService.getProductsByCart(UserService.userCart)
                          : _cartService.getProductsByCart(user!.cart!),
                      builder: (context, snapshot) {
                        if (snapshot.connectionState == ConnectionState.waiting) {
                          return const CircularProgressIndicator();
                        } else if (snapshot.connectionState == ConnectionState.done) {
                          if (snapshot.hasError) {
                            return const Text('Error');
                          } else if (snapshot.hasData) {
                            return Column(
                              children: [
                                SingleChildScrollView(
                                  scrollDirection: Axis.horizontal,
                                  child: snapshot.data!.isEmpty
                                      ? Column(
                                          children: [
                                            const SizedBox(
                                              height: 60,
                                            ),
                                            Stack(
                                              alignment: Alignment.center,
                                              children: [
                                                const Text(
                                                  "Your cart is empty!",
                                                  style: TextStyle(
                                                      fontSize: 16, fontWeight: FontWeight.bold),
                                                ),
                                                Icon(
                                                  Icons.shopping_cart_outlined,
                                                  size: 120,
                                                  color: Colors.black.withOpacity(0.1),
                                                ),
                                              ],
                                            ),
                                            const SizedBox(
                                              height: 60,
                                            ),
                                          ],
                                        )
                                      : Row(
                                          children: List.generate(
                                              snapshot.data!.length,
                                              (index) => Row(children: [
                                                    CartPreview(
                                                      product: snapshot.data![index],
                                                      amount: user == null
                                                          ? UserService.userCart[index]["amount"]
                                                          : user!.cart![index]["amount"],
                                                    ),
                                                    const SizedBox(width: 8)
                                                  ])),
                                        ),
                                ),
                                const SizedBox(
                                  height: 150,
                                ),
                                OutlinedButton(
                                  onPressed: snapshot.data!.isEmpty
                                      ? null
                                      : () {
                                          User? user = UserService.getCurrentUser();
                                          if (user == null) {
                                            Fluttertoast.showToast(
                                                msg: "You need to login to check out!",
                                                gravity: ToastGravity.BOTTOM,
                                                backgroundColor: Colors.red);
                                          } else {
                                            showDialog(
                                                context: context,
                                                builder: (context) => AlertDialog(
                                                      title: Text("Payment Info"),
                                                      content: Column(
                                                        mainAxisSize: MainAxisSize.min,
                                                        children: [
                                                          TextField(
                                                            decoration: const InputDecoration(
                                                                hintText: "Card Number"),
                                                          ),
                                                          SizedBox(
                                                            height: 8,
                                                          ),
                                                          TextField(
                                                            decoration: const InputDecoration(
                                                                hintText: "Cvv/Cvc"),
                                                          ),
                                                          SizedBox(
                                                            height: 8,
                                                          ),
                                                          TextField(
                                                            decoration: const InputDecoration(
                                                                hintText: "Expiration date"),
                                                          )
                                                        ],
                                                      ),
                                                      actions: [
                                                        OutlinedButton(
                                                            onPressed: () {
                                                              _cartService
                                                                  .purchaseCart(snapshot.data!);
                                                              setState(() {
                                                                User user = UserService.getCurrentUser()!;
                                                                user.cart!.clear();
                                                                UserService.updateUser(user);
                                                              });
                                                              Navigator.pop(context);
                                                            },
                                                            child: Text("Confirm"))
                                                      ],
                                                    ));
                                            //_cartService.purchaseCart(snapshot.data!);
                                          }
                                        },
                                  child: Text(
                                    "Check out",
                                    style: kButtonLightTextStyle,
                                  ),
                                  style: OutlinedButton.styleFrom(
                                      backgroundColor: AppColors.background,
                                      padding: EdgeInsets.fromLTRB(80, 12, 80, 12)),
                                ),
                                OutlinedButton(
                                  onPressed: () {
                                    setState(() {
                                      _cartService.clearCart();
                                    });
                                  },
                                  child: Text(
                                    "Clear cart",
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  style: OutlinedButton.styleFrom(
                                    backgroundColor: Colors.red,
                                  ),
                                )
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
            ],
          ),
        ),
      ),
    );
  }
}
