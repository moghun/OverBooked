class User {
  String? uid;
  String email;
  String? username;
  String? name;
  String? surname;
  List<dynamic>? cart;
  String? token;

  User({
    required this.email,
    this.username,
    this.name,
    this.surname,
    this.cart,
    this.token,
    this.uid,
});
}