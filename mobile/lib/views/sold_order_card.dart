import 'package:flutter/material.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/utils/dimension.dart';
import 'package:expandable/expandable.dart';
import 'package:mobile/views/give_rating.dart';

import 'comment_product.dart';

class SoldOrderCard extends StatefulWidget {
  const SoldOrderCard({
    Key? key,
    required this.order,
  }) : super(key: key);

  final Order order;

  @override
  State<SoldOrderCard> createState() => _SoldOrderCardState();
}

class _SoldOrderCardState extends State<SoldOrderCard> {
  ExpandableController panelController =
      ExpandableController(initialExpanded: false);
  Service database = Service();

  @override
  Widget build(BuildContext context) {
    var purchaseDate = widget.order.purchaseDate.toDate();
    return Padding(
      padding: Dimen.regularPadding,
      child: Card(
        color: AppColors.captionColor,
        child: ExpandablePanel(
          builder: (_, collapsed, expanded) => Expandable(
            collapsed: collapsed,
            expanded: expanded,
          ),
          controller: panelController,
          expanded: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  children: [
                    Row(
                      children: [
                        const Text("Purchase Date: ",
                            style: TextStyle(
                              color: AppColors.lightTextColor,
                              fontSize: 16,
                            )),
                        Text(
                          "${purchaseDate.year.toString()}-${purchaseDate.month.toString().padLeft(2, '0')}-${purchaseDate.day.toString().padLeft(2, '0')}",
                          style: const TextStyle(
                            color: AppColors.lightTextColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                    Container(
                        child: widget.order.isCommented == true
                            ? new Container(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [Text("Comment: "+widget.order.comment,style: kTextTitleSmall,),
                                    OutlinedButton(
                                      onPressed: () async{
                                        if(!widget.order.commentApproved){
                                          database.approveComment(widget.order.orderID);
                                        }
                                        await showDialog(
                                            context: context,
                                            builder: (_) => AlertDialog(
                                          title:  Text((() {
                                            if(!widget.order.commentApproved)
                                            {
                                              return "Comment Approved";
                                            }
                                            return "Comment Approved Before";
                                          })(),),
                                          content:
                                          Text((() {
                                            if(!widget.order.commentApproved)
                                            {
                                              return "You have approved the comment of this order. The comment will now be visible to the users. Thanks.";
                                            }
                                            return "You have approved this comment before. The comment is already visible to users.";
                                          })(), style: kTextTitle),
                                          actions: [
                                            TextButton(
                                                onPressed: () {
                                                  Navigator.pop(_);
                                                },
                                                child: const Text("OK"))
                                          ],
                                        ));
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                                        child: Text(
                                          'Approve Comment',
                                          style: kButtonDarkTextStyle,
                                        ),
                                      ),
                                      style: OutlinedButton.styleFrom(
                                        backgroundColor: AppColors.primary,
                                      ),
                                    )],
                                ),
                              )
                            : new Container())
                  ],
                ),
                // order ile alakali ekstra seyler buraya, rating
              ],
            ),
          ),
          collapsed: Container(),
          header: Padding(
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            child: ListTile(
              onTap: () {
                setState(() {
                  panelController.toggle();
                });
              },
              title: Column(
                children: [
                  Text(
                    widget.order.productName,
                    maxLines: 2,
                    style: const TextStyle(
                      color: AppColors.secondary,
                      fontWeight: FontWeight.bold,
                      overflow: TextOverflow.ellipsis,
                      fontSize: 20,
                    ),
                  ),
                ],
              ),
              leading: Image.network(widget.order.url),
              trailing: Text(
                '\$ ${widget.order.price}',
                style: kButtonLightTextStyle,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
