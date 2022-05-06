import 'package:flutter/material.dart';

class SideDrawer extends StatelessWidget {
  const SideDrawer({Key? key}) : super(key: key);
  static final _categories = [
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
    "Menu item",
  ];

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.amber,
      elevation: 2.0,
      child:ListView(
        scrollDirection: Axis.vertical,
        children: List.generate(_categories.length, (int index) {
          return OutlinedButton(
            
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFFFFFFFF)),
              padding:  MaterialStateProperty.all(const EdgeInsets.all(20)),

            ),

            onPressed: () {

            },
            child: Container(
              width: 200,


              color: const Color(0xFFe6b619),
              height: 50.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(_categories[index],style: const TextStyle(color: Colors.black),),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
