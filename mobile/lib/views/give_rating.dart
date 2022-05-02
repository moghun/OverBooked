import 'package:flutter/material.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/models/order.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class GiveRating extends StatefulWidget {
  const GiveRating({Key? key, required this.order}) : super(key: key);

  final Order order;

  @override
  State<GiveRating> createState() => _GiveRatingState();
}

class _GiveRatingState extends State<GiveRating> {
  Service db = Service();
  num rating = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
              onPressed: () {
                Navigator.pushNamed(context, '/notifications');
              },
              icon: const Icon(
                Icons.notifications_outlined,
                color: Colors.black54,
                size: 28,
              )),
          const SizedBox(width: 8)
        ],
        title: Row(
          children: [
            const SizedBox(width: 8),
            SizedBox(
                width: 38,
                height: 48,
                child: Image.asset('lib/images/logo_small.png')),
            const SizedBox(width: 8),
            Text(
              'Syboard',
              style: kHeadingTextStyleWhite,
            ),
          ],
        ),
        backgroundColor: AppColors.primary,
        elevation: 2.0,
      ),
      body: Column(children: [
        Text(
            "Please select a rating for the product " +
                widget.order.productName.toString(),
            style: kTextTitleMedium),
        Divider(
          color: AppColors.primary,
          height: 20,
          thickness: 3,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RatingBar(
              minRating: 1,
              initialRating: 1,
              itemCount: 5,
              allowHalfRating: true,
              direction: Axis.horizontal,
              ratingWidget: RatingWidget(
                full: Icon(Icons.star, color: Colors.yellow.shade700),
                half: Icon(Icons.star_half, color: Colors.yellow.shade700),
                empty: Icon(Icons.star_border_outlined,
                    color: Colors.yellow.shade700),
              ),
              itemPadding: const EdgeInsets.symmetric(horizontal: 5.0),
              onRatingUpdate: (value) {
                rating = value;
              },
            ),
          ],
        ),
        Divider(
          color: AppColors.primary,
          height: 20,
          thickness: 3,
        ),
        OutlinedButton(
          onPressed: () async {
            if(!widget.order.isRated){
              db.updateProductRating(widget.order.pid, rating);
              db.updateOrderAsRated(widget.order.orderID);
              db.setOrderRating(widget.order.orderID, rating);
            }
            await showDialog(
                context: context,
                builder: (_) => AlertDialog(
                      title:  Text((() {
                        if(!widget.order.isRated)
                        {
                          return "Rating Submitted";
                        }
                        return "Product Rated Before";
                      })(),),
                      content:
                      Text((() {
                        if(!widget.order.isRated)
                        {
                          return "Your rating for your purchase of product "+ widget.order.productName.toString() +" is submitted. Thanks";
                        }
                        return "You have already rated your purchase of product "+ widget.order.productName.toString() +" before. You can rate a product only once. Thanks for your previous rating.";
                      })(), style: kTextTitle),
                      actions: [
                        TextButton(
                            onPressed: () {
                              Navigator.pop(_);
                            },
                            child: const Text("OK"))
                      ],
                    ));
            Navigator.pop(context);
          },
          child: Text(
            "Send Rating",
            style: kButtonDarkTextStyle,
          ),
          style: OutlinedButton.styleFrom(
            backgroundColor: AppColors.primary,
          ),
        ),
      ]),
    );
  }
}
