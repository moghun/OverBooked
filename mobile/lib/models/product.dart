import 'package:freezed_annotation/freezed_annotation.dart';

part 'product.freezed.dart';
part 'product.g.dart';

@freezed
class Product with _$Product {
  factory Product({
    required String pid,
    required String productName,
    required num rating,
    required String seller,
    required num price,
    required bool onSale,
    required String description,
    required String imgURL,
    required String category,
    required String tag,
    required num stocks,
    num? oldPrice,
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
  //Map<String, dynamic> toJson() => _$ProductToJson(this);
}
