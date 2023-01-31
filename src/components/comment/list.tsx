import { component$, useStyles$ } from "@builder.io/qwik";
import { Comment as CommentType } from "~/api";
import { Comment } from "./comment";
import styles from "./style.css?inline";

export interface CommentListProps {
  comments: CommentType[];
}

export const CommentList = component$(({ comments }: CommentListProps) => {
  useStyles$(styles);

  return (
    <ul class="comment-list">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
});
