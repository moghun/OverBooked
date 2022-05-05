import 'dart:convert';
import 'package:mobile/utils/dimensions.dart';
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

  @override
  void initState() {
    super.initState();
  }

  Future<List<Product>> getAllBooks() async {

    try {
      final response = await http.get(Uri.parse('http://10.0.2.2:5001/api/products/'));
      if (response.statusCode >= 200 && response.statusCode < 400) {
        var productsJson = jsonDecode(response.body) as List;
        List<Product> products = productsJson.map((prod) => Product.fromJson(prod)).toList();
        return products;
      }
      else {
        print(response.statusCode);
      }

    } catch (e) {
      print(e.toString());
    }
    return [];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const nav_draw(),
      appBar: ActionBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Row(children: [
                Expanded(child: TextFormField()),
                IconButton(onPressed: () {}, icon: const Icon(Icons.search))
              ]),
            ),
            // SizedBox(
            //   height: 60,
            //   child: ListView(
            //     scrollDirection: Axis.horizontal,
            //     children: List.generate(_categories.length, (int index) {
            //       return OutlinedButton(
            //         onPressed: () {},
            //         child: Container(
            //           height: 50.0,
            //           child: Text(_categories[index]),
            //         ),
            //       );
            //     }),
            //   ),
            // ),

            const SizedBox(height: 8,),
            Text(
              "Featured Products",
              style: kHeadingTextStyle,
            ),
            FutureBuilder<List<Product>>(
              future: getAllBooks(),
              builder: (context, snapshot){
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                } else if (snapshot.connectionState == ConnectionState.done) {
                  if (snapshot.hasError) {
                    return const Text('Error');
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
            //Book of the Day
          ],
        ),
      ),
    );
  }
}
