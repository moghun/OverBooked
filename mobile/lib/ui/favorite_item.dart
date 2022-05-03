import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/models/cart_obj.dart';
import 'package:mobile/ui/product_view.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/models/product.dart';

Widget FavoriteItem(Product product, Function removeFavorite, int position,
    BuildContext context) {
  return InkWell(
    onTap: () {
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => ProductView(product: product)));
      print("Card Clicked");
    },
    child: SizedBox(
      width: 180,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
        child: Material(
          color: Colors.white,
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                Expanded(
                  flex: 1,
                  child: Image.network(
                    product.imgURL,
                    height: 70,
                    width: 75,
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(
                                  height: 34,
                                  width: 180,
                                  child: Text(
                                    product.productName,
                                    style: kTextTitleSmall,
                                    textAlign: TextAlign.left,
                                  )),
                              SizedBox(
                                child: Text(
                                  product.seller,
                                  style: kTextCaption,
                                  textAlign: TextAlign.left,
                                ),
                              ),
                            ],
                          ),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(60),
                            child: Material(
                              color: Colors.white,
                              child: InkWell(
                                child: const Padding(
                                  padding: EdgeInsets.all(8),
                                  child: Icon(
                                    Icons.delete_outlined,
                                    color: Colors.grey,
                                    size: 20,
                                  ),
                                ),
                                onTap: () {
                                  removeFavorite(product.pid, position);
                                },
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 32),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(
                            height: 30,
                            width: 96,
                            child: OutlinedButton(
                                style: TextButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(
                                      vertical: 2, horizontal: 6),
                                  primary: AppColors.primary,
                                  side: const BorderSide(
                                      width: 1.0, color: AppColors.primary),
                                ),
                                onPressed: () {
                                  CartObj.addItem(product.pid);
                                },
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceAround,
                                  children: const [
                                    Icon(Icons.add_shopping_cart, size: 16),
                                    Text("Add to Cart",
                                        style: TextStyle(
                                          color: AppColors.primary,
                                          fontSize: 12.0,
                                        ))
                                  ],
                                )),
                          ),
                          Container(
                              margin: const EdgeInsets.only(top: 8.0),
                              child: Text("\$ ${product.price}")),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    ),
  );
}
