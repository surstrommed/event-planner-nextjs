"use client";

import { ICommentList } from "@models/comments";
import { Space } from "antd";
import CommentCard from "../CommentCard/CommentCard";
import { styles } from ".";

const CommentList = (props: ICommentList) => {
  const { comments } = props;

  return (
    <Space style={styles.commentsList}>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Space>
  );
};

export default CommentList;
