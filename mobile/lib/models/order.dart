class Order {
  String id;
  String? buyerEmail;
  String? status;
  num? cost;
  String? date;
  List<dynamic>? boughtProducts;
  List<dynamic>? amounts;

  Order({
    required this.id,
    this.cost,
    this.boughtProducts,
    this.amounts,
    this.buyerEmail,
    this.date,
    this.status,
  });
}
