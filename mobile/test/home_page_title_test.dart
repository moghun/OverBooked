import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/pages/home_page.dart';

void main() {
  testWidgets("HomePage has title.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: HomePage()));
    final title = find.text("Overbooked");
    expect(title, findsOneWidget);
  });
}