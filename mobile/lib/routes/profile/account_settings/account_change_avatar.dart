import 'dart:io';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/auth.dart';
import 'package:path/path.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';

class AccountSettingsPP extends StatefulWidget {
  const AccountSettingsPP({Key? key}) : super(key: key);

  @override
  _AccountSettingsPPState createState() => _AccountSettingsPPState();
}

class _AccountSettingsPPState extends State<AccountSettingsPP> {
  final AuthService _auth = AuthService();
  bool _loading = false;

  @override
  Widget build(BuildContext context) {
    UserObj? currentUser = Provider.of<UserObj?>(context);
    String pp = currentUser?.photoURL ?? "https://i.ibb.co/4Vw6XL0/logo-JPGblue-removebg.png";
    return Material(
      child: InkWell(
        customBorder: const CircleBorder(),
        onTap: () async {
          setState(() {
            _loading = true;
          });
          final ImagePicker _picker = ImagePicker();
          final XFile? image =
          await _picker.pickImage(source: ImageSource.gallery);
          File file = File(image!.path);
          if (await _auth.updateAvatar(file) == null) {
            setState(() {
              _loading = false;
            });
            showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                      title: const Text("Profile Photo Error"),
                      content:
                      const Text("An error occurred. Please notify admins"),
                      actions: [
                        TextButton(
                          child: const Text("Close"),
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                        )
                      ]);
                });
          } else {
            setState(() {
              _loading = false;
            });
            showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                      title: const Text("Profile Photo Change Successful"),
                      content:
                      const Text("Your profile photo has been updated"),
                      actions: [
                        TextButton(
                          child: const Text("Okay"),
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                        )
                      ]);
                });
          }
        },
        child: Stack(
          alignment: AlignmentDirectional.center,
          children: [
            CircleAvatar(
              radius: 50,
              backgroundImage:
              NetworkImage(pp),
            ),
            Icon(
              Icons.edit,
              size: 50,
              color: Colors.black.withOpacity(.3),
            ),
            _loading ? const CircularProgressIndicator() : const SizedBox(),
          ],
        ),
      ),
    );
  }
}
