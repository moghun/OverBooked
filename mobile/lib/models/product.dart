class Product {
  String id;
  String name;
  num cost;
  num amount;
  String? publisher;
  String? img;
  String? author;
  num? warranty;
  String? category;
  String? subCategory;
  num? rating;
  bool? sale;
  num? costAfterSale;
  List<String>? comments;


  Product({
  required this.id,
  required this.name,
  required this.cost,
  required this.amount,
    this.publisher,
    this.img,
    this.author,
    this.warranty,
    this.category,
    this.subCategory,
    this.rating,
    this.sale,
    this.costAfterSale,
    this.comments,
});
  factory Product.fromJson(Map<String, dynamic> json) => Product(
    id: json["_id"],
    cost: json["cost"],
    name: json["name"],
    amount: json["amount_sold"],
  );
}