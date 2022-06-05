import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/pages/home_page.dart';

void main() {
  testWidgets("HomePage has on sale products.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: HomePage()));
    final subTitle2 = find.text("On Sale");
    expect(subTitle2, findsOneWidget);
  });
}