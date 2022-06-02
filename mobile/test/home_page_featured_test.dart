import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/pages/home_page.dart';

void main() {
  testWidgets("HomePage has featured products.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: HomePage()));
    final subTitle1 = find.text("Featured Products");
    expect(subTitle1, findsOneWidget);
  });
}