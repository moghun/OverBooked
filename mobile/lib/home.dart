import 'package:flutter/material.dart';
import 'package:mobile/routes/homepage.dart';
import 'package:mobile/routes/log_in.dart';
import 'package:mobile/routes/basket.dart';
import 'package:mobile/routes/profile.dart';
import 'package:mobile/services/user_service.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  var routes = [
    const HomePage(),
    const Basket(),
    const Profile(),
    const LogIn(),
  ];

  @override
  void initState() {
    super.initState();
    // obtain shared preferences
  }

  //BottomNavigation
  static int _selectedBottomTabIndex = 0;
  static int _routeIndex = 0;

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
              label: 'Basket',
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
