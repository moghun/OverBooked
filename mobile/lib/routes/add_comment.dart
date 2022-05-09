import 'package:flutter/material.dart';
import 'package:mobile/services/product_service.dart';
import 'package:mobile/views/main_app_bar.dart';

class AddComment extends StatefulWidget {
  const AddComment({Key? key, required this.productID}) : super(key: key);

  final String productID;

  @override
  _AddCommentState createState() => _AddCommentState();
}

class _AddCommentState extends State<AddComment> {
  final ProductService _productService = ProductService();
  String comment = "";

  var items = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];
  String dropdownvalue = '1';
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
                  Text("Rate product: "),
                  DropdownButton(

                    // Initial Value
                    value: dropdownvalue,

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
                        dropdownvalue = newValue!;
                      });
                    },
                  ),
                ],
              ),
              OutlinedButton(
                  onPressed: () {
                    _productService.addCommentOnProduct(
                        widget.productID, comment, int.parse(dropdownvalue));
                  },
                  child: Text("Add")),
            ],
          ),
        ),
      ),
    );
  }
}
