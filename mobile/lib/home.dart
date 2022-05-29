import 'package:flutter/material.dart';
import 'package:mobile/pages/home_page.dart';
import 'package:mobile/pages/login_page.dart';
import 'package:mobile/pages/cart_page.dart';
import 'package:mobile/pages/profile_page.dart';
import 'package:mobile/services/user_service.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  var routes = [
    const HomePage(),
    const CartPage(),
    const ProfilePage(),
    const LoginPage(),
  ];

  //BottomNavigation
  static int _selectedBottomTabIndex = 0;
  static int _routeIndex = 0;

  @override
  void initState() {
    super.initState();
    if(_selectedBottomTabIndex == 2 && UserService.getCurrentUser() != null){
      setState(() {
        _routeIndex = 2;
      });
    }
    else if(_selectedBottomTabIndex == 2 && UserService.getCurrentUser() == null){
      setState(() {
        _routeIndex = 3;
      });
    }
  }

  void onBottomTabPress(int index) {
    if (index == 2 && UserService.getCurrentUser() == null) {
      setState(() {
        _routeIndex = 3;
        _selectedBottomTabIndex = index;
      });
    } else {
      setState(() {
        _routeIndex = index;
        _selectedBottomTabIndex = index;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: routes[_routeIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
              backgroundColor: Color(0xFFe6b619)),
          BottomNavigationBarItem(
              icon: Icon(Icons.shopping_basket),
              label: 'Cart',
              backgroundColor: Color(0xFFe6b619)),
          BottomNavigationBarItem(
              icon: Icon(Icons.account_circle),
              label: 'Profile',
              backgroundColor: Color(0xFFe6b619))
        ],
        currentIndex: _selectedBottomTabIndex,
        selectedItemColor: Colors.amber[800],
        onTap: onBottomTabPress,
      ),
    );
  }
}
