import 'package:flutter/material.dart';

class Dimen {
  static const double parentMargin = 16.0;
  static const double regularMargin = 8.0;
  static const double largeMargin = 20.0;
  static const double smallMargin = 10.0;
  static const double borderRadius = 8.0;
  static const double borderRadiusRounded = 20.0;
  static const double textFieldHeight = 32.0;
  static const double productWidth = 150;

  static get regularPadding => const EdgeInsets.all(parentMargin);
  static get smallPadding => const EdgeInsets.all(smallMargin);
  static get productPadding => const EdgeInsets.all(textFieldHeight);
}