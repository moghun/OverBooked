import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/services/user_service.dart';

void main() {
  test("User Service should remove user.", () {
    UserService.updateUser(User(email: "email@email.com"));
    UserService.removeUser();
    expect(UserService.getCurrentUser(), null);
  });
}