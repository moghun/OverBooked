import 'package:mobile/utils/colors.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/utils/styles.dart';
import 'package:flutter/material.dart';

class LogIn extends StatefulWidget {
  const LogIn({Key? key}) : super(key: key);

  @override
  _LogInState createState() => _LogInState();
}

class _LogInState extends State<LogIn> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Log In',
          style: kAppBarTitleTextStyle,
        ),
        backgroundColor: AppColors.background,
        centerTitle: true,
        elevation: 0.0,
      ),
      body: Padding(
        padding: Dimen.regularPadding,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        flex: 1,
                        child: TextFormField(
                          decoration: InputDecoration(
                            fillColor: AppColors.DarkTextColor,
                            filled: true,
                            hintText: "Email",
                            hintStyle: kButtonLightTextStyle,
                            border: const OutlineInputBorder(
                              borderSide: BorderSide(
                                color: AppColors.primary,
                              ),
                              borderRadius: BorderRadius.all(Radius.circular(30)),
                            ),
                          ),
                          keyboardType: TextInputType.emailAddress,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 25),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        flex: 1,
                        child: TextFormField(
                          decoration: InputDecoration(
                            fillColor: AppColors.DarkTextColor,
                            filled: true,
                            hintText: "Password",
                            hintStyle: kButtonLightTextStyle,
                            border: const OutlineInputBorder(
                              borderSide: BorderSide(
                                color: AppColors.primary,
                              ),
                              borderRadius: BorderRadius.all(Radius.circular(30)),
                            ),
                          ),
                          keyboardType: TextInputType.text,
                          obscureText: true,
                          autocorrect: false,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 25),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: OutlinedButton(
                          onPressed: () {},
                          child: Padding(
                            padding: Dimen.smallPadding,
                            child: Text(
                              'Log In',
                              style: kButtonDarkTextStyle,
                            ),
                          ),
                          style: OutlinedButton.styleFrom(
                            backgroundColor: AppColors.background,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: TextButton(
                          onPressed: () {
                            setState(() {
                              Navigator.pushNamed(context, '/signUp');
                            });
                          },
                          child: Padding(
                            padding: Dimen.smallPadding,
                            child: const Text(
                              "Don't have an account?",
                              style: TextStyle(color: Colors.blue, fontSize: 16),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}