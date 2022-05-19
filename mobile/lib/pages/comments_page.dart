import 'package:flutter/material.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/pages/add_comment_page.dart';
import 'package:mobile/components/main_app_bar.dart';

class CommentsPage extends StatefulWidget {
  const CommentsPage({Key? key, required this.product}) : super(key: key);

  final Product product;

  @override
  _CommentsPageState createState() => _CommentsPageState();
}

class _CommentsPageState extends State<CommentsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainAppBar(),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Center(
          child: Column(
            children: [
              Column(
                  children: List.generate(widget.product.comments?.length ?? 0,
                      (index) => Column(
                        children: [
                          Text(widget.product.comments![index]["comment"]),
                          const SizedBox(height: 8,),
                        ],
                      ))),
              OutlinedButton(onPressed: (){
                Navigator.push(context, MaterialPageRoute(
                    builder: (context) => AddCommentPage(
                      productID: widget.product.id,
                    )));
              }, child: const Text("Add comment")),
            ],
          ),
        ),
      ),
    );
  }
}
