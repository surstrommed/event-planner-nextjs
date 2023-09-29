"use client";

import { ICommentCard } from "@models/comments";
import { Card } from "antd";
import { styles } from ".";

const CommentCard = (props: ICommentCard) => {
  const { comment } = props;

  return (
    <Card title={comment.creator} bordered style={styles.commentCard}>
      <p>{comment.text}</p>
    </Card>
  );
};

export default CommentCard;
