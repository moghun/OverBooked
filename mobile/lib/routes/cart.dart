import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/models/cart_obj.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/ui/cart_item.dart';
import 'package:mobile/views/checkout.dart';

class Cart extends StatefulWidget {
  const Cart({Key? key}) : super(key: key);

  @override
  State<Cart> createState() => _CartState();
}

class _CartState extends State<Cart> {
  Service db = Service();
  //CartItem
  List<int> _CartAmount = [];
  List<Product> _CartItemList = <Product>[];
  List<bool> _CartFavorites = [];
  late SharedPreferences prefs;
  double sum = 0;

  Future getProducts() async {
    var value = await CartObj.getItems();
    Product currentProduct;
    for (int i = 0; i < value[0].length; i++) {
      currentProduct = await getTheProduct(value[0][i]);
      _CartItemList.add(currentProduct);
      _CartAmount.add(int.parse(value[1][i]));
      sum = sum + currentProduct.price.toDouble() * _CartAmount[i];
      if (isFavorite(value[0][i])) {
        _CartFavorites.add(true);
      } else {
        _CartFavorites.add(false);
      }
    }
  }

  Future<Product> getTheProduct(String pid) async {
    return await db.getTheProduct(pid);
  }

  Future getPrefs() async {
    prefs = await SharedPreferences.getInstance();
  }

  Future _deleteCart() async {
    prefs.setStringList("cart", []);
    setState(() {
      _CartItemList = [];
      _CartAmount = [];
      _CartFavorites = [];
      sum = 0;
    });
  }

  handleFavorites(String pid) {
    if (prefs.getStringList("favorites") == null) {
      print("created");
      prefs.setStringList("favorites", [pid]);
    } else if (prefs.getStringList("favorites")!.contains(pid)) {
      print("deleted");
      var temp = prefs.getStringList("favorites")!;
      temp.remove(pid);
      prefs.setStringList("favorites", temp);
    } else {
      print("added");
      var temp = prefs.getStringList("favorites")!;
      temp.add(pid);
      prefs.setStringList("favorites", temp);
    }
  }

  bool isFavorite(String pid) {
    if (prefs.getStringList("favorites") == null) {
      return false;
    } else if (prefs.getStringList("favorites")!.contains(pid)) {
      return true;
    } else {
      return false;
    }
  }

  @override
  void initState() {
    super.initState();
    getPrefs();
    getProducts().then((value) {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Text(
              'Shopping Cart',
              style: kAppBarTitleTextStyle,
              textAlign: TextAlign.left,
            ),
            Text('  -  ${_CartAmount.length} items',
                textScaleFactor: 0.8, style: TextStyle(color: Colors.black45))
          ],
        ),
        backgroundColor: Colors.white,
        centerTitle: false,
        elevation: 2,
      ),
      body: Column(
        children: [
          const SizedBox(
            height: 8,
          ),
          Expanded(
            child: ListView.builder(
                scrollDirection: Axis.vertical,
                shrinkWrap: true,
                itemCount: _CartItemList.length,
                itemBuilder: (context, i) {
                  return CartItem(
                      product: _CartItemList[i],
                      amount: _CartAmount[i],
                      favorite: _CartFavorites[i],
                      refreshFunction: (String type) {
                        if (type == "favorite") {
                          handleFavorites(_CartItemList[i].pid);
                          return;
                        }
                        setState(() {
                          if (type == "add") {
                            _CartAmount[i] = _CartAmount[i] + 1;
                            sum = sum + _CartItemList[i].price;
                          } else if (type == "remove") {
                            _CartAmount[i] = _CartAmount[i] - 1;
                            sum = sum - _CartItemList[i].price;
                            if (_CartAmount[i] == 0) {
                              _CartItemList.removeAt(i);
                              _CartAmount.removeAt(i);
                            }
                          } else if (type == "delete") {
                            // delete
                            sum = sum - _CartItemList[i].price * _CartAmount[i];
                            _CartItemList.removeAt(i);
                            _CartAmount.removeAt(i);
                          }
                        });
                      });
                }),
          ),
          const Divider(thickness: 1, height: 1, color: Colors.black12),
          SizedBox(
            height: 64,
            child: Material(
                color: Colors.white,
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(vertical: 4, horizontal: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text('Total'),
                          const SizedBox(width: 8),
                          Text(
                            '$sum USD',
                            style: kTextTitleMedium,
                          ),
                        ],
                      ),
                      SizedBox(
                        width: 200,
                        child: TextButton(
                          child: const Text('Proceed to Checkout'),
                          style: TextButton.styleFrom(
                            primary: Colors.white,
                            backgroundColor: AppColors.primary,
                            onSurface: Colors.grey,
                          ),
                          onPressed: () {
                            if (_CartAmount.isNotEmpty) {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (_) => Checkout(
                                            sum: sum,
                                            CartItemList: _CartItemList,
                                            CartAmount: _CartAmount,
                                            deleteCart: _deleteCart,
                                          )));
                            }
                          },
                        ),
                      )
                    ],
                  ),
                )),
          )
        ],
      ),
    );
  }
}
