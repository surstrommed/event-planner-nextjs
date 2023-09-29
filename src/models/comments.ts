import { z } from "zod";

const Comment = z.object({
  id: z.string(),
  email: z.string(),
  creator: z.string(),
  text: z.string(),
  eventId: z.string(),
});

export type IComment = z.infer<typeof Comment>;

const AddCommentData = Comment.omit({ id: true });
export type IAddCommentData = z.infer<typeof AddCommentData>;

const onAddComment = z
  .function()
  .args(AddCommentData)
  .returns(z.promise(z.void()));

export type AddCommentHandler = z.infer<typeof onAddComment>;

const NewComment = z.object({
  onAddComment,
  eventId: z.string(),
});

export type INewComment = z.infer<typeof NewComment>;

const Comments = z.object({
  eventId: z.string(),
});

export type IComments = z.infer<typeof Comments>;

const CommentList = z.object({
  comments: Comment.array(),
});

export type ICommentList = z.infer<typeof CommentList>;

const CommentCard = z.object({
  comment: Comment,
});

export type ICommentCard = z.infer<typeof CommentCard>;
