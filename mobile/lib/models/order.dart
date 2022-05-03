
class Order {
  String orderID;
  String url;
  String productName;
  String pid;
  num price;
  num amount;
  Timestamp purchaseDate;
  String comment;
  bool isCommented;
  bool isRated;
  num rating;
  bool commentApproved;

  Order(
      {required this.orderID,
      required this.url,
      required this.productName,
      required this.pid,
      required this.price,
      required this.amount,
      required this.purchaseDate,
      required this.comment,
      required this.isCommented,
      required this.isRated,
      required this.rating,
      required this.commentApproved});
}
