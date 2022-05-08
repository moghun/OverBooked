class User {
  String email;
  String? username;
  String? name;
  String? surname;
  List<dynamic>? cart;

  User({
    required this.email,
    this.username,
    this.name,
    this.surname,
    this.cart,
});
}