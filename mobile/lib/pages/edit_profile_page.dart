import 'package:flutter/material.dart';
import 'package:mobile/components/main_app_bar.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';
import 'package:mobile/utils/colors.dart';

class EditProfilePage extends StatefulWidget {
  const EditProfilePage({Key? key}) : super(key: key);

  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  late TextEditingController nameController;
  late TextEditingController surnameController;
  late TextEditingController passwordController;
  late TextEditingController usernameController;

  @override
  void initState() {
    super.initState();
    nameController = TextEditingController();
    surnameController = TextEditingController();
    passwordController = TextEditingController();
    usernameController = TextEditingController();
  }

  @override
  void dispose() {
    nameController.dispose();
    surnameController.dispose();
    passwordController.dispose();
    usernameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainAppBar(title: "Edit profile"),
      body: Column(
        children: [
          SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(
                  height: 15,
                ),
                const Divider(
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
                            overlayColor:
                                MaterialStateProperty.all(AppColors.background.withOpacity(0.2))),
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: const Text("Your new name:"),
                              content: TextField(
                                autofocus: true,
                                decoration: const InputDecoration(hintText: "Enter your name"),
                                controller: nameController,
                              ),
                              actions: [
                                OutlinedButton(
                                    onPressed: () {
                                      if (nameController.text.isNotEmpty) {
                                        User user = UserService.getCurrentUser()!;
                                        user.name = nameController.text;
                                        nameController.clear();
                                        UserService.updateUser(user);
                                        UserService.updateDbUser(user);
                                      }
                                      Navigator.pop(context);
                                    },
                                    child: const Text("Submit")),
                              ],
                            ),
                          );
                        },
                        child: Stack(
                          children: const [
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Icon(
                                Icons.edit,
                                color: AppColors.background,
                                size: 30,
                              ),
                            ),
                            Align(
                                alignment: Alignment.center,
                                child: Text(
                                  "Change name",
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
                const Divider(
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
                            overlayColor:
                                MaterialStateProperty.all(AppColors.background.withOpacity(0.2))),
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: const Text("Your new surname:"),
                              content: TextField(
                                autofocus: true,
                                decoration: const InputDecoration(hintText: "Enter your surname"),
                                controller: surnameController,
                              ),
                              actions: [
                                OutlinedButton(
                                    onPressed: () {
                                      if (surnameController.text.isNotEmpty) {
                                        User user = UserService.getCurrentUser()!;
                                        user.surname = surnameController.text;
                                        surnameController.clear();
                                        UserService.updateUser(user);
                                        UserService.updateDbUser(user);
                                      }
                                      Navigator.pop(context);
                                    },
                                    child: const Text("Submit")),
                              ],
                            ),
                          );
                        },
                        child: Stack(
                          children: const [
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Icon(
                                Icons.edit,
                                color: AppColors.background,
                                size: 30,
                              ),
                            ),
                            Align(
                                alignment: Alignment.center,
                                child: Text(
                                  "Change surname",
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
                ),const Divider(
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
                            overlayColor:
                            MaterialStateProperty.all(AppColors.background.withOpacity(0.2))),
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: const Text("Your new username:"),
                              content: TextField(
                                autofocus: true,
                                decoration: const InputDecoration(hintText: "Enter your username"),
                                controller: usernameController,
                              ),
                              actions: [
                                OutlinedButton(
                                    onPressed: () {
                                      if (usernameController.text.isNotEmpty) {
                                        User user = UserService.getCurrentUser()!;
                                        user.username = usernameController.text;
                                        usernameController.clear();
                                        UserService.updateUser(user);
                                        UserService.updateDbUser(user);
                                      }
                                      Navigator.pop(context);
                                    },
                                    child: const Text("Submit")),
                              ],
                            ),
                          );
                        },
                        child: Stack(
                          children: const [
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Icon(
                                Icons.edit,
                                color: AppColors.background,
                                size: 30,
                              ),
                            ),
                            Align(
                                alignment: Alignment.center,
                                child: Text(
                                  "Change username",
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
                const Divider(
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
                            overlayColor:
                                MaterialStateProperty.all(AppColors.background.withOpacity(0.2))),
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: const Text("Your new password:"),
                              content: TextField(
                                autofocus: true,
                                obscureText: true,
                                decoration: const InputDecoration(hintText: "Enter your password"),
                                controller: passwordController,
                              ),
                              actions: [
                                OutlinedButton(
                                    onPressed: () {
                                      if (passwordController.text.isNotEmpty) {
                                        UserService.updatePassword(passwordController.text);
                                        passwordController.clear();
                                      }
                                      Navigator.pop(context);
                                    },
                                    child: const Text("Submit")),
                              ],
                            ),
                          );
                        },
                        child: Stack(
                          children: const [
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Icon(
                                Icons.edit,
                                color: AppColors.background,
                                size: 30,
                              ),
                            ),
                            Align(
                                alignment: Alignment.center,
                                child: Text(
                                  "Change password",
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
                const Divider(
                  color: AppColors.background,
                  thickness: 1,
                  height: 0,
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
