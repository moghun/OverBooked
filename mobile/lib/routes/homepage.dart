import 'package:mobile/services/product_service.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/views/main_app_bar.dart';
import 'package:mobile/views/product_preview.dart';
import 'package:flutter/material.dart';
import 'package:mobile/models/product.dart';
import '../views/side_drawer.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ProductService _productService = ProductService();

  @override
  void initState() {
    super.initState();
  }

  Future<List<Product>> getAllBooks() async {
    var products = await _productService.getAllProducts();
    return products ?? [];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const SideDrawer(),
      appBar: MainAppBar(),
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
            const SizedBox(
              height: 8,
            ),
            Text(
              "Featured Products",
              style: kHeadingTextStyle,
            ),
            FutureBuilder<List<Product>>(
              future: getAllBooks(),
              builder: (context, snapshot) {
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
