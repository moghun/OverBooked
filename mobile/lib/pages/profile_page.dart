import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/pages/user_orders_page.dart';
import 'package:mobile/pages/wishlist_page.dart';
import 'package:mobile/services/user_service.dart';
import 'package:mobile/utils/colors.dart';
import 'package:mobile/utils/styles.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  void initState() {
    super.initState();
  }

  final User user = UserService.getCurrentUser()!;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: const Text("Profile"),
          backgroundColor: AppColors.background,
        ),
        body: SingleChildScrollView(
          child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Expanded(
                  child: Column(children: [
                    Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Row(
                        children: [
                          Expanded(
                            child: Container(
                              decoration: BoxDecoration(
                                  color: AppColors.background2,
                                  borderRadius: BorderRadius.circular(20)),
                              child: Column(
                                children: [
                                  const SizedBox(
                                    height: 12,
                                  ),
                                  const CircleAvatar(
                                    backgroundColor: Color(0xffE6E6E6),
                                    radius: 50,
                                    child: Icon(
                                      Icons.person,
                                      color: Color(0xffCCCCCC),
                                      size: 80,
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 12,
                                  ),
                                  Text(
                                    user.username!,
                                    style: kHeadingTextStyle,
                                  ),
                                  const SizedBox(
                                    height: 12,
                                  ),
                                  Text(
                                    user.email,
                                    style: kButtonLightTextStyle,
                                  ),
                                  const SizedBox(
                                    height: 12,
                                  ),
                                  Text(
                                    "Name: " + (user.name ?? "no name"),
                                    style: kButtonLightTextStyle,
                                  ),
                                  const SizedBox(
                                    height: 12,
                                  ),
                                  Text(
                                    "Surname: " + (user.surname ?? "no surname"),
                                    style: kButtonLightTextStyle,
                                  ),
                                  const SizedBox(
                                    height: 12,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 5,
                    ),
                    Divider(
                      color: AppColors.background,
                      thickness: 1,
                      height: 0,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15.0),
                      child: SizedBox(
                        height: 60,
                        child: TextButton(
                            style: ButtonStyle(
                                overlayColor: MaterialStateProperty.all(
                                    AppColors.background.withOpacity(0.2))),
                            onPressed: () {},
                            child: Stack(
                              children: const [
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Icon(
                                    Icons.local_shipping,
                                    color: AppColors.background,
                                    size: 30,
                                  ),
                                ),
                                Align(
                                    alignment: Alignment.center,
                                    child: Text(
                                      "My orders",
                                      style: TextStyle(fontSize: 20, color: Colors.black),
                                    )),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: Icon(
                                    Icons.keyboard_arrow_right,
                                    color: AppColors.background,
                                  ),
                                )
                              ],
                            )),
                      ),
                    ),
                    Divider(
                      color: AppColors.background,
                      thickness: 1,
                      height: 0,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15.0),
                      child: SizedBox(
                        height: 60,
                        child: TextButton(
                            style: ButtonStyle(
                                overlayColor: MaterialStateProperty.all(
                                    AppColors.background.withOpacity(0.2))),
                            onPressed: () {
                              Navigator.push(context, MaterialPageRoute(
                                  builder: (context) => const WishlistPage()));
                            },
                            child: Stack(
                              children: const [
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Icon(
                                    Icons.favorite,
                                    color: AppColors.background,
                                    size: 30,
                                  ),
                                ),
                                Align(
                                    alignment: Alignment.center,
                                    child: Text(
                                      "Wishlist",
                                      style: TextStyle(fontSize: 20, color: Colors.black),
                                    )),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: Icon(
                                    Icons.keyboard_arrow_right,
                                    color: AppColors.background,
                                  ),
                                )
                              ],
                            )),
                      ),
                    ),
                    Divider(
                      color: AppColors.background,
                      thickness: 1,
                      height: 0,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15.0),
                      child: SizedBox(
                        height: 60,
                        child: TextButton(
                            style: ButtonStyle(
                                overlayColor: MaterialStateProperty.all(
                                    AppColors.background.withOpacity(0.2))),
                            onPressed: () {},
                            child: Stack(
                              children: const [
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Icon(
                                    Icons.settings,
                                    color: AppColors.background,
                                    size: 30,
                                  ),
                                ),
                                Align(
                                    alignment: Alignment.center,
                                    child: Text(
                                      "Edit profile",
                                      style: TextStyle(fontSize: 20, color: Colors.black),
                                    )),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: Icon(
                                    Icons.keyboard_arrow_right,
                                    color: AppColors.background,
                                  ),
                                )
                              ],
                            )),
                      ),
                    ),
                    Divider(
                      color: AppColors.background,
                      thickness: 1,
                      height: 0,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15.0),
                      child: SizedBox(
                        height: 60,
                        child: TextButton(
                            style: ButtonStyle(
                                overlayColor: MaterialStateProperty.all(
                                    AppColors.background.withOpacity(0.2))),
                            onPressed: () {
                              UserService.removeUser();
                              Navigator.pushReplacementNamed(context, "/");
                            },
                            child: Stack(
                              children: const [
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Icon(
                                    Icons.exit_to_app,
                                    color: AppColors.background,
                                    size: 30,
                                  ),
                                ),
                                Align(
                                    alignment: Alignment.center,
                                    child: Text(
                                      "Log out",
                                      style: TextStyle(fontSize: 20, color: Colors.black),
                                    )),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: Icon(
                                    Icons.keyboard_arrow_right,
                                    color: AppColors.background,
                                  ),
                                )
                              ],
                            )),
                      ),
                    ),
                    Divider(
                      color: AppColors.background,
                      thickness: 1,
                      height: 0,
                    ),
                  ]),
                ),
              ]),
        ));
  }
}
