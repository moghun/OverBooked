import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/pages/login_page.dart';

void main() {
  testWidgets("LoginPage has 2 text fields.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: LoginPage(),));
    expect(find.byType(TextFormField), findsNWidgets(2));
  });
}