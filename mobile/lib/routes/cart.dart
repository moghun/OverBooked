import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';
import 'package:mobile/utils/dimensions.dart';
import 'package:mobile/views/product_preview.dart';

class Cart extends StatefulWidget {
  const Cart({Key? key}) : super(key: key);

  @override
  State<Cart> createState() => _CartState();
}

class _CartState extends State<Cart> {

  final User? user = UserService.getCurrentUser();

  @override
  Widget build(BuildContext context) {
    if(user == null){
      return const Center(child: Text("You need to login to see your cart"),);
    }else{


    return Center(
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Padding(
          padding: Dimen.regularPadding,/*
          child: Row(
            children: List.generate(
                user!.cart!.length,
                    (index) => Row(children: [
                  ProductPreview(
                    product: user!.cart![index],
                  ),
                  const SizedBox(width: 8)
                ])),
          ),*/
        ),
      ),
    );}
  }
}