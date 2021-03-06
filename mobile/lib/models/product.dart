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
  List<dynamic>? rating;
  bool? sale;
  num? costBeforeSale;
  List<dynamic>? comments;

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
    this.costBeforeSale,
    this.comments,
  });

  factory Product.fromJson(dynamic json) => Product(
        id: json["_id"],
        name: json["name"],
        cost: json["cost"],
        amount: json["amount"],
        publisher: json["publisher"],
        img: json["img"],
        author: json["author"],
        warranty: json["warranty"],
        category: json["category"],
        //subCategory: json["subcategories"],
        rating: json["rating"],
        sale: json["sale"],
        costBeforeSale: json["before_sale_price"],
        comments: json["comments"],
      );
}
