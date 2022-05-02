import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/service.dart';

class AddProduct extends StatefulWidget {
  const AddProduct({Key? key, this.refreshFunc}) : super(key: key);

  final Function? refreshFunc;

  @override
  _AddProductState createState() => _AddProductState();
}

class _AddProductState extends State<AddProduct> {
  Service db = Service();
  String name = "";
  String description = "";
  bool onSale = false;
  num oldPrice = 0;
  num price = 0;
  num stocks = 0;
  File? productPicture;
  int? _currentCategory;
  String _currentTag = "All";
  static final _categories = [
    "Computer",
    "Components",
    "Peripherals",
    "Consoles"
  ];
  static final _tags = [
    <String>[
      'All',
      'Desktop',
      'Gaming Desktops',
      'Notebook',
      'Gaming Notebooks',
      'All-in-One Computers',
      'Workstation Systems'
    ],
    <String>[
      'All',
      'CPUs',
      'Memory',
      'Motherboards',
      'Computer Cases',
      'Power Supplies',
      'Video Cards',
      'Fans & PC Cooling',
      'SSDs',
      'Hard Drives',
      'USB Flash Drives & Memory Cards',
    ],
    <String>[
      'All',
      'Monitor',
      'Mouse',
      'Keyboard',
      'Gaming Chair',
    ],
    <String>[
      'All',
      'PS5',
      'PS4',
      'PS3',
      'Xbox One X',
      'Xbox One S',
    ]
  ];
  static final _categoryItems = _categories
      .asMap()
      .entries
      .map((e) => DropdownMenuItem<int>(
            value: e.key,
            child: Text(e.value),
          ))
      .toList();
  static final _tagItems = _tags
      .map((e) => e.map<DropdownMenuItem<String>>((String value) {
            return DropdownMenuItem<String>(
              value: value,
              child: Text(value),
            );
          }).toList())
      .toList();
  static final _onSaleItems = [
    DropdownMenuItem<bool>(value: true, child: Text('On Sale')),
    DropdownMenuItem<bool>(value: false, child: Text('Not On Sale'))
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Add Product"),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.all(8.0),
          child: Column(
            children: [
              TextField(
                decoration: const InputDecoration(hintText: "Name"),
                onChanged: (value) {
                  name = value;
                },
              ),
              TextField(
                decoration: const InputDecoration(hintText: "Description"),
                onChanged: (value) {
                  description = value;
                },
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  OutlinedButton.icon(
                    onPressed: () async {
                      final ImagePicker _picker = ImagePicker();
                      final XFile? image =
                          await _picker.pickImage(source: ImageSource.gallery);
                      setState(() {
                        productPicture =
                            image == null ? null : File(image.path);
                      });
                    },
                    label: const Text("Set Picture"),
                    icon: const Icon(Icons.photo_camera),
                  ),
                  Visibility(
                    visible: productPicture != null,
                    child: const Text(
                      "Product Image Set!",
                      style: TextStyle(color: Colors.green),
                    ),
                  ),
                  Container()
                ],
              ),
              TextField(
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(hintText: "Price"),
                onChanged: (value) {
                  try {
                    price = num.parse(value);
                  } catch (e) {
                    price = 0;
                  }
                },
              ),
              DropdownButton(
                hint: const Text("On Sale?"),
                isExpanded: true,
                value: onSale,
                items: _onSaleItems,
                onChanged: (bool? newValue) {
                  setState(() {
                    onSale = newValue!;
                  });
                },
              ),
              Visibility(
                visible: onSale,
                child:  TextField(
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(hintText: "Old Price"),
                  onChanged: (value) {
                    try {
                      oldPrice = num.parse(value);
                    } catch (e) {
                      oldPrice = 0;
                    }
                  },
                )
              ),
              TextField(
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(hintText: "Stocks"),
                onChanged: (value) {
                  try {
                    stocks = num.parse(value);
                  } catch (e) {
                    stocks = 0;
                  }
                },
              ),
              DropdownButton(
                hint: const Text("Choose Category"),
                isExpanded: true,
                items: _categoryItems,
                value: _currentCategory,
                onChanged: (int? newValue) {
                  setState(() {
                    _currentCategory = newValue!;
                    _currentTag = _tags[_currentCategory!][0];
                  });
                },
              ),
              Visibility(
                visible: _currentCategory != null,
                child: DropdownButton(
                  hint: const Text("Choose Tag"),
                  isExpanded: true,
                  items: _currentCategory == null
                      ? _tagItems[0]
                      : _tagItems[_currentCategory!],
                  value: _currentTag,
                  onChanged: (String? newValue) {
                    setState(() {
                      _currentTag = newValue!;
                    });
                  },
                ),
              ),
              OutlinedButton.icon(
                onPressed: () async {
                  if (name == "" ||
                      productPicture == null ||
                      price == 0 ||
                      stocks == 0 ||
                      _currentCategory == null) {
                    showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                              title: const Text("Missing Information"),
                              content: const Text(
                                  "Please make sure to fill all the information about your product!"),
                              actions: [
                                TextButton(
                                  child: const Text("Ok"),
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                )
                              ]);
                        });
                  } else {
                    var sellerRef = Service.userCollection.doc(
                        Provider.of<UserObj?>(context, listen: false)!.uid);
                    await db.addProduct(
                        _categories[_currentCategory!],
                        name,
                        price,
                        sellerRef,
                        _currentTag,
                        productPicture!,
                        stocks,
                        description,
                        onSale,
                        oldPrice);
                    widget.refreshFunc!();
                    showDialog(
                        context: context,
                        builder: (BuildContext context2) {
                          return AlertDialog(
                              title: const Text("Success"),
                              content:
                                  const Text("Your product has been added!"),
                              actions: [
                                TextButton(
                                  child: const Text("Ok"),
                                  onPressed: () {
                                    Navigator.of(context2).pop();
                                    Navigator.of(context).pop();
                                    // Provider.of<BottomNav>(context, listen: false)
                                    //     .switchTo(0);
                                  },
                                )
                              ]);
                        });
                  }
                },
                icon: const Icon(Icons.add),
                label: const Text("Add Product"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
