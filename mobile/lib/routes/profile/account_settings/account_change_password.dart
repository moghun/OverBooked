import 'package:flutter/material.dart';
import 'package:mobile/services/auth.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/styles.dart';

/*class ChangePassword extends StatefulWidget {
  const ChangePassword({Key? key, this.analytics, this.observer}) : super(key: key);

  final FirebaseAnalytics? analytics;
  final FirebaseAnalyticsObserver? observer;

  @override
  _ChangePasswordState createState() => _ChangePasswordState();
}

class _ChangePasswordState extends State<ChangePassword> {
  final _formKey = GlobalKey<FormState>();

  AuthService authService = AuthService();

  String initialPass = "";
  String finalPass = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.primary,
        title: const Text("Change Password"),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                  children: [
                    const SizedBox(
                      height: 16,
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          flex: 1,
                          child: TextFormField(
                            decoration: const InputDecoration(
                              hintText: 'New password',
                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: AppColors.primary,
                                ),
                                borderRadius:
                                BorderRadius.all(Radius.circular(10)),
                              ),
                              prefixIcon: Icon(Icons.lock),
                            ),
                            keyboardType: TextInputType.text,
                            obscureText: true,
                            enableSuggestions: false,
                            autocorrect: false,
                            validator: (value) {
                              initialPass = value!.trim();
                              if (value == null) {
                                return 'Password field cannot be empty';
                              } else {
                                String trimmedValue = value.trim();
                                if (trimmedValue.isEmpty) {
                                  return 'Password field cannot be empty';
                                }
                                if (trimmedValue.length < 8) {
                                  return 'Password must be at least 8 characters long';
                                }
                              }
                              return null;
                            },
                            onSaved: (value) {
                              if (value != null) {
                                initialPass = value;
                              }
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 16,
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          flex: 1,
                          child: TextFormField(
                            decoration: const InputDecoration(
                              hintText: 'Confirm new password',
                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: AppColors.primary,
                                ),
                                borderRadius:
                                BorderRadius.all(Radius.circular(10)),
                              ),
                              prefixIcon: Icon(Icons.lock),
                            ),
                            keyboardType: TextInputType.text,
                            obscureText: true,
                            enableSuggestions: false,
                            autocorrect: false,
                            validator: (value) {
                              if (value == null) {
                                return 'Password field cannot be empty';
                              } else {
                                String trimmedValue = value.trim();
                                if (trimmedValue.isEmpty) {
                                  return 'Password field cannot be empty';
                                }
                                if (trimmedValue.length < 8) {
                                  return 'Password must be at least 8 characters long';
                                }
                                if (value != initialPass) {
                                  return 'Passwords are not matching';
                                }
                              }
                              return null;
                            },
                            onSaved: (value) {
                              if (value != null) {
                                finalPass = value;
                              }
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 16,
                    ),
                    Row(
                      children: <Widget>[
                        Expanded(
                          flex: 1,
                          child: OutlinedButton(
                            onPressed: () {
                              if (_formKey.currentState!.validate()) {
                                _formKey.currentState!.save();
                                authService.changePassword(initialPass);
                              }
                            },
                            child: Padding(
                              padding:
                              const EdgeInsets.symmetric(vertical: 12.0),
                              child: Text(
                                'Change password',
                                style: kButtonDarkTextStyle,
                              ),
                            ),
                            style: OutlinedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                            ),
                          ),
                        )
                      ],
                    )
                  ],
                ),
            ),
          ),
        ],
      ),
    );
  }
}*/

class AccountSettingsPassword extends StatefulWidget {
  const AccountSettingsPassword({Key? key}) : super(key: key);

  @override
  _AccountSettingsPasswordState createState() =>
      _AccountSettingsPasswordState();
}

class _AccountSettingsPasswordState extends State<AccountSettingsPassword> {
  final _formKey2 = GlobalKey<FormState>();
  final AuthService _auth = AuthService();
  String oldPass = "";
  String newPass = "";

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Material( 
        child: Form(
            key: _formKey2,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                TextFormField(
                  decoration: InputDecoration(
                   // fillColor: AppColors.DarkTextColor,
                    filled: true,
                    hintText: "Old Password",
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
                  validator: (value) {
                    if (value == null) {
                      return "Please enter your old password";
                    } else {
                      String trimmedValue = value.trim();
                      if (trimmedValue.isEmpty) {
                        return "Please enter your old password";
                      }
                    }
                    return null;
                  },
                  onSaved: (value) {
                    if (value != null) {
                      oldPass = value;
                    }
                  },
                ),
                TextFormField(
                  decoration: InputDecoration(
                    //fillColor: AppColors.DarkTextColor,
                    filled: true,
                    hintText: "New Password",
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
                  validator: (value) {
                    if (value == null) {
                      return "password can not be empty";
                    } else {
                      String trimmedValue = value.trim();
                      if (trimmedValue.isEmpty) {
                        return "password can not be empty";
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
                      newPass = value;
                    }
                  },
                ),
                OutlinedButton(
                  onPressed: () async {
                    if (_formKey2.currentState!.validate()) {
                      _formKey2.currentState!.save();
                      if (await _auth.updatePassword(oldPass, newPass) == null) {
                        showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog(
                                  title: const Text("Password Change Error"),
                                  content: const Text(
                                      "An error occurred. Please make sure to enter your old password correctly"),
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
                        FocusScope.of(context).unfocus();
                        showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog(
                                  title: const Text("Password Change Successful"),
                                  content: const Text(
                                      "You can now use your new password to sign in!"),
                                  actions: [
                                    TextButton(
                                      child: const Text("Okay"),
                                      onPressed: () {
                                        Navigator.of(context).pop();
                                        Navigator.of(context).pop();
                                      },
                                    )
                                  ]);
                            });
                      }
                    }
                  },
                  child: Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Text(
                      'Update Password',
                      style: kButtonDarkTextStyle,
                    ),
                  ),
                  style: OutlinedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                  ),
                ),
              ],
            )),
      ),
    );
  }
}

