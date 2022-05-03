import 'package:flutter/material.dart';
import 'package:mobile/models/account_list_item.dart';

Widget AccountListItemTile(AccountListItem item, BuildContext context) {
  return InkWell(
    onTap: () {
      Navigator.pushNamed(context, item.route);
    },
    child: Column(
      children: [
        const SizedBox(height: 16),
        (Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                item.icon,
                SizedBox(
                  width: 18,
                ),
                Text(
                  item.name,
                  style: TextStyle(
                      fontWeight: FontWeight.w400, fontSize: 19.0, color: Colors.black.withOpacity(0.7)),
                ),
              ],
            ),
            Icon(Icons.chevron_right, size: 32,color: Colors.black.withOpacity(0.7))

          ],
        )),
        SizedBox(height: 16),
        Divider(height: 1, thickness: 1,)
      ],
    ),
  );
}
