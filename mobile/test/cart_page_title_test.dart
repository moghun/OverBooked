import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/pages/cart_page.dart';

void main() {
  testWidgets("CartPage has title.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: CartPage()));
    final title = find.text("Your Cart");
    expect(title, findsOneWidget);
  });
}