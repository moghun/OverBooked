import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/models/account_list_item.dart';
import 'package:mobile/ui/account_list_item_tile.dart';
import 'package:mobile/utils/color.dart';

class EditAccount extends StatefulWidget {
  const EditAccount({Key? key})
      : super(key: key);

  @override
  _EditAccountState createState() => _EditAccountState();
}

class _EditAccountState extends State<EditAccount> {
  static List<AccountListItem> _itemList = <AccountListItem>[];
  Future<void> start() async {
    final prefs = await SharedPreferences.getInstance();

    bool hasProvider = false;
    setState(() {
      hasProvider = (prefs.getBool('hasProvider') ?? false);
    });
    print(hasProvider);
    if (hasProvider) {
      _itemList = <AccountListItem>[
        AccountListItem(
            icon: const Icon(Icons.person),
            name: "My User Information",
            route: '/profile/change_name'),
        AccountListItem(
            icon: const Icon(Icons.insert_photo),
            name: "Change profile picture",
            route: '/profile/change_avatar'),
        AccountListItem(
            icon: const Icon(Icons.highlight_remove),
            name: "Delete Account",
            route: '/profile/account_delete'),
      ];
    } else {
      _itemList = <AccountListItem>[
        AccountListItem(
            icon: const Icon(Icons.person),
            name: "My User Information",
            route: '/profile/change_name'),
        AccountListItem(
            icon: const Icon(Icons.insert_photo),
            name: "Change profile picture",
            route: '/profile/change_avatar'),
        AccountListItem(
            icon: const Icon(Icons.lock),
            name: "Change password",
            route: '/profile/change_password'),
        AccountListItem(
            icon: const Icon(Icons.highlight_remove),
            name: "Delete Account",
            route: '/profile/account_delete'),
      ];
    }
  }

  @override
  void initState() {
    super.initState();
    start();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        centerTitle: true,
        title: const Text("Edit Account"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: List.generate(
              _itemList.length,
              (index) => Row(children: [
                    Expanded(
                        child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 1),
                      child: AccountListItemTile(_itemList[index], context),
                    ))
                  ])),
        ),
      ),
    );
  }
}
