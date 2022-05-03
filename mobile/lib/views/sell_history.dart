import 'package:flutter/material.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/views/history_card.dart';
import 'package:mobile/views/sold_order_card.dart';

class SellHistory extends StatefulWidget {
  const SellHistory({Key? key, required this.uid}) : super(key: key);
  final String uid;

  @override
  State<SellHistory> createState() => _SellHistoryState();
}

class _SellHistoryState extends State<SellHistory> {
  Future<List<Order>> getOrders() async {
    List<Order> orders = <Order>[];
    var sellerRef = Service.userCollection.doc(widget.uid);
    var o = await Service.ordersCollection
        .where("seller", isEqualTo: sellerRef)
        .get();
    for (var element in o.docs) {
      DocumentReference currentProduct = element.get("product");
      String currentProductName = (await currentProduct.get()).get("productName");
      num currentProductPrice = (await currentProduct.get()).get("price");
      String currentProductPicture =
      (await currentProduct.get()).get("imgURL");
      String currentPid = currentProduct.id;
      orders.add(Order(
          //buyer: currentBuyerName,
          //oid: element.id,
          url: currentProductPicture,
          productName: currentProductName,
          pid: currentPid,
          price: currentProductPrice,
          purchaseDate: element.get("purchaseDate"),
          amount: element.get("amount"),
          orderID: element.id,
          comment: element.get("comment"),
          isCommented: element.get("isCommented"),
          isRated: element.get("isRated"),
          rating: element.get("rating"),
          commentApproved: element.get("commentApproved")
      ));
    }
    return orders;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: getOrders(),
        builder: (context, AsyncSnapshot asyncSnapshot) {
          if (!asyncSnapshot.hasData) return const Text("Loading...");
          List<Order> orders = asyncSnapshot.data;
          if (orders.isEmpty) {
            return const Center(child: Text("No products have been sold"));
          }
          return ListView.builder(
            scrollDirection: Axis.vertical,
            itemCount: orders.length,
            itemBuilder: (context, index) {
              return SoldOrderCard(order: orders[index]);
            },
          );
        });
  }
}