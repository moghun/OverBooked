import 'package:flutter/material.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/routes/add_comment.dart';
import 'package:mobile/views/main_app_bar.dart';

class Comments extends StatefulWidget {
  const Comments({Key? key, required this.product}) : super(key: key);

  final Product product;

  @override
  _CommentsState createState() => _CommentsState();
}

class _CommentsState extends State<Comments> {
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
                    builder: (context) => AddComment(
                      productID: widget.product.id,
                    )));
              }, child: Text("Add comment")),
            ],
          ),
        ),
      ),
    );
  }
}
