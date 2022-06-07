import 'package:flutter/material.dart';
import '../utils/colors.dart';
import '../utils/styles.dart';

class MainAppBar extends StatelessWidget with PreferredSizeWidget {
  MainAppBar({Key? key, this.title = "Overbooked"}) : super(key: key);
  final String title;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      actions: [
        IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.notifications,
              color: AppColors.appBarText,
              size: 27,
            ))
      ],
      title: Text(
        title,
      ),
      backgroundColor: AppColors.background,
      centerTitle: true,
      elevation: 0.0,
      titleTextStyle: kAppBarTitleTextStyle,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(56);
}
