// To parse this JSON data, do
//
//     final previewBooks = previewBooksFromJson(jsonString);

import 'package:meta/meta.dart';
import 'dart:convert';

List<PreviewBooks> previewBooksFromJson(String str) => List<PreviewBooks>.from(json.decode(str).map((x) => PreviewBooks.fromJson(x)));

String previewBooksToJson(List<PreviewBooks> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class PreviewBooks {

  num? id;
  String? img;
  String? title;
  String? author;
  num raiting;
  String? publisher;
  num? price;
  num? amountSold;
  String? releaseDate;
  String? discount;

  PreviewBooks({
    @required this.id,
    @required this.img,
    @required this.title,
    @required this.author,
    @required this.raiting = 0,
    @required this.publisher,
    @required this.price,
    @required this.amountSold,
    @required this.releaseDate,
    @required this.discount,
  });

  factory PreviewBooks.fromJson(Map<String, dynamic> json) => PreviewBooks(
    id: json["id"],
    img: json["img"],
    title: json["title"],
    author: json["author"],
    raiting: json["raiting"],
    publisher: json["publisher"],
    price: json["price"],
    amountSold: json["amount_sold"],
    releaseDate: json["release_date"],
    discount: json["discount"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "img": img,
    "title": title,
    "author": author,
    "raiting": raiting,
    "publisher": publisher,
    "price": price,
    "amount_sold": amountSold,
    "release_date": releaseDate,
    "discount": discount,
  };
}
