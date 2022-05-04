import 'package:flutter/material.dart';
import 'package:mobile/pages/homepage.dart';
import 'package:mobile/pages/profile.dart';
import 'package:mobile/pages/sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'pages/basket.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  var routes = [
    const HomePage(),
    const Basket(),
    const SignIn()
  ];


  @override
  void initState() {
    super.initState();
    // obtain shared preferences
  }

  //BottomNavigation
  static int _selectedBottomTabIndex = 0;

  void _onBottomTabPress(int index) {
    setState(() {
      _selectedBottomTabIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: routes[_selectedBottomTabIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
              backgroundColor: const Color(0xFFe6b619)),
          BottomNavigationBarItem(
              icon: Icon(Icons.shopping_basket),
              label: 'Basket',
              backgroundColor: const Color(0xFFe6b619)),
          BottomNavigationBarItem(
              icon: Icon(Icons.account_circle),
              label: 'Profile',
              backgroundColor: const Color(0xFFe6b619))
        ],
        currentIndex: _selectedBottomTabIndex,
        selectedItemColor: Colors.amber[800],
        onTap: _onBottomTabPress,
      ),
    );
  }
}