import 'dart:convert';

import 'package:mobile/models/user.dart';
import 'package:http/http.dart' as http;

class UserService {
  static User? _currentUser;
  static List<dynamic> userCart = [];

  static User? getCurrentUser() {
    return _currentUser;
  }

  static updateUser(User user) {
    _currentUser = user;
  }

  static updateDbUser(User user) {
    final body =
        jsonEncode({"name": user.name, "surname": user.surname, "username": user.username});
    http.put(Uri.parse("http://10.0.2.2:5001/api/users/" + user.uid!),
        headers: {
          "Content-Type": "application/json",
          "token": "Bearer " + UserService.getCurrentUser()!.token!
        },
        body: body);
  }

  static updatePassword(String password) {
    final body = jsonEncode({"password": password});
    http.put(
      Uri.parse("http://10.0.2.2:5001/api/users/" + _currentUser!.uid!),
      body: body,
      headers: {
        "Content-Type": "application/json",
        "token": "Bearer " + UserService.getCurrentUser()!.token!
      },
    );
  }

  static removeUser() {
    _currentUser = null;
  }
}
