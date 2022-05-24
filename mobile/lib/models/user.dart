class User {
  String? uid;
  String email;
  String? username;
  String? name;
  String? surname;
  List<dynamic>? cart;
  String? token;
  List<dynamic>? wishlist;

  User({
    required this.email,
    this.username,
    this.name,
    this.surname,
    this.cart,
    this.token,
    this.uid,
    this.wishlist,
});
}