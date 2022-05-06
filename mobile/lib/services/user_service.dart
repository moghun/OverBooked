import 'package:mobile/models/user.dart';

class UserService {
  static User? _currentUser;

  static User? getCurrentUser(){
    return _currentUser;
  }

  static updateUser(User user){
    _currentUser = user;
  }

  static removeUser(){
    _currentUser = null;
  }
}