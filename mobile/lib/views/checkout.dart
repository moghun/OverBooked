import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/dimension.dart';
import 'package:mobile/utils/styles.dart';

class Checkout extends StatefulWidget {
  const Checkout(
      {Key? key,
      required this.sum,
      required this.CartItemList,
      required this.CartAmount,
      required this.deleteCart})
      : super(key: key);
  final double sum;
  final List<Product> CartItemList;
  final List<int> CartAmount;
  final Function deleteCart;

  @override
  _CheckoutState createState() => _CheckoutState();
}

class _CheckoutState extends State<Checkout> {
  Service DBService = Service();
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserObj?>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text("Checkout"),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                        child: Padding(
                            padding: Dimen.regularPadding,
                            child: const TextField(
                              decoration: InputDecoration(
                                hintText: "Card Number",
                                enabledBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(20.0)),
                                  borderSide: BorderSide(
                                    color: Colors.grey,
                                  ),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(10.0)),
                                  borderSide:
                                      BorderSide(color: AppColors.primary),
                                ),
                              ),
                            ))),
                  ],
                ),
                Row(
                  children: [
                    Expanded(
                        child: Padding(
                            padding: Dimen.regularPadding,
                            child: const TextField(
                              decoration: InputDecoration(
                                hintText: "Card Holder",
                                enabledBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(20.0)),
                                  borderSide: BorderSide(
                                    color: Colors.grey,
                                  ),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(10.0)),
                                  borderSide:
                                      BorderSide(color: AppColors.primary),
                                ),
                              ),
                            ))),
                  ],
                ),
                Row(
                  children: [
                    Expanded(
                        child: Padding(
                            padding: Dimen.regularPadding,
                            child: const TextField(
                              decoration: InputDecoration(
                                hintText: "Expiration Date",
                                enabledBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(20.0)),
                                  borderSide: BorderSide(
                                    color: Colors.grey,
                                  ),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(10.0)),
                                  borderSide:
                                      BorderSide(color: AppColors.primary),
                                ),
                              ),
                            ))),
                    Expanded(
                        child: Padding(
                            padding: Dimen.regularPadding,
                            child: const TextField(
                              decoration: InputDecoration(
                                hintText: "CVV Code",
                                enabledBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(20.0)),
                                  borderSide: BorderSide(
                                    color: Colors.grey,
                                  ),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(10.0)),
                                  borderSide:
                                      BorderSide(color: AppColors.primary),
                                ),
                              ),
                            ))),
                  ],
                ),
              ],
            ),
          ),
          Column(
            children: [
              const Divider(thickness: 1, height: 1, color: Colors.black12),
              SizedBox(
                height: 64,
                child: Material(
                    color: Colors.white,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 4, horizontal: 16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text('Total'),
                              const SizedBox(width: 8),
                              Text(
                                '${widget.sum} USD',
                                style: kTextTitleMedium,
                              ),
                            ],
                          ),
                          SizedBox(
                            width: 200,
                            child: TextButton(
                              child: const Text('Purchase'),
                              style: TextButton.styleFrom(
                                primary: Colors.white,
                                backgroundColor: AppColors.primary,
                                onSurface: Colors.grey,
                              ),
                              onPressed: () async {
                                if (user == null) {
                                  for (var i = 0;
                                      i < widget.CartAmount.length;
                                      i++) {
                                    await Service.ordersCollection.add({
                                      "amount": widget.CartAmount[i],
                                      "buyer": Service.userCollection
                                          .doc("anonymous"),
                                      "price": widget.CartItemList[i].price,
                                      "seller":
                                          await Service.getSellerReferenceByPID(
                                              widget.CartItemList[i].pid),
                                      "product": Service.getProductReference(
                                          widget.CartItemList[i].pid),
                                      "purchaseDate": Timestamp.now(),
                                      "comment": "",
                                      "isCommented": false,
                                      "rating": 0,
                                      "isRated": false,
                                      "commentApproved": false,
                                    });
                                    final productRef =
                                        Service.getProductReference(
                                            widget.CartItemList[i].pid);
                                    // final num currentStocks =
                                    //     (await productRef.get()).get("stocks");
                                    // await Service.getProductReference(
                                    //         widget.CartItemList[i].pid)
                                    //     .update({"stocks": currentStocks - 1});
                                  }
                                } else {
                                  for (var i = 0;
                                      i < widget.CartAmount.length;
                                      i++) {
                                    await Service.ordersCollection.add({
                                      "amount": widget.CartAmount[i],
                                      "buyer":
                                          Service.userCollection.doc(user.uid),
                                      "price": widget.CartItemList[i].price,
                                      "seller":
                                          await Service.getSellerReferenceByPID(
                                              widget.CartItemList[i].pid),
                                      "product": Service.getProductReference(
                                          widget.CartItemList[i].pid),
                                      "purchaseDate": Timestamp.now(),
                                      "comment": "",
                                      "isCommented": false,
                                      "rating": 0,
                                      "isRated": false,
                                      "commentApproved": false,
                                    });
                                    final productRef =
                                        Service.getProductReference(
                                            widget.CartItemList[i].pid);
                                    // final num currentStocks =
                                    //     (await productRef.get()).get("stocks");
                                    // await Service.getProductReference(
                                    //         widget.CartItemList[i].pid)
                                    //     .update({"stocks": currentStocks - 1});
                                  }
                                }
                                widget.deleteCart();
                                Navigator.pop(context);
                              },
                            ),
                          )
                        ],
                      ),
                    )),
              )
            ],
          ),
        ],
      ),
    );
  }
}
