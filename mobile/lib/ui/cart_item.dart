import 'package:flutter/material.dart';
import 'package:mobile/models/cart_obj.dart';
import 'package:mobile/ui/product_view.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/models/product.dart';

class CartItem extends StatefulWidget {
  CartItem(
      {Key? key,
      required this.product,
      required this.amount,
      required this.refreshFunction,
      required this.favorite})
      : super(key: key);
  final Product product;
  int amount;
  final Function refreshFunction;
  bool favorite;
  @override
  _CartItemState createState() => _CartItemState();
}

class _CartItemState extends State<CartItem> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => ProductView(product: widget.product)));
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
                      widget.product.imgURL,
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
                                      widget.product.productName,
                                      style: kTextTitleSmall,
                                      textAlign: TextAlign.left,
                                    )),
                                SizedBox(
                                  child: Text(
                                    widget.product.seller,
                                    style: kTextCaption,
                                    textAlign: TextAlign.left,
                                  ),
                                ),
                              ],
                            ),
                            Column(
                              children: [
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
                                        CartObj.deleteItem(widget.product.pid);
                                        widget.refreshFunction("delete");
                                      },
                                    ),
                                  ),
                                ),
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(60),
                                  child: Material(
                                    color: Colors.white,
                                    child: InkWell(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8),
                                        child: Icon(
                                          widget.favorite
                                              ? Icons.favorite
                                              : Icons.favorite_border,
                                          color: widget.favorite
                                              ? Colors.red
                                              : Colors.grey,
                                          size: 20,
                                        ),
                                      ),
                                      onTap: () {
                                        widget.refreshFunction("favorite");
                                        setState(() {
                                          widget.favorite =
                                              widget.favorite ? false : true;
                                        });
                                      },
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(50),
                                  child: Material(
                                    child: InkWell(
                                      child: const Padding(
                                        padding: EdgeInsets.all(5),
                                        child: Icon(
                                          Icons.remove,
                                          color: AppColors.primary,
                                        ),
                                      ),
                                      onTap: () {
                                        CartObj.removeItem(widget.product.pid);
                                        widget.refreshFunction("remove");
                                      },
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Text("${widget.amount}"),
                                const SizedBox(width: 12),
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(50),
                                  child: Material(
                                    child: InkWell(
                                      child: const Padding(
                                        padding: EdgeInsets.all(5),
                                        child: Icon(
                                          Icons.add,
                                          color: AppColors.primary,
                                        ),
                                      ),
                                      onTap: () {
                                        CartObj.addItem(widget.product.pid);
                                        widget.refreshFunction("add");
                                      },
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            Container(
                                margin: const EdgeInsets.only(top: 8.0),
                                child: Text("\$ ${widget.product.price}")),
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
    ;
  }
}
