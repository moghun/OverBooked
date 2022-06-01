import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/pages/sign_up_page.dart';

void main() {
  testWidgets("SignUpPage has a button.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: SignUpPage(),));
    expect(find.byType(OutlinedButton), findsOneWidget);
  });
}