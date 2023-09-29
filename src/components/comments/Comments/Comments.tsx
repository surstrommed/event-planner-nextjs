"use client";

import { useEffect, useState } from "react";
import useSnackBar from "@components/snackbar/Snackbar";
import { COMMENTS_FAILED_LOAD } from "@consts/messages";
import { IComments, IComment, AddCommentHandler } from "@models/comments";
import CommentList from "../CommentList/CommentList";
import NewComment from "../NewComment/NewComment";
import Button from "@components/ui/Button/Button";
import { Space } from "antd";
import { styles } from ".";
import { useSession } from "next-auth/react";
import { addEventComment, getEventComments } from "@/requests";

const Comments = (props: IComments) => {
  const { eventId } = props;

  const { data } = useSession();

  const { showSnackbar } = useSnackBar();

  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [isCommentsUpdated, setCommentsUpdated] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (isCommentsVisible) {
      (async function asyncWrapper() {
        try {
          const { comments } = await getEventComments(eventId);
          setComments(comments);
          isCommentsUpdated && setCommentsUpdated(false);
        } catch {
          showSnackbar({ message: COMMENTS_FAILED_LOAD, variant: "error" });
        }
      })();
    }
  }, [isCommentsVisible, isCommentsUpdated]);

  const toggleCommentsHandler = () => {
    setCommentsVisible((prevStatus) => !prevStatus);
  };

  const addCommentHandler: AddCommentHandler = async (commentData) => {
    await addEventComment(commentData);
    setCommentsUpdated(true);
  };

  if (!data?.user) {
    return null;
  }

  return (
    <Space style={styles.commentsContainer}>
      <Button onClick={toggleCommentsHandler}>
        {isCommentsVisible ? "Hide" : "Show"} comments
      </Button>
      {isCommentsVisible && (
        <NewComment onAddComment={addCommentHandler} eventId={eventId} />
      )}
      {isCommentsVisible && <CommentList comments={comments} />}
    </Space>
  );
};

export default Comments;
