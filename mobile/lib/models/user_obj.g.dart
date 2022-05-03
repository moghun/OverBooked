// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_obj.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_UserObj _$$_UserObjFromJson(Map<String, dynamic> json) => _$_UserObj(
      uid: json['uid'] as String,
      name: json['name'] as String?,
      email: json['email'] as String?,
      photoURL: json['photoURL'] as String?,
      number: json['number'] as String?,
    );

Map<String, dynamic> _$$_UserObjToJson(_$_UserObj instance) =>
    <String, dynamic>{
      'uid': instance.uid,
      'name': instance.name,
      'email': instance.email,
      'photoURL': instance.photoURL,
      'number': instance.number,
    };
