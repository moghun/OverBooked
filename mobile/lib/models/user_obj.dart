import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_obj.freezed.dart';
part 'user_obj.g.dart';

@freezed
class UserObj with _$UserObj {
  factory UserObj({
    required String uid,
    String? name,
    String? email,
    String? photoURL,
    String? number,
}) = _UserObj;

  factory UserObj.fromJson(Map<String, dynamic> json) => _$UserObjFromJson(json);
}

