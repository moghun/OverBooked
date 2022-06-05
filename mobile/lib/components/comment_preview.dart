import 'package:flutter/material.dart';
import 'package:mobile/models/comment.dart';
import 'package:mobile/utils/colors.dart';

class CommentPreview extends StatelessWidget {
  const CommentPreview({Key? key, required this.comment}) : super(key: key);

  final Comment comment;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(5),
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
          border: Border.all(color: AppColors.primary.withOpacity(0.2), width: 1),
          borderRadius: BorderRadius.circular(10),
          color: AppColors.primary.withOpacity(0.1)),
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(comment.username + ":"),
          Row(
            children: [
              Expanded(
                  child: Text(
                comment.commentContent,
                overflow: TextOverflow.ellipsis,
                maxLines: 5,
              )),
            ],
          )
        ],
      ),
    );
  }
}
