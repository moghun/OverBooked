import 'dart:convert';

import 'package:http/http.dart' as http;

class AuthService {
  final apiBaseURL = "http://10.0.2.2:5001/api/auth";

  Future<http.Response> registerUser(String username, String email, String password) {
    var body = jsonEncode({"username": username, "email": email, "password": password});
    return http.post(Uri.parse(apiBaseURL + "/register"),
        headers: {"Content-Type": "application/json"}, body: body);
  }

  Future<http.Response> loginUser(String email, String password) async {
    var body = jsonEncode({"email": email, "password": password});
    return http.post(Uri.parse(apiBaseURL + "/login"),
        headers: {"Content-Type": "application/json"}, body: body);
  }
}
