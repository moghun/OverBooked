import 'dart:convert';
import 'package:mobile/utils/api.dart';
import 'package:mobile/utils/colors.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/utils/jsonParse/previewBooks.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/views/action_bar.dart';
import 'package:mobile/views/product_preview.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/product.dart';

import '../views/nav_draw.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  //Categories
  static final _categories = [
    "Reccomerndations",
    "Best Seller",
    "SELLL OF",
    "something bla bla"
  ];
  static int _currentCategory = 0;

  @override
  void initState() {
    super.initState();
    allBooks().then((value) => print("value is: $value"));
    // obtain shared preferences
  }
  var counter = 0;
  dynamic items;

  Future allBooks() async {
    final url = Uri.parse(API.allBooks);
    List<Product> productsFromJson(String str) => List<Product>.from(json.decode(str).map((x) => Product.fromJson(x)));

    try {
      final response = await http.get(Uri.parse('http://10.0.2.2:5001/api/products/'));
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = productsFromJson(response.body);
        print("bura");
        print(result[0].id);
        setState(() {
          counter = result.length;
          items = result;
        });
        print(counter);
        return result;
      }
      else {
        print(response.statusCode);
      }

    } catch (e) {
      print(e.toString());
    }
  }

  //ProductPreview
  /*static final productPreviewList = <Product>[
    Product(
      id: 5,
      img:
          "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
      title: "Book name",
      rating: 3.7,
      price: 24.99,
      stocks: 30,
      publisher: "Seller1",
      desc: "No Description",
      author: "author1",
      category: "Games",
      amountSold: 0,
      releaseDate: "20",
    ),
    Product(
      id: 5,
      img:
      "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
      title: "Book name",
      rating: 3.7,
      price: 24.99,
      stocks: 30,
      author: "author1",
      publisher: "Seller1",
      desc: "No Description",
      category: "Games",
      amountSold: 0,
      releaseDate: "20",
    ),
  ];*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: nav_draw(),
      appBar: ActionBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(children: [
              Expanded(child: TextFormField()),
              IconButton(onPressed: () {print(items);}, icon: Icon(Icons.search))
            ]),
            SizedBox(
              height: 60,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: List.generate(_categories.length, (int index) {
                  return OutlinedButton(
                    onPressed: () {},
                    child: Container(
                      height: 50.0,
                      child: Text(_categories[index]),
                    ),
                  );
                }),
              ),
            ),

            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Padding(
                padding: Dimen.regularPadding,
                child: Row(
                  children: List.generate(
                      //productPreviewList.length,
                      counter,
                      (index) => Row(children: [
                            ProductPreview(
                              product: items[index],
                            ),
                            SizedBox(width: 8)
                          ])),
                ),
              ),
            ),
            Text(
              "Recommendations",
              style: kHeadingTextStyle,
            ),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Padding(
                padding: Dimen.regularPadding,
                child: Row(
                  children: List.generate(
                      counter,
                      (index) => Row(children: [
                            ProductPreview(product: items[index]),
                            SizedBox(width: 8)
                          ])),
                ),
              ),
            ),
            ProductPreview(product: new Product(id:"8389", name: "Deneme", cost: 874, amount: 2))
            //Book of the Day
          ],
        ),
      ),
    );
  }
}
