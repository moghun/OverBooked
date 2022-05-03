import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/auth.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/models/account_list_item.dart';
import 'package:mobile/ui/account_list_item_tile.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  final AuthService authService = AuthService();

  Future<void> start() async {}

  @override
  void initState() {
    super.initState();
    start();
    // obtain shared preferences
  }

  static final _itemList = <AccountListItem>[
    AccountListItem(
        icon: Icon(Icons.local_shipping_outlined,
            color: Colors.black.withOpacity(0.7)),
        name: 'My Orders',
        route: '/profile/buy_sell_history'),
    // AccountListItem(
    //     icon: Icon(Icons.favorite_border, color: Colors.black.withOpacity(0.7)),
    //     name: 'My Favorites',
    //     route: '/'),
    // AccountListItem(
    //     icon:
    //         Icon(Icons.reviews_outlined, color: Colors.black.withOpacity(0.7)),
    //     name: 'My Reviews',
    //     route: '/'),
    AccountListItem(
        icon: Icon(Icons.notifications_outlined,
            color: Colors.black.withOpacity(0.7)),
        name: 'Notifications',
        route: '/notifications'),
    AccountListItem(
        icon: Icon(Icons.settings_outlined, color: Colors.black.withOpacity(0.7)),
        name: 'Edit My Account',
        route: '/edit_account')
  ];

  @override
  Widget build(BuildContext context) {
    UserObj? currentUser = Provider.of<UserObj?>(context);
    String pp = currentUser?.photoURL ?? "https://i.ibb.co/4Vw6XL0/logo-JPGblue-removebg.png";
    return Scaffold(
        body: SafeArea(
      child: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              color: AppColors.primary.withOpacity(0.1),
              height: 210,
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      children: [
                        const SizedBox(height: 10),
                        const Text(
                          'My Account',
                          style: TextStyle(
                            fontWeight: FontWeight.w500,
                            fontSize: 18.0,
                          ),
                        ),
                        const SizedBox(
                          height: 32,
                        ),
                         CircleAvatar(
                         backgroundImage: NetworkImage(pp),
                          backgroundColor: Colors.white,
                          radius: 40,
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(currentUser?.name ?? currentUser!.email!,
                            style: kAppBarTitleTextStyle),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                children: List.generate(
                    _itemList.length,
                    (index) => Row(children: [
                          Expanded(
                              child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 1),
                            child:
                                AccountListItemTile(_itemList[index], context),
                          ))
                        ])),
              ),
            ),
            const SizedBox(
              height: 16,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                        style: TextButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          primary: Colors.grey,
                        ),
                        onPressed: () {
                          authService.signOut();
                          Navigator.popAndPushNamed(context, '/login');
                        },
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [
                            Icon(Icons.logout, size: 24),
                            SizedBox(
                              width: 8,
                            ),
                            Text("Log Out",
                                style: TextStyle(
                                  color: Colors.black54,
                                  fontSize: 17.0,
                                ))
                          ],
                        )),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    ));
  }
}
