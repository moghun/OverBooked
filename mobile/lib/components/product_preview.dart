import 'package:favorite_button/favorite_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';
import 'package:mobile/services/wishlist_service.dart';
import 'package:mobile/utils/colors.dart';
import 'package:mobile/utils/styles.dart';
import '../models/product.dart';
import '../pages/product_page.dart';

class ProductPreview extends StatefulWidget {
  const ProductPreview({
    Key? key,
    required this.product,
  }) : super(key: key);

  final Product product;

  @override
  State<ProductPreview> createState() => _ProductPreviewState();
}

class _ProductPreviewState extends State<ProductPreview> {
  final WishlistService _wishlistService = WishlistService();
  bool isFav = false;

  handleFavChange(newIsFav) {
    setState(() {
      isFav = newIsFav;
    });
    newIsFav
        ? _wishlistService.addToWishlist(widget.product)
        : _wishlistService.removeFromWishlist(widget.product);
  }

  @override
  void initState() {
    super.initState();
    User? user = UserService.getCurrentUser();
    if (user != null) {
      for (int i = 0; i < user.wishlist!.length; i++) {
        if (user.wishlist![i]["product_id"].toString() == widget.product.id) {
          setState(() {
            isFav = true;
          });
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      style: ButtonStyle(
          backgroundColor:
              MaterialStateProperty.resolveWith((states) => AppColors.primary.withOpacity(0.1)),
          shape: MaterialStateProperty.resolveWith(
              (states) => RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
          padding: MaterialStateProperty.resolveWith((states) => EdgeInsets.zero)),
      onPressed: () {
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => ProductPage(
                      productID: widget.product.id,
                    )));
      },
      child: Stack(
        alignment: Alignment.center,
        children: [
          UserService.getCurrentUser() != null
              ? Positioned(
                  child: FavoriteButton(
                    valueChanged: handleFavChange,
                    isFavorite: isFav,
                    iconSize: 40,
                  ),
                  top: 6,
                  right: 3,
                )
              : Container(),
          Stack(alignment: Alignment.center, children: <Widget>[
            Row(
              children: [
                Column(
                  children: [
                    Container(
                      width: 170,
                      height: 280,
                      alignment: Alignment.topCenter,
                      margin: const EdgeInsets.all(0),
                      padding: const EdgeInsets.fromLTRB(6, 0, 6, 0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          const SizedBox(
                            height: 7,
                          ),
                          Image.network(
                            widget.product.img ?? "",
                            width: 110,
                            height: 130,
                          ),
                          const SizedBox(
                            height: 7,
                          ),
                          Text(
                            widget.product.name,
                            style: kSmallTitle,
                            textAlign: TextAlign.center,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          Text(
                            widget.product.author ?? "",
                            style: kSmallText,
                            textAlign: TextAlign.center,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(
                            height: 7,
                          ),
                          RatingBarIndicator(
                            rating: widget.product.rating!.isNotEmpty ? widget.product.rating!
                                    .map((e) => e["rating"])
                                    .reduce((a, b) => a + b) /
                                widget.product.rating!.length : 0,
                            //it will be debugged
                            itemBuilder: (context, index) => const Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            itemCount: 5,
                            itemSize: 18.0,
                            unratedColor: Colors.amber.withAlpha(80),
                            direction: Axis.horizontal,
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              widget.product.sale!
                                  ? Text(
                                      "\$ " + widget.product.costBeforeSale!.toString(),
                                      style: const TextStyle(
                                        color: Colors.red,
                                        fontSize: 16,
                                        decoration: TextDecoration.lineThrough,
                                        decorationThickness: 3,
                                      ),
                                    )
                                  : Container(),
                              const SizedBox(
                                width: 12,
                              ),
                              Text(
                                "\$ " + widget.product.cost.toString(),
                                style: const TextStyle(
                                  fontSize: 16,
                                  color: AppColors.secondary,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 15,
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ],
            ),

            /*Visibility(
                  visible: widget.product.oldPrice >
                      widget.product.price,
                  child: Positioned(
                    top: 0,
                    left: 0,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          Icon(
                            Icons.circle,
                            size: 40,
                            color: AppColors.background,
                          ),
                          Text(
                              "${(((widget.product.oldPrice -
                                  widget.product.price) /
                                  widget.product.oldPrice) * 100)
                                  .toStringAsFixed(0)}%",
                              style: TextStyle(color: Colors.white))
                        ],
                      ),
                    ),
                  ),
                )*/
          ]),
        ],
      ),
    );
  }

  List<Widget> editableButtons(context, product, refreshFunc) {
    return <Widget>[
      Positioned(
        top: 0,
        left: 0,
        child: IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.edit,
              color: Colors.black,
            )),
      ),
      Positioned(
          top: 0,
          right: 0,
          child: IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.delete,
                color: Colors.red,
              ))),
    ];
  }
}
