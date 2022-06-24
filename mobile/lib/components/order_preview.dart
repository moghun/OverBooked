import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile/models/order.dart';
import 'package:mobile/models/product.dart';
import 'package:mobile/services/order_service.dart';
import 'package:mobile/utils/colors.dart';

class OrderPreview extends StatefulWidget {
  const OrderPreview({Key? key, required this.order}) : super(key: key);
  final Order order;

  @override
  _OrderPreviewState createState() => _OrderPreviewState();
}

class _OrderPreviewState extends State<OrderPreview> {
  final OrderService _orderService = OrderService();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 350,
      height: 200,
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.1),
        border: Border.all(color: AppColors.background),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Expanded(
            flex: 2,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  widget.order.cost.toString() + " \$",
                  style: const TextStyle(fontSize: 20),
                ),
                const SizedBox(
                  height: 8,
                ),
                Text(
                  widget.order.status!,
                  style: TextStyle(
                      color: widget.order.status! != "Cancelled" ? Colors.green : Colors.red),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(
                  height: 24,
                ),
                Text(widget.order.date!.substring(0, widget.order.date!.indexOf("T"))),
                const SizedBox(
                  height: 8,
                ),
                Text(widget.order.date!.substring(
                    widget.order.date!.indexOf("T") + 1, widget.order.date!.indexOf("."))),
                const SizedBox(
                  height: 8,
                ),
                Visibility(
                  child: OutlinedButton(
                    onPressed: () {
                      _orderService.cancelOrder(widget.order.id);
                      Fluttertoast.showToast(
                          msg: "Order cancelled!",
                          gravity: ToastGravity.BOTTOM,
                          backgroundColor: Colors.green);
                    },
                    style: OutlinedButton.styleFrom(backgroundColor: Colors.red),
                    child: const Text(
                      "Cancel",
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  visible: widget.order.status == "Processing",
                ),
                Visibility(
                  child: OutlinedButton(
                    onPressed: () {
                      _orderService.returnOrder(widget.order.id);
                      Fluttertoast.showToast(
                          msg: "Return request is sent!",
                          gravity: ToastGravity.BOTTOM,
                          backgroundColor: Colors.green);
                    },
                    style: OutlinedButton.styleFrom(backgroundColor: Colors.red),
                    child: const Text(
                      "Return",
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  visible: widget.order.status == "Delivered",
                )
              ],
            ),
          ),
          const VerticalDivider(),
          Expanded(
            flex: 3,
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  FutureBuilder<List<Product>>(
                    future: _orderService.getProductsInOrder(widget.order),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: const [
                            SizedBox(
                              child: CircularProgressIndicator(
                                strokeWidth: 7,
                              ),
                              width: 20,
                              height: 20,
                            ),
                          ],
                        );
                      } else if (snapshot.connectionState == ConnectionState.done) {
                        if (snapshot.hasError) {
                          return const Text('Error');
                        } else if (snapshot.hasData) {
                          return Column(
                            children: List.generate(
                                snapshot.data!.length,
                                (index) => Text(
                                      snapshot.data![index].name,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    )),
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
        ],
      ),
    );
  }
}
