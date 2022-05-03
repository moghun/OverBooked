// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'user_obj.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

UserObj _$UserObjFromJson(Map<String, dynamic> json) {
  return _UserObj.fromJson(json);
}

/// @nodoc
class _$UserObjTearOff {
  const _$UserObjTearOff();

  _UserObj call(
      {required String uid,
      String? name,
      String? email,
      String? photoURL,
      String? number}) {
    return _UserObj(
      uid: uid,
      name: name,
      email: email,
      photoURL: photoURL,
      number: number,
    );
  }

  UserObj fromJson(Map<String, Object?> json) {
    return UserObj.fromJson(json);
  }
}

/// @nodoc
const $UserObj = _$UserObjTearOff();

/// @nodoc
mixin _$UserObj {
  String get uid => throw _privateConstructorUsedError;
  String? get name => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  String? get photoURL => throw _privateConstructorUsedError;
  String? get number => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UserObjCopyWith<UserObj> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserObjCopyWith<$Res> {
  factory $UserObjCopyWith(UserObj value, $Res Function(UserObj) then) =
      _$UserObjCopyWithImpl<$Res>;
  $Res call(
      {String uid,
      String? name,
      String? email,
      String? photoURL,
      String? number});
}

/// @nodoc
class _$UserObjCopyWithImpl<$Res> implements $UserObjCopyWith<$Res> {
  _$UserObjCopyWithImpl(this._value, this._then);

  final UserObj _value;
  // ignore: unused_field
  final $Res Function(UserObj) _then;

  @override
  $Res call({
    Object? uid = freezed,
    Object? name = freezed,
    Object? email = freezed,
    Object? photoURL = freezed,
    Object? number = freezed,
  }) {
    return _then(_value.copyWith(
      uid: uid == freezed
          ? _value.uid
          : uid // ignore: cast_nullable_to_non_nullable
              as String,
      name: name == freezed
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String?,
      email: email == freezed
          ? _value.email
          : email // ignore: cast_nullable_to_non_nullable
              as String?,
      photoURL: photoURL == freezed
          ? _value.photoURL
          : photoURL // ignore: cast_nullable_to_non_nullable
              as String?,
      number: number == freezed
          ? _value.number
          : number // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
abstract class _$UserObjCopyWith<$Res> implements $UserObjCopyWith<$Res> {
  factory _$UserObjCopyWith(_UserObj value, $Res Function(_UserObj) then) =
      __$UserObjCopyWithImpl<$Res>;
  @override
  $Res call(
      {String uid,
      String? name,
      String? email,
      String? photoURL,
      String? number});
}

/// @nodoc
class __$UserObjCopyWithImpl<$Res> extends _$UserObjCopyWithImpl<$Res>
    implements _$UserObjCopyWith<$Res> {
  __$UserObjCopyWithImpl(_UserObj _value, $Res Function(_UserObj) _then)
      : super(_value, (v) => _then(v as _UserObj));

  @override
  _UserObj get _value => super._value as _UserObj;

  @override
  $Res call({
    Object? uid = freezed,
    Object? name = freezed,
    Object? email = freezed,
    Object? photoURL = freezed,
    Object? number = freezed,
  }) {
    return _then(_UserObj(
      uid: uid == freezed
          ? _value.uid
          : uid // ignore: cast_nullable_to_non_nullable
              as String,
      name: name == freezed
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String?,
      email: email == freezed
          ? _value.email
          : email // ignore: cast_nullable_to_non_nullable
              as String?,
      photoURL: photoURL == freezed
          ? _value.photoURL
          : photoURL // ignore: cast_nullable_to_non_nullable
              as String?,
      number: number == freezed
          ? _value.number
          : number // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_UserObj implements _UserObj {
  _$_UserObj(
      {required this.uid, this.name, this.email, this.photoURL, this.number});

  factory _$_UserObj.fromJson(Map<String, dynamic> json) =>
      _$$_UserObjFromJson(json);

  @override
  final String uid;
  @override
  final String? name;
  @override
  final String? email;
  @override
  final String? photoURL;
  @override
  final String? number;

  @override
  String toString() {
    return 'UserObj(uid: $uid, name: $name, email: $email, photoURL: $photoURL, number: $number)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _UserObj &&
            const DeepCollectionEquality().equals(other.uid, uid) &&
            const DeepCollectionEquality().equals(other.name, name) &&
            const DeepCollectionEquality().equals(other.email, email) &&
            const DeepCollectionEquality().equals(other.photoURL, photoURL) &&
            const DeepCollectionEquality().equals(other.number, number));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(uid),
      const DeepCollectionEquality().hash(name),
      const DeepCollectionEquality().hash(email),
      const DeepCollectionEquality().hash(photoURL),
      const DeepCollectionEquality().hash(number));

  @JsonKey(ignore: true)
  @override
  _$UserObjCopyWith<_UserObj> get copyWith =>
      __$UserObjCopyWithImpl<_UserObj>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_UserObjToJson(this);
  }
}

abstract class _UserObj implements UserObj {
  factory _UserObj(
      {required String uid,
      String? name,
      String? email,
      String? photoURL,
      String? number}) = _$_UserObj;

  factory _UserObj.fromJson(Map<String, dynamic> json) = _$_UserObj.fromJson;

  @override
  String get uid;
  @override
  String? get name;
  @override
  String? get email;
  @override
  String? get photoURL;
  @override
  String? get number;
  @override
  @JsonKey(ignore: true)
  _$UserObjCopyWith<_UserObj> get copyWith =>
      throw _privateConstructorUsedError;
}
