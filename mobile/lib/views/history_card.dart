import 'package:flutter/material.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/utils/dimension.dart';
import 'package:expandable/expandable.dart';
import 'package:mobile/views/give_rating.dart';

import 'comment_product.dart';

class HistoryCard extends StatefulWidget {
  const HistoryCard({
    Key? key,
    required this.order,
  }) : super(key: key);

  final Order order;

  @override
  State<HistoryCard> createState() => _HistoryCardState();
}

class _HistoryCardState extends State<HistoryCard> {
  ExpandableController panelController =
      ExpandableController(initialExpanded: false);

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
                  crossAxisAlignment: CrossAxisAlignment.start,
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
                        Text((() {
                          if (!widget.order.isRated) {
                            return "";
                          }
                          return "   Rating:" + widget.order.rating.toString();
                        })(),
                            style: const TextStyle(
                                color: AppColors.lightTextColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 16)),
                      ],
                    ),
                    Text(
                      widget.order.isCommented ? "Comment:"+widget.order.comment : "",
                     style: kTextTitleSmall, overflow: TextOverflow.ellipsis,),
                    OutlinedButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (_) => GiveRating(
                                      order: widget.order,
                                    )));
                      },
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Text(
                          'Give Rating',
                          style: kButtonDarkTextStyle,
                        ),
                      ),
                      style: OutlinedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                      ),
                    ),
                    OutlinedButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (_) => CommentProduct(
                                      order: widget.order,
                                    )));
                      },
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Text(
                          'Comment Product',
                          style: kButtonDarkTextStyle,
                        ),
                      ),
                      style: OutlinedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                      ),
                    )
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
