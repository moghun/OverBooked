import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/auth.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/dimension.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/ui/edit_product_preview.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/views/sell_history.dart';
import 'package:mobile/views/sold_order_card.dart';

class MyProducts extends StatefulWidget {
  const MyProducts({Key? key}) : super(key: key);

  @override
  State<MyProducts> createState() => _MyProductsState();
}

class _MyProductsState extends State<MyProducts> {
  TextEditingController searchTextController = TextEditingController();
  Future<List<Product>> getAProducts() async {
    var sellerRef =
        Service.userCollection.doc(Provider.of<UserObj?>(context)!.uid);
    var productsDocs = (await Service.productCollection
            .where("seller", isEqualTo: sellerRef)
            .get())
        .docs;
    List<Product> productsList = <Product>[];
    num stocks = 0;
    for (var i = 0; i < productsDocs.length; i++) {
      var currentProductDoc = productsDocs[i];
      stocks = currentProductDoc.get("stocks");
      if (stocks > 0) {
        DocumentReference sellerRef = currentProductDoc.get("seller");
        String sellerName = (await sellerRef.get()).get("sellerName");
        var currentProduct = Product(
            pid: currentProductDoc.id,
            imgURL: currentProductDoc["imgURL"],
            productName: currentProductDoc.get("productName"),
            rating: currentProductDoc.get("rating"),
            price: currentProductDoc.get("price"),
            seller: sellerName,
            description: currentProductDoc.get("description"),
            category: currentProductDoc["category"],
            tag: currentProductDoc["tag"],
            onSale: currentProductDoc["onSale"],
            stocks: currentProductDoc["stocks"],
            oldPrice: currentProductDoc["oldPrice"] ?? 0);

        productsList.add(currentProduct);
      }
    }
    filterProductsOnSale(productsList);

    return productsList;
  }

  Future<double> getRating() async {
    var sellerRef =
        Service.userCollection.doc(Provider.of<UserObj?>(context)!.uid);
    var o = await Service.ordersCollection
        .where("seller", isEqualTo: sellerRef)
        .get();
    double total = 0.0;
    double _rating = 0.0;
    num count = 0;
    for (var element in o.docs) {
      var rating = element.get("rating");
      if (rating > 0) {
        total += rating;
        count += 1;
      }
    }

    if (count > 0) {
      _rating = total / count;
    }
    return _rating;
  }

  filterProductsOnSale(List<Product> pAll) {
    List<Product> catProducts = [];
    pAll.forEach((item) => {
          if (item.onSale == true) {catProducts.add(item)},
        });
    //  setState(() {
    //       productsOnSale = catProducts;
    // });
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    UserObj? currentUser = Provider.of<UserObj?>(context);

    return FutureBuilder(
        future: Future.wait([getAProducts(), getRating()]),
        builder: (context, AsyncSnapshot<List<dynamic>> snapshot) {
          if (!snapshot.hasData) {
            return const Text("Loading..");
          } else if (((snapshot.data)![0]).isEmpty) {
            return const Center(
                child:
                    Text("You are not selling any products. Try adding some!"));
          }
          List<Product> allProducts = (snapshot.data)?[0] as List<Product>;
          double _rating = (snapshot.data)?[1] as double;

          return Scaffold(
              body: Padding(
            padding: const EdgeInsets.all(8),
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "${currentUser?.name ?? currentUser!.email!}'s Current Rating",
                        style: kTextTitleMedium,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            _rating.toString(),
                            style: kTextTitleMedium,
                          ),
                          Icon(
                            Icons.star,
                            color: Colors.amber,
                          ),
                        ],
                      )
                    ],
                  ),

                  // SizedBox(height: 30,),
                  // Column(
                  //   children: [
                  //     Text('Products Sold' ,
                  //       style: kTextTitle,

                  //     ),
                  //     SingleChildScrollView(
                  //       scrollDirection: Axis.horizontal,
                  //       child: Padding(
                  //         padding: Dimen.regularPadding,
                  //         child: Row(
                  //           children: List.generate(
                  //               soldProducts.length,
                  //                   (index) => Row(children: [

                  //                     SoldOrderCard(order: soldProducts[index]),
                  //                 const SizedBox(width: 8)
                  //               ])),
                  //         ),
                  //       ),
                  //     )   ,
                  //   ],
                  // ),

                  // SizedBox(height: 30,),
                  // Column(
                  //   children: [
                  //      Text('Products On Sale' ,
                  //   style: kTextTitle,

                  //     ),
                  //     SingleChildScrollView(
                  //     scrollDirection: Axis.horizontal,
                  //     child: Padding(
                  //       padding: Dimen.regularPadding,
                  //       child: Row(
                  //         children: List.generate(
                  //             productsOnSale.length,
                  //             (index) => Row(children: [
                  //                   editProductPreview(productsOnSale[index], context,
                  //                       () {
                  //                     setState(() {});
                  //                   }),
                  //                   const SizedBox(width: 8)
                  //                 ])),
                  //       ),
                  //     ),
                  //    )   ,
                  //   ],
                  // ),
                  SizedBox(
                    height: 30,
                  ),

                  Column(
                    children: [
                      Text(
                        "All Products",
                        style: kTextTitle,
                      ),
                      // SellHistory(uid:  Service.userCollection.doc(Provider.of<UserObj?>(context)!.uid).toString()),
                      SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Padding(
                          padding: Dimen.regularPadding,
                          child: Row(
                            children: List.generate(
                                allProducts.length,
                                (index) => Row(children: [
                                      editProductPreview(
                                          allProducts[index], context, () {
                                        setState(() {
                                        });
                                      }),
                                      const SizedBox(width: 8)
                                    ])),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ));
        });
  }
}
