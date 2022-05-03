import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/auth.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/styles.dart';

class AccountDeletePP extends StatefulWidget {
  const AccountDeletePP({
    Key? key,
  }) : super(key: key);

  @override
  State<AccountDeletePP> createState() => _AccountDeletePPState();
}


class _AccountDeletePPState extends State<AccountDeletePP> {
  bool hasProvider = false;

  Future checkProvider () async{
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      hasProvider = (prefs.getBool('hasProvider') ?? false);
    });
  }
  String pass = "";

  @override
  void initState() {
    super.initState();
    checkProvider();
  }

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserObj?>(context, listen: false);
    return SafeArea(
      child: Material(
          child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(
              height: 20,
            ),
           !hasProvider ? const Text(
                "Please confirm your identity by providing your password") : Text("Are you sure?"),
            const SizedBox(height: 10),
            !hasProvider? TextField(
                obscureText: true,
                autocorrect: false,
                onChanged: (value) {
                  pass = value;
                },
                decoration: const InputDecoration(hintText: "Your Password")) : Text("Really?"),
            const SizedBox(height: 10),
            OutlinedButton(
              onPressed: () async {
                  if (await AuthService().reAuth(
                          pass,
                          hasProvider) ==
                      null) {
                    showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                              title: const Text("Account Deletion Error"),
                              content: const Text(
                                  "An error occurred. Make sure to write your credentials correctly"),
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
                    await AuthService().deleteAccount(user!.uid);
                    Navigator.of(context).pop();
                    Navigator.of(context).pop();
                  }

              },
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  'Delete Account',
                  style: kButtonDarkTextStyle,
                ),
              ),
              style: OutlinedButton.styleFrom(
                backgroundColor: Colors.red,
              ),
            ),
          ],
        ),
      )),
    );
  }
}
