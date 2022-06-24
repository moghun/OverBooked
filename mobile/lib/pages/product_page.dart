import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile/components/comment_preview.dart';
import 'package:mobile/models/comment.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/pages/add_comment_page.dart';
import 'package:mobile/services/cart_service.dart';
import 'package:mobile/services/product_service.dart';
import 'package:mobile/utils/colors.dart';
import 'package:mobile/utils/styles.dart';

class ProductPage extends StatefulWidget {
  const ProductPage({Key? key, required this.productID}) : super(key: key);
  final String productID;

  @override
  _ProductPageState createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  final ProductService _productService = ProductService();
  Future<Product>? _product;
  TextEditingController amountController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _product = _productService.getProduct(widget.productID);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.background,
      ),
      body: SingleChildScrollView(
        child: FutureBuilder<Product>(
          future: _product,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const CircularProgressIndicator();
            } else if (snapshot.connectionState == ConnectionState.done) {
              if (snapshot.hasError) {
                return const Text('Error');
              } else if (snapshot.hasData) {
                return SingleChildScrollView(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Column(
                          children: [
                            const SizedBox(
                              height: 12,
                            ),
                            Image.network(
                              snapshot.data!.img!,
                              width: 190,
                              height: 230,
                            ),
                            const SizedBox(
                              height: 12,
                            ),
                            Text(
                              snapshot.data!.name,
                              style: kHeadingTextStyle,
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.ellipsis,
                              maxLines: 3,
                            ),
                            const SizedBox(
                              height: 12,
                            ),
                            Text(
                              snapshot.data!.publisher! +
                                  " - " +
                                  (snapshot.data!.author ?? "No author"),
                              style: const TextStyle(fontStyle: FontStyle.italic, fontSize: 18),
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.ellipsis,
                              maxLines: 3,
                            ),
                            const SizedBox(
                              height: 12,
                            ),
                            Text(
                              "\$ " + snapshot.data!.cost.toString(),
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.ellipsis,
                              maxLines: 2,
                            ),
                            const SizedBox(
                              height: 12,
                            ),
                            Text(
                              "Stock: " + snapshot.data!.amount.toString(),
                              style: const TextStyle(fontWeight: FontWeight.normal, fontSize: 16),
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.ellipsis,
                              maxLines: 2,
                            ),
                            const SizedBox(
                              height: 12,
                            ),
                            Row(
                              children: [
                                SizedBox(
                                  width: 40,
                                ),
                                Expanded(
                                  child: TextField(
                                    controller: amountController,
                                    decoration: const InputDecoration(hintText: "amount"),
                                  ),
                                ),
                                SizedBox(
                                  width: 40,
                                ),
                                Expanded(
                                  child: OutlinedButton(
                                    onPressed: () {
                                      int amount;
                                      if(amountController.text.isEmpty){
                                        amount = 1;
                                      } else {
                                        amount = int.parse(amountController.text);
                                      }
                                      if (snapshot.data!.amount <= amount) {
                                        Fluttertoast.showToast(
                                          msg: "This product is out of stock!",
                                          gravity: ToastGravity.BOTTOM,
                                          backgroundColor: Colors.red,
                                        );
                                        return;
                                      }
                                      CartService cartService = CartService();
                                      cartService.addToCart(
                                          snapshot.data!, amount);
                                      Fluttertoast.showToast(
                                          msg: "Added to cart!",
                                          gravity: ToastGravity.BOTTOM,
                                          backgroundColor: Colors.green);
                                    },
                                    child: Text(
                                      "Add to cart",
                                      style: kButtonLightTextStyle,
                                    ),
                                    style: OutlinedButton.styleFrom(
                                        backgroundColor: AppColors.background),
                                  ),
                                ),
                                SizedBox(
                                  width: 40,
                                ),
                              ],
                            ),
                            const SizedBox(
                              height: 12,
                            ),
                            Row(
                              children: const [
                                SizedBox(
                                  width: 20,
                                ),
                                Text(
                                  "Comments",
                                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            const Padding(
                              padding: EdgeInsets.symmetric(horizontal: 8),
                              child: Divider(
                                color: Colors.black,
                                thickness: 1,
                              ),
                            ),
                            FutureBuilder<List<String>>(
                              future:
                                  _productService.getUsersByCommentList(snapshot.data!.comments!),
                              builder: (context, commentSnapshot) {
                                if (commentSnapshot.connectionState == ConnectionState.waiting) {
                                  return const CircularProgressIndicator();
                                } else if (commentSnapshot.connectionState ==
                                    ConnectionState.done) {
                                  if (commentSnapshot.hasError) {
                                    return const Text('Error');
                                  } else if (commentSnapshot.hasData) {
                                    return Padding(
                                      padding: const EdgeInsets.all(10),
                                      child: Column(
                                        children: [
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.center,
                                            children: [
                                              commentSnapshot.data!.isNotEmpty
                                                  ? Expanded(
                                                      child: Column(
                                                        children: List.generate(
                                                            snapshot.data!.comments!.length,
                                                            (index) => CommentPreview(
                                                                comment: Comment(
                                                                    username: commentSnapshot
                                                                        .data![index],
                                                                    commentContent: snapshot
                                                                            .data!.comments![index]
                                                                        ["comment"]))),
                                                      ),
                                                    )
                                                  : const Text("There are no comments yet."),
                                            ],
                                          ),
                                          SizedBox(
                                            height: 8,
                                          ),
                                          OutlinedButton(
                                              onPressed: () {
                                                Navigator.push(
                                                    context,
                                                    MaterialPageRoute(
                                                        builder: (context) => AddCommentPage(
                                                              productID: widget.productID,
                                                            )));
                                              },
                                              child: const Text("Add comment")),
                                          SizedBox(
                                            height: 22,
                                          ),
                                        ],
                                      ),
                                    );
                                  } else {
                                    return const Text('Empty data');
                                  }
                                } else {
                                  return Text('State: ${commentSnapshot.connectionState}');
                                }
                              },
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              } else {
                return const Text('Empty data');
              }
            } else {
              return Text('State: ${snapshot.connectionState}');
            }
          },
        ),
      ),
    );
  }
}
