import 'package:flutter/material.dart';
import 'package:mobile/components/order_preview.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/services/order_service.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/components/main_app_bar.dart';

class UserOrdersPage extends StatefulWidget {
  const UserOrdersPage({Key? key}) : super(key: key);

  @override
  _UserOrdersPageState createState() => _UserOrdersPageState();
}

class _UserOrdersPageState extends State<UserOrdersPage> {
  final OrderService _orderService = OrderService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainAppBar(title: "My orders"),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              FutureBuilder<List<Order>>(
                future: _orderService.getUserOrders(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const CircularProgressIndicator();
                  } else if (snapshot.connectionState == ConnectionState.done) {
                    if (snapshot.hasError) {
                      return Text(
                        snapshot.error.toString() + snapshot.stackTrace.toString(),
                        style: kButtonLightTextStyle,
                      );
                    } else if (snapshot.hasData) {
                      return Padding(
                        padding: Dimen.regularPadding,
                        child: Column(
                          children: snapshot.data!.isNotEmpty
                              ? List.generate(snapshot.data!.length,
                                  (index) => Column(
                                    children: [
                                      OrderPreview(order: snapshot.data![index]),
                                      SizedBox(height: 10,)
                                    ],
                                  ))
                              : [
                                const SizedBox(height: 100,),
                                  Center(
                                    child: Icon(
                                      Icons.local_shipping,
                                      size: 120,
                                      color: Colors.black.withOpacity(0.2),
                                    ),
                                  ),
                                  const Center(
                                      child: Text(
                                    "You don't have any orders yet.",
                                    style: TextStyle(fontSize: 20),
                                  )),
                                ],
                        ),
                      );
                    } else {
                      return const Text('Empty data');
                    }
                  } else {
                    return Text('State: ${snapshot.connectionState}');
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
