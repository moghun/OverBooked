import 'package:flutter/material.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/utils/colors.dart';

class OrderPreview extends StatefulWidget {
  const OrderPreview({Key? key, required this.order}) : super(key: key);
  final Order order;

  @override
  _OrderPreviewState createState() => _OrderPreviewState();
}

class _OrderPreviewState extends State<OrderPreview> {

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 200,
      color: AppColors.background,
      child: Row(
        children: [
          Text("deneme")
        ],
      ),
    );
  }
}
