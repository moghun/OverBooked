import 'package:mobile/utils/colors.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/utils/styles.dart';
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';

class SignUp extends StatefulWidget {
  const SignUp({Key? key}) : super(key: key);

  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final _formKey = GlobalKey<FormState>();
  String username = "";
  String email = "";
  String emailConfirmation = "";
  String pass = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Sign Up',
          style: kAppBarTitleTextStyle,
        ),
        backgroundColor: AppColors.background,
        centerTitle: true,
        elevation: 0.0,
      ),
      body: Padding(
        padding: Dimen.regularPadding,
        child: SingleChildScrollView(
          child: Column(
            children: [
              Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          flex: 1,
                          child: TextFormField(
                              decoration: InputDecoration(
                                fillColor: AppColors.darkTextColor,
                                filled: true,
                                hintText: "Username",
                                hintStyle: kButtonLightTextStyle,
                                border: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                    color: AppColors.primary,
                                  ),
                                  borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                                ),
                              ),
                              validator: (value) {
                                if (value == null) {
                                  return "Username can not be empty";
                                } else {
                                  String trimmedValue = value.trim();
                                  if (trimmedValue.isEmpty) {
                                    return "Username can not be empty";
                                  }
                                }
                                return null;
                              },
                              onSaved: (value) {
                                if (value != null) {
                                  username = value;
                                }
                              }),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      children: [
                        Expanded(
                          flex: 1,
                          child: TextFormField(
                              decoration: InputDecoration(
                                fillColor: AppColors.darkTextColor,
                                filled: true,
                                hintText: "Email",
                                hintStyle: kButtonLightTextStyle,
                                border: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                    color: AppColors.primary,
                                  ),
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(30)),
                                ),
                              ),
                              keyboardType: TextInputType.emailAddress,
                              validator: (value) {
                                if (value == null) {
                                  return "Email can not be empty";
                                } else {
                                  String trimmedValue = value.trim();
                                  if (trimmedValue.isEmpty) {
                                    return "Email can not be empty";
                                  }
                                  if (!EmailValidator.validate(trimmedValue)) {
                                    return "Email is not valid";
                                  }
                                }
                                return null;
                              },
                              onSaved: (value) {
                                if (value != null) {
                                  email = value;
                                }
                              }),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      children: [
                        Expanded(
                          flex: 1,
                          child: TextFormField(
                              decoration: InputDecoration(
                                fillColor: AppColors.darkTextColor,
                                filled: true,
                                hintText: "Confirm your email",
                                hintStyle: kButtonLightTextStyle,
                                border: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                    color: AppColors.primary,
                                  ),
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(30)),
                                ),
                              ),
                              keyboardType: TextInputType.emailAddress,
                              validator: (value) {
                                if (value == null) {
                                  return "Email can not be empty";
                                }
                                String trimmedValue = value.trim();
                                if(trimmedValue != email){
                                  return "Emails do not match";
                                }
                                return null;
                              },
                              onSaved: (value) {
                                if (value != null) {
                                  emailConfirmation = value;
                                }
                              }),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          flex: 1,
                          child: TextFormField(
                            decoration: InputDecoration(
                              fillColor: AppColors.darkTextColor,
                              filled: true,
                              hintText: "Password",
                              hintStyle: kButtonLightTextStyle,
                              border: const OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: AppColors.primary,
                                ),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(30)),
                              ),
                            ),
                            keyboardType: TextInputType.text,
                            obscureText: true,
                            autocorrect: false,
                            validator: (value) {
                              if (value == null) {
                                return "Password can not be empty";
                              } else {
                                String trimmedValue = value.trim();
                                if (trimmedValue.isEmpty) {
                                  return "Password can not be empty";
                                }
                                if (trimmedValue.toLowerCase() == trimmedValue) {
                                  return "there must be upper case letter in the password ";
                                }
                                if (trimmedValue.toUpperCase() == trimmedValue) {
                                  return "there must be lower case letter in the password ";
                                }
                              }
                              return null;
                            },
                            onSaved: (value) {
                              if (value != null) {
                                pass = value;
                              }
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Expanded(
                          flex: 1,
                          child: OutlinedButton(
                            onPressed: () {
                              if (_formKey.currentState!.validate()) {
                                _formKey.currentState!.save();
                              }
                            },
                            child: Padding(
                              padding: Dimen.smallPadding,
                              child: Text(
                                'Sign Up',
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
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Center(
                            child: TextButton(
                                onPressed: () {
                                  Navigator.pop(context);
                                },
                                child: const Center(
                                    child: Text("Already have an account?",
                                        style: TextStyle(
                                            color: Colors.blue, fontSize: 16)))))
                      ],
                    ),
                    const SizedBox(
                      height: 14,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
