import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class NotificationItem {
  String message;

  NotificationItem({
    required this.message,
  });

  factory NotificationItem.fromMap(Map<String, dynamic> json) {
    return NotificationItem(message: json['message']);
  }
  // Map<String, dynamic> toJson() => _$NotificationItemToJson(this);
}
