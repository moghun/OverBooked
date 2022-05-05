import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:http/http.dart' as http;
import '../utils/api.dart';
import '../utils/colors.dart';
import '../utils/jsonParse/previewBooks.dart';
import '../utils/styles.dart';

/*final products = <Product>[
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

class ProductPage extends StatefulWidget {
  const ProductPage(
      {Key? key, required this.productID, required this.refreshFunc})
      : super(key: key);
  final int productID;
  final Function? refreshFunc;

  @override
  _ProductPageState createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  late String id;
  @override
  late String x;

  @override
  void initState() {
    super.initState();
    () async {
      await allBooks();
      setState(() {
        // Update your UI with the desired changes.
      });
      getProduct();
    } ();

    // obtain shared preferences
  }

  dynamic items;

  Future allBooks() async {
    final url = Uri.parse(API.allBooks);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = previewBooksFromJson(response.body);
        items =  await result;
        print(items[0].id);
        return result;
      }
      else {
        print(response.statusCode);
      }

    } catch (e) {
      print(e.toString());
    }
  }
  PreviewBooks? _product;
  Future<void> getProduct() async{
    PreviewBooks wanted = items[items.indexWhere((element) => element.id == widget.productID)];

    _product = wanted;
    print(_product?.title);
  }


  num stocks = 1;

  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      /*body: TextButton(onPressed:() {
        print(items[items.indexWhere((element) => element.id == widget.productID)].title);
      }, child: Text("bi sey")),*/
      body: Stack(
        children: [
          Container(
            child: Hero(
              tag: _product?.title ?? "",
              child: Image.network(
                  _product?.img ??
                      "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg",
                  fit: BoxFit.fitWidth),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(
              top: 48,
              left: 32,
            ),
            child: GestureDetector(
              onTap: () {
                Navigator.pop(context);
              },
              child: Align(
                alignment: Alignment.topLeft,
                child: Container(
                  height: 42,
                  width: 42,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Icon(
                      Icons.arrow_back,
                      color: AppColors.background,
                    ),
                  ),
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              height: size.height * 0.6,
              padding: EdgeInsets.only(top: 6),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Expanded(
                    child: Container(
                      padding: EdgeInsets.only(
                        right: 32,
                        left: 32,
                        bottom: 16,
                      ),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Text("${_product?.title}",
                                style: kHeadingTextStyle),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 8),
                              child: Row(children: [
                                Row(
                                  children: <Widget>[
                                    RatingBarIndicator(
                                      rating: _product?.raiting as double,
                                      itemBuilder: (context, index) =>
                                          const Icon(
                                        Icons.star,
                                        color: Colors.amber,
                                      ),
                                      itemCount: 5,
                                      itemSize: 25.0,
                                      unratedColor: Colors.amber.withAlpha(50),
                                      direction: Axis.horizontal,
                                    ),
                                    Text(
                                      "  ${_product?.raiting}",
                                      style: const TextStyle(
                                          color: Colors.amber, fontSize: 16),
                                    ),
                                  ],
                                ),
                                SizedBox(
                                  width: 12,
                                ),
                              ]),
                            ),
                            Expanded(
                              child: SingleChildScrollView(
                                physics: BouncingScrollPhysics(),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      /*_product?.desc ??*/ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec volutpat sem. Maecenas feugiat aliquam leo id luctus. Phasellus eu nunc sed ligula dignissim suscipit. Aenean dignissim lobortis nulla sit amet venenatis. In hac habitasse platea dictumst. Aliquam erat volutpat. Suspendisse pulvinar arcu eu enim malesuada, eu consequat elit luctus. In at est sit amet tortor sollicitudin tempor. Proin quis arcu pharetra, venenatis turpis nec, maximus lacus. Morbi diam neque, vulputate non magna vitae, dapibus facilisis lacus. Aliquam eleifend scelerisque lacus convallis tincidunt.",
                                    ),
                                    SizedBox(
                                      height: 30,
                                    ),
                                    Text(
                                      "writer: ",
                                      style: TextStyle(
                                          fontWeight: FontWeight.w300),
                                    ),
                                    Text(
                                      "publisher: ",
                                      style: TextStyle(
                                          fontWeight: FontWeight.w200),
                                    ),
                                    Text(
                                      "name:  ",
                                      style: TextStyle(
                                          fontWeight: FontWeight.w200),
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Container(
                                          width: size.width / 2 - 44,
                                          child: OutlinedButton(
                                            onPressed: () {},
                                            child: Text("Read Reviews"),
                                          ),
                                        ),
                                        Container(
                                          width: size.width / 2 - 44,
                                          child: OutlinedButton(
                                              onPressed: () {},
                                              child: Text("Add a Review")),
                                        ),
                                      ],
                                    )
                                  ],
                                ),
                              ),
                            ),
                          ]),
                    ),
                  ),
                  Container(
                    height: 100,
                    alignment: Alignment.bottomLeft,
                    width: size.width,
                    padding: EdgeInsets.only(
                      top: 16,
                      bottom: 32,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(30),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        IconButton(
                            onPressed: () {
                              setState(() {
                                print(stocks);
                                if (stocks > 0) {
                                  stocks = stocks - 1;
                                  print(stocks);
                                }
                              });
                            },
                            icon: Icon(Icons.remove)),
                        Container(
                          width: size.width / 3 - 44,
                          child: TextField(
                            controller: TextEditingController(text: "$stocks"),
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              isDense: true,
                            ),
                            onChanged: (value) {
                              stocks = num.parse(value);
                            },
                          ),
                        ),
                        IconButton(
                            onPressed: () {
                              setState(() {
                                print(stocks);

                                stocks = stocks + 1;
                              });
                            },
                            icon: Icon(Icons.add)),
                        SizedBox(
                          width: size.width / 2 - 30,
                          child: OutlinedButton(
                            onPressed: () {/*
                              print(stocks);
                              if (stocks > (_product?.stocks ?? 0)) {
                                showDialog(
                                    context: context,
                                    builder: (_) => AlertDialog(
                                          title:
                                              const Text("Not enough STOCKS"),
                                          content: Text(
                                              "You can at most buy ${_product?.stocks} of this product"),
                                          actions: [
                                            TextButton(
                                                onPressed: () {
                                                  Navigator.pop(context);
                                                },
                                                child: const Text("OK"))
                                          ],
                                        ));
                              }
                            */},
                            child: Text("Buy"),
                            style: ButtonStyle(
                              backgroundColor:
                                  MaterialStateProperty.resolveWith<Color?>(
                                      (Set<MaterialState> states) {
                                if (states.contains(MaterialState.pressed))
                                  return Theme.of(context)
                                      .colorScheme
                                      .primary
                                      .withOpacity(0.5);
                                return Colors.red.withOpacity(0.5);
                              }),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
