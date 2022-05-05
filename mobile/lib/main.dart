import 'package:mobile/pages/log_in.dart';
import 'package:mobile/home.dart';
import 'package:flutter/material.dart';
import 'package:mobile/pages/sign_up.dart';


void main() {
  runApp(MaterialApp(
    routes: {
      '/': (context) => const Home(),
      '/logIn': (context) => const LogIn(),
      '/signUp': (context) => const SignUp()
    },
  ));
}
