import 'package:flutter/material.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/models/product.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:mobile/views/sell_product/edit_product.dart';

Service db = Service();

Widget editProductPreview(Product product, context, Function refreshFunction) {
  return SizedBox(
      width: 180,
      child: Stack(alignment: Alignment.center, children: <Widget>[
        InkWell(
          onTap: () {
            print("Card Clicked");
          },
          child: Material(
            color: Colors.white,
            elevation: 0,
            shape: RoundedRectangleBorder(
              side: const BorderSide(color: Colors.black12, width: 1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                children: [
                  Image.network(
                    product.imgURL,
                    height: 70,
                    width: 75,
                  ),
                  Container(
                      margin: const EdgeInsets.only(top: 10.0),
                      height: 34,
                      width: 180,
                      child: Text(
                        product.productName,
                        style: kTextTitleSmall,
                        textAlign: TextAlign.center,
                      )),
                  Container(
                    margin: const EdgeInsets.only(bottom: 8.0),
                    child: Text(
                      product.seller,
                      style: kTextCaption,
                      textAlign: TextAlign.center,
                    ),
                  ),
                  Container(
                      margin: const EdgeInsets.only(top: 8.0),
                      child: Text("\$ ${product.price}")),
                ],
              ),
            ),
          ),
        ),
        Positioned(
          top: -8,
          right: -8,
          child: IconButton(
            splashRadius: 30,
            iconSize: 20,
            icon: const Icon(Icons.edit_outlined),
            color: Colors.black,
            onPressed: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (a) => EditProduct(product: product)));
            },
          ),
        ),
        Positioned(
          top: 24,
          right: -8,
          child: IconButton(
              splashRadius: 30,
              iconSize: 20,
              icon: const Icon(Icons.delete_outlined),
              color: Colors.red,
              onPressed: () async {
                showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                          title: const Text("Caution!"),
                          content: const Text(
                              "Are you sure you want to delete this product?"),
                          actions: [
                            TextButton(
                              child: const Text("DELETE"),
                              onPressed: () async {
                               await db.deleteProduct(product.pid);
                               refreshFunction();
                               Navigator.pop(context);
                              },
                            )
                          ]);
                    });
              }),
        ),
      ]));
}
