import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/auth.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/ui/product_preview.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/dimension.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/ui/edit_product_preview.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/views/sell_history.dart';
import 'package:mobile/views/sold_order_card.dart';

class SellerPage extends StatefulWidget {
  const SellerPage(
      {Key? key, required this.sellerRef})
      : super(key: key);
  final DocumentReference sellerRef;

  @override
  State<SellerPage> createState() => _SellerPageState();
}

class _SellerPageState extends State<SellerPage> {
  TextEditingController searchTextController = TextEditingController();

  List<Product> allProducts = [];
  List<Product> productsOnSale = [];

  late String _currentSeller;
  double _currentRating = 0.0;

  Future getAProducts() async {
    // var sellerRef =
    // Service.userCollection.doc(Provider.of<UserObj?>(context)!.uid);
    var productsDocs = (await Service.productCollection
            .where("seller", isEqualTo: widget.sellerRef)
            .get())
        .docs;
    List<Product> productsList = <Product>[];
    String sellerName = "";
    num stocks;
    for (var i = 0; i < productsDocs.length; i++) {
      var currentProductDoc = productsDocs[i];
      stocks = currentProductDoc.get("stocks");
      if (stocks > 0) {
        DocumentReference sellerRef2 = currentProductDoc.get("seller");
        sellerName = (await sellerRef2.get()).get("sellerName");

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
    _currentSeller = sellerName;

    filterProductsOnSale(productsList);
    setState(() {
      allProducts = productsList;
    });
  }

  Future getRating() async {
    var o = await Service.ordersCollection
        .where("seller", isEqualTo: widget.sellerRef)
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
      setState(() {
        _currentRating = _rating;
      });
    }
  }

  filterProductsOnSale(List<Product> pAll) {
    List<Product> catProducts = [];
    pAll.forEach((item) => {
          if (item.onSale == true) {catProducts.add(item)},
        });
    setState(() {
      productsOnSale = catProducts;
    });
  }

  @override
  void initState() {
    super.initState();
    getAProducts();
    getRating();
  }

  @override
  Widget build(BuildContext context) {
    if (allProducts.length < 1) {
      return Center(
        child: CircularProgressIndicator(),
      );
    }
    return Scaffold(
        appBar: AppBar(
          title: Text(_currentSeller),
          backgroundColor: AppColors.primary,
        ),
        body: Padding(
          padding: const EdgeInsets.all(12),
          child: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Rating:",
                      style: kTextTitleMedium,
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          _currentRating.toString(),
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

                SizedBox(
                  height: 30,
                ),
                Column(
                  children: [
                    Text(
                      'Products On Sale',
                      style: kTextTitle,
                    ),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Padding(
                        padding: Dimen.regularPadding,
                        child: Row(
                          children: List.generate(
                              productsOnSale.length,
                              (index) => Row(children: [
                                    productPreview(
                                        productsOnSale[index], context),
                                    const SizedBox(width: 8)
                                  ])),
                        ),
                      ),
                    ),
                  ],
                ),
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
                                    productPreview(allProducts[index], context),
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
  }
}
