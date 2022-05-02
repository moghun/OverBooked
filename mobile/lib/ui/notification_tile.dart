import 'package:flutter/material.dart';
import 'package:mobile/models/notification_item.dart';

Widget NotificationTile(NotificationItem item, BuildContext context) {
  return Column(
    children: [
      const SizedBox(height: 16),
      (Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              SizedBox(
                width: 18,
              ),
              Text(
                item.message,
                style: TextStyle(
                    fontWeight: FontWeight.w400,
                    fontSize: 19.0,
                    color: Colors.black.withOpacity(0.7)),
              ),
            ],
          ),
        ],
      )),
      SizedBox(height: 16),
      Divider(
        height: 1,
        thickness: 1,
      )
    ],
  );
}
