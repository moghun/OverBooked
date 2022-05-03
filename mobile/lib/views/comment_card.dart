import 'package:flutter/material.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/utils/dimension.dart';
import 'package:expandable/expandable.dart';
import 'package:mobile/views/give_rating.dart';
import 'package:mobile/services/service.dart';

import 'comment_product.dart';

class CommentCard extends StatefulWidget {
  const CommentCard({
    Key? key,
    required this.order,
  }) : super(key: key);

  final Order order;

  @override
  State<CommentCard> createState() => _CommentCardState();
}

class _CommentCardState extends State<CommentCard> {
  String userName = "kek";

  Future<String> getUserName() async {
    var currentOrder = await Service.ordersCollection
        .where(FieldPath.documentId, isEqualTo: widget.order.orderID)
        .get();
    for (var element in currentOrder.docs) {
      DocumentReference currentBuyer = element.get("buyer");
      String buyerName = (await currentBuyer.get()).get("sellerName");
      return buyerName;
    }
    return "none";
  }

  String setUserName() {
    late String result;
    getUserName().then((value) => {result = value, print(result)});
    print(result);
    return result;
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: getUserName(),
        builder: (context, AsyncSnapshot asyncSnapshot) {
          if (!asyncSnapshot.hasData) return const Text("Loading Comment");
          String userName = asyncSnapshot.data;
          if (userName == null) {
            return const Center(child: Text("No Comment has been made"));
          }
          return Container(
              margin: EdgeInsets.only(bottom: 15),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "    " + userName,
                    style: kTextTitleSmall,
                  ),
                  Container(
                      alignment: Alignment.centerLeft,
                      width: MediaQuery.of(context).size.width * 0.9,
                      height: 30,
                      decoration: BoxDecoration(
                          color: Colors.grey.shade300,
                          borderRadius: new BorderRadius.circular(30)),
                      child: Text("    " + widget.order.comment)),
                ],
              ));
        });
  }
}
