import 'package:flutter/material.dart';
import 'package:mobile/services/product_service.dart';
import 'package:mobile/components/main_app_bar.dart';

class AddCommentPage extends StatefulWidget {
  const AddCommentPage({Key? key, required this.productID}) : super(key: key);

  final String productID;

  @override
  _AddCommentPageState createState() => _AddCommentPageState();
}

class _AddCommentPageState extends State<AddCommentPage> {
  final ProductService _productService = ProductService();
  String comment = "";

  var items = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];
  String dropDownValue = '5';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainAppBar(),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Center(
          child: Column(
            children: [
              TextFormField(
                onChanged: (value) {
                  setState(() {
                    comment = value;
                  });
                },
              ),
              Row(
                children: [
                  const Text("Rate product: "),
                  DropdownButton(

                    // Initial Value
                    value: dropDownValue,

                    // Down Arrow Icon
                    icon: const Icon(Icons.keyboard_arrow_down),

                    // Array list of items
                    items: items.map((String items) {
                      return DropdownMenuItem(
                        value: items,
                        child: Text(items),
                      );
                    }).toList(),
                    // After selecting the desired option,it will
                    // change button value to selected value
                    onChanged: (String? newValue) {
                      setState(() {
                        dropDownValue = newValue!;
                      });
                    },
                  ),
                ],
              ),
              OutlinedButton(
                  onPressed: () {
                    _productService.addCommentOnProduct(
                        widget.productID, comment, int.parse(dropDownValue));
                  },
                  child: const Text("Add")),
            ],
          ),
        ),
      ),
    );
  }
}
