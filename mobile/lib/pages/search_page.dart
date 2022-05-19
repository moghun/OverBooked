import 'package:flutter/material.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/services/product_service.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/components/main_app_bar.dart';
import 'package:mobile/components/product_preview.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key, required this.query}) : super(key: key);

  final String query;
  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {

  final ProductService _productService = ProductService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainAppBar(),
      body: Column(
        children: [
          FutureBuilder<List<Product>>(
            future: _productService.getProductsBySearch(widget.query),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const CircularProgressIndicator();
              } else if (snapshot.connectionState == ConnectionState.done) {
                if (snapshot.hasError) {
                  return Text(snapshot.error.toString() + snapshot.stackTrace.toString(), style: kButtonLightTextStyle,);
                } else if (snapshot.hasData) {
                  return SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Padding(
                      padding: Dimen.regularPadding,
                      child: Row(
                        children: List.generate(
                            snapshot.data!.length,
                                (index) => Row(children: [
                              ProductPreview(
                                product: snapshot.data![index],
                              ),
                              const SizedBox(width: 8)
                            ])),
                      ),
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
        ],
      ),
    );
  }
}
