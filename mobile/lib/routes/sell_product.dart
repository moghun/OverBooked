import 'package:flutter/material.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/views/sell_product/add_product.dart';
import 'package:mobile/views/sell_product/my_products.dart';
// import 'package:mobile/views/sell_product/my_stocks.dart';

class SellProduct extends StatefulWidget {
  const SellProduct({Key? key}) : super(key: key);

  @override
  State<SellProduct> createState() => _SellProductState();
}

class _SellProductState extends State<SellProduct>
    with TickerProviderStateMixin {

  void refreshFunc() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            toolbarHeight: 55,
            centerTitle: true,
            title: const Text("Sell Products"),
            backgroundColor: AppColors.primary,
            elevation: 0.0,
          ),
          body: MyProducts(),
          floatingActionButton: FloatingActionButton.extended(
              backgroundColor: AppColors.primary,
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (_) => AddProduct(
                              refreshFunc: refreshFunc,
                            )));
              },
              label: const Text("New"),
              icon: const Icon(Icons.add)),
        ));
  }
}
