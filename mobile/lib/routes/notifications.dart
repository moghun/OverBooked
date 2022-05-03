import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/models/notification_item.dart';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/service.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/dimension.dart';
import 'package:mobile/ui/notification_tile.dart';

class Notifications extends StatefulWidget {
  const Notifications(
      {Key? key})
      : super(key: key);
  @override
  _NotificationsState createState() => _NotificationsState();
}

Service usersService = Service();
List<NotificationItem> allNotificationsFuture = [];
List<NotificationItem> allNotifications = [];

Future getAllNotifications(userID) async {
  allNotificationsFuture = await usersService.getNotifications(userID);
  return allNotificationsFuture;
}

class _NotificationsState extends State<Notifications> {
  Service usersService = Service();

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserObj?>(context);
    if (user != null) {
      getAllNotifications(user.uid).then((element) {
        setState(() {
          allNotifications = element;
        });
      });

      return SafeArea(
        child: Scaffold(
          appBar: AppBar(
            centerTitle: true,
            title: const Text("Notifications"),
            backgroundColor: AppColors.primary,
            elevation: 2.0,
          ),
          body: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0),
            child: Column(
              children: List.generate(
                  allNotifications.length,
                  (index) => Row(children: [
                        Expanded(
                            child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 1),
                          child: NotificationTile(
                              allNotifications[index], context),
                        ))
                      ])),
            ),
          ),
        ),
      );
    } else {
      return const Center(child: Text("Refresh the page!"));
    }
  }
}
