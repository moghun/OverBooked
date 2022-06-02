import 'package:mobile/pages/search_page.dart';
import 'package:mobile/services/product_service.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/components/main_app_bar.dart';
import 'package:mobile/components/product_preview.dart';
import 'package:flutter/material.dart';
import 'package:mobile/models/product.dart';
import '../components/side_drawer.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ProductService _productService = ProductService();
  final _searchFormKey = GlobalKey<FormState>();
  String _search = "";

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
              child: Form(
                key: _searchFormKey,
                child: Row(children: [
                  Expanded(child: TextFormField(
                    onSaved: (value) {
                      if (value != null) {
                        _search = value;
                      }
                    },
                  )),
                  IconButton(
                      onPressed: () {
                        _searchFormKey.currentState!.save();
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => SearchPage(
                                      query: _search,
                                    )));
                      },
                      icon: const Icon(Icons.search))
                ]),
              ),
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
                  return Column(
                    children: const [
                      SizedBox(
                        height: 121,
                      ),
                      SizedBox(
                        child: CircularProgressIndicator(
                          strokeWidth: 7,
                        ),
                        width: 70,
                        height: 70,
                      ),
                      SizedBox(
                        height: 121,
                      ),
                    ],
                  );
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
            const SizedBox(
              height: 12,
            ),
            Text(
              "On Sale",
              style: kHeadingTextStyle,
            ),
            FutureBuilder<List<Product>>(
              future: getAllBooks(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Column(
                    children: const [
                      SizedBox(
                        height: 30,
                      ),
                      SizedBox(
                        child: CircularProgressIndicator(
                          strokeWidth: 7,
                        ),
                        width: 70,
                        height: 70,
                      ),
                      SizedBox(
                        height: 30,
                      ),
                    ],
                  );
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
                                    if (snapshot.data![index].sale!) ...[
                                      ProductPreview(
                                        product: snapshot.data![index],
                                      ),
                                      const SizedBox(width: 8),
                                    ],
                                Text(snapshot.data![2].sale!.toString() + snapshot.data![1].name),
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
