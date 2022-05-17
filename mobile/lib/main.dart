import 'package:mobile/pages/login_page.dart';
import 'package:mobile/home.dart';
import 'package:flutter/material.dart';
import 'package:mobile/pages/sign_up_page.dart';

void main() {
  runApp(MaterialApp(
    routes: {
      '/': (context) => const Home(),
      '/logIn': (context) => const LoginPage(),
      '/signUp': (context) => const SignUpPage(),
    },
  ));
}
