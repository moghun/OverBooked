import 'package:http/http.dart' as http;

class AuthService {
  final apiBaseURL = "http://10.0.2.2:5001/api/auth";

  Future<http.Response> registerUser(String email, String password) {
    return http.post(Uri.parse(apiBaseURL + "/register"), body: {});
  }

  Future<http.Response> loginUser(String email, String password) async {
    return http.post(Uri.parse(apiBaseURL + "/login"),
        body: {"email": email, "password": password});
  }
}
