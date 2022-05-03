import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/ui/favorite_item.dart';

class Favorites extends StatefulWidget {
  const Favorites({Key? key}) : super(key: key);

  @override
  State<Favorites> createState() => _FavoritesState();
}

class _FavoritesState extends State<Favorites> {
  Service db = Service();
  late SharedPreferences prefs;
  //CartItem
  List<Product> _FavoriteItemList = <Product>[];

  Future getProducts() async {
    var value = prefs.getStringList("favorites");
    if (value == null) {
      prefs.setStringList("favorites", []);
      return;
    }
    Product currentProduct;
    for (int i = 0; i < value.length; i++) {
      currentProduct = await getTheProduct(value[i]);
      _FavoriteItemList.add(currentProduct);
    }
  }

  Future<Product> getTheProduct(String pid) async {
    return await db.getTheProduct(pid);
  }

  Future getPrefs() async {
    prefs = await SharedPreferences.getInstance();
  }

  removeFavorite(String pid, int position) {
    print("deleted");
    var temp = prefs.getStringList("favorites")!;
    temp.remove(pid);
    prefs.setStringList("favorites", temp);
    _FavoriteItemList.removeAt(position);
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    getPrefs().then((a) {
      getProducts().then((value) {
        setState(() {});
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Text(
              'My Favorites',
              style: kAppBarTitleTextStyle,
              textAlign: TextAlign.left,
            )
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
                itemCount: _FavoriteItemList.length,
                itemBuilder: (context, i) {
                  return FavoriteItem(
                      _FavoriteItemList[i], removeFavorite, i, context);
                }),
          ),
        ],
      ),
    );
  }
}
