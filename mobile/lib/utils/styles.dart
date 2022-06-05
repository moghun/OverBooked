import 'package:flutter/material.dart';
import 'package:mobile/utils/colors.dart';
import 'package:google_fonts/google_fonts.dart';

import 'colors.dart';

final kHeadingTextStyle = GoogleFonts.montserrat(
  color: AppColors.secondary,
  fontWeight: FontWeight.w900,
  fontSize: 30.0,
  letterSpacing: -0.7,
);

final kButtonLightTextStyle = GoogleFonts.montserrat(
  color: AppColors.lightTextColor,
  fontSize: 20.0,
  letterSpacing: -0.7,
);

final kButtonDarkTextStyle = GoogleFonts.montserrat(
  color: AppColors.darkTextColor,
  fontSize: 20.0,
  letterSpacing: -0.7,
);

final kAppBarTitleTextStyle = GoogleFonts.montserrat(
  color: AppColors.appBarText,
  fontSize: 24.0,
  fontWeight: FontWeight.w600,
  letterSpacing: -0.7,
);

final kSmallTitle = GoogleFonts.montserrat(
  color: AppColors.secondary,
  fontSize: 16.0,
  letterSpacing: -0.7,
);

final kSmallText = GoogleFonts.montserrat(
  fontStyle: FontStyle.italic,
  color: AppColors.lightTextColor,
  fontSize: 14.0,
  letterSpacing: -0.7,
);

final kImportantText = GoogleFonts.montserrat(
  fontWeight: FontWeight.bold,
  color: AppColors.notification,
  fontSize: 10.0,
  letterSpacing: -0.7,
);
