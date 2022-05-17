import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/pages/user_orders_page.dart';
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
                    CircleAvatar(
                      backgroundColor: Color(0xffE6E6E6),
                      radius: 30,
                      child: Icon(
                        Icons.person,
                        color: Color(0xffCCCCCC),
                      ),
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
                      user.name ?? "no name",
                      style: kButtonLightTextStyle,
                    ),
                    const SizedBox(
                      height: 12,
                    ),
                    Text(
                      user.surname ?? "no surname",
                      style: kButtonLightTextStyle,
                    ),
                    const SizedBox(
                      height: 12,
                    ),
                    OutlinedButton(
                        onPressed: () {

                          Navigator.push(context, MaterialPageRoute(
                              builder: (context) => UserOrdersPage(
                              )));
                        },
                        child: Text("My Orders")),
                    const SizedBox(
                      height: 12,
                    ),
                    OutlinedButton(
                        onPressed: () {
                          UserService.removeUser();
                          Navigator.pushReplacementNamed(context, "/");
                        },
                        child: Text("Log Out")),
                    const SizedBox(
                      height: 12,
                    ),
                  ]),
                ),
              ]),
        ));
  }
}
