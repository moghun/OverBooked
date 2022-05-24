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

  var items = [
    'No sort',
    'Price ascending',
    'Price descending',
    'Name ascending (A-Z)',
    'Name descending (Z-A)',
  ];
  String dropDownValue = 'No sort';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainAppBar(),
      body: Column(
        children: [
          const SizedBox(
            height: 15,
          ),
          Text(
            "Search results for: \"" + widget.query + "\"",
            style: const TextStyle(fontSize: 18),
          ),
          const SizedBox(
            height: 15,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "Sort by: ",
                style: TextStyle(fontSize: 18),
              ),
              SizedBox(
                width: 225,
                height: 40,
                child: InputDecorator(
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(8))),
                    contentPadding: EdgeInsets.all(10),
                  ),
                  child: DropdownButton(
                    isExpanded: true,
                    underline: const SizedBox.shrink(),
                    style: const TextStyle(fontSize: 18, color: Colors.black),
                    value: dropDownValue,
                    icon: const Icon(Icons.keyboard_arrow_down),
                    items: items.map((String items) {
                      return DropdownMenuItem(
                        value: items,
                        child: Text(items),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      setState(() {
                        dropDownValue = newValue!;
                      });
                    },
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(
            height: 10,
          ),
          FutureBuilder<List<Product>>(
            future: _productService.getProductsBySearch(widget.query),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const CircularProgressIndicator();
              } else if (snapshot.connectionState == ConnectionState.done) {
                if (snapshot.hasError) {
                  return Text(
                    snapshot.error.toString() + snapshot.stackTrace.toString(),
                    style: kButtonLightTextStyle,
                  );
                } else if (snapshot.hasData) {
                  List<Product> productList = List.from(snapshot.data!);
                  if (dropDownValue == 'Price ascending') {
                    productList.sort((a, b) => a.cost.compareTo(b.cost));
                  } else if (dropDownValue == 'Price descending') {
                    productList.sort((a, b) => b.cost.compareTo(a.cost));
                  } else if (dropDownValue == 'Name ascending (A-Z)') {
                    productList.sort((a, b) => a.name.compareTo(b.name));
                  } else if (dropDownValue == 'Name descending (Z-A)') {
                    productList.sort((a, b) => b.name.compareTo(a.name));
                  }
                  return SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Padding(
                      padding: Dimen.regularPadding,
                      child: Row(
                        children: List.generate(
                            productList.length,
                            (index) => Row(children: [
                                  ProductPreview(
                                    product: productList[index],
                                  ),
                                  const SizedBox(width: 8),
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
