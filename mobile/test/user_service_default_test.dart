import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/services/user_service.dart';

void main() {
  test("User Service has a default null user.", () {
    expect(UserService.getCurrentUser(), null);
  });
}