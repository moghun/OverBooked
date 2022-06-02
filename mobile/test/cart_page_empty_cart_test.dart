import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/pages/cart_page.dart';

void main() {
  testWidgets("CartPage has empty cart text.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: CartPage()));
    await tester.pumpAndSettle();
    expect(find.text("Your cart is empty!"), findsOneWidget);
  });
}