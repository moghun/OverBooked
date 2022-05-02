// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'product.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Product _$$_ProductFromJson(Map<String, dynamic> json) => _$_Product(
      pid: json['pid'] as String,
      productName: json['productName'] as String,
      rating: json['rating'] as num,
      seller: json['seller'] as String,
      price: json['price'] as num,
      onSale: json['onSale'] as bool,
      description: json['description'] as String,
      imgURL: json['imgURL'] as String,
      category: json['category'] as String,
      tag: json['tag'] as String,
      stocks: json['stocks'] as num,
      oldPrice: json['oldPrice'] as num?,
    );

Map<String, dynamic> _$$_ProductToJson(_$_Product instance) =>
    <String, dynamic>{
      'pid': instance.pid,
      'productName': instance.productName,
      'rating': instance.rating,
      'seller': instance.seller,
      'price': instance.price,
      'onSale': instance.onSale,
      'description': instance.description,
      'imgURL': instance.imgURL,
      'category': instance.category,
      'tag': instance.tag,
      'stocks': instance.stocks,
      'oldPrice': instance.oldPrice,
    };
