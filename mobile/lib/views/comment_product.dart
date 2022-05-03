import 'package:flutter/material.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/models/order.dart';

class CommentProduct extends StatefulWidget {
  const CommentProduct({Key? key, required this.order}) : super(key: key);

  final Order order;

  @override
  State<CommentProduct> createState() => _CommentProductState();
}

class _CommentProductState extends State<CommentProduct> {
  String currentComment = "";
  Service database = Service();

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
      body: Column(
        children: [   Text(
            "Please enter your comment for the product " +
                widget.order.productName.toString(),
            style: kTextTitleMedium),
          Divider(
            color: AppColors.primary,
            height: 20,
            thickness: 3,
          ),
          TextField(
            keyboardType: TextInputType.text,
            decoration: const InputDecoration(
                hintText: "Please enter your comment"),
            onChanged: (value) {
              currentComment = value;
            },
          ),
          Divider(
            color: AppColors.primary,
            height: 20,
            thickness: 3,
          ),
          OutlinedButton(
            onPressed: ()  async {
              if(currentComment != "" && !widget.order.isCommented){
                database.addProductComment(widget.order.orderID, currentComment);
                database.updateOrderAsCommented(widget.order.orderID);
              }
              await showDialog(
                  context: context,
                  builder: (_) => AlertDialog(
                    title: Text((() {
                      if (currentComment=="") {
                        return "Comment field is empty ";
                      }
                      else if(widget.order.isCommented)
                      {
                        return "Product commented before";
                      }
                      return "Comment Submitted";
                    })()),
                    content:
                    Text((() {
                      if (currentComment=="") {
                        return "Comment field cannot be empty. Please enter a comment.";
                      }
                      else if(widget.order.isCommented)
                      {
                        return "You have already submitted a comment your purchase of product "+ widget.order.productName.toString()+" before. You can comment product only once. Thanks for your previous comment.";
                      }
                      return "Your comment for your purchase of product "+ widget.order.productName.toString() +" is submitted to comment approval system. Your comment will be shown after it is approved by the seller. Thanks";
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
              "Send Comment",
              style: kButtonDarkTextStyle,
            ),
            style: OutlinedButton.styleFrom(
              backgroundColor: AppColors.primary,
            ),
          ),
        ],
      ),
    );
  }
}
