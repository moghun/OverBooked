import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';

void main() {
  test("User Service should update user.", () {
    UserService.updateUser(User(email: "email@email.com"));
    expect(UserService.getCurrentUser()!.email, "email@email.com");
  });
}