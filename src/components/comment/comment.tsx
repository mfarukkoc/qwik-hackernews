import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { Comment as CommentType } from "~/api";
import { CommentList } from "./list";
import styles from "./style.css?inline";

export interface CommentProps {
  comment: CommentType;
}

export const Comment = component$(({ comment }: CommentProps) => {
  useStyles$(styles);
  const hasChildren = comment.comments.length > 0;
  const isChildrenCollapsed = useSignal(false);
  return (
    <li class="comment">
      <span class="meta">
        <a
          href={`https://news.ycombinator.com/user?id=${comment.user}`}
          target="_blank"
        >
          {comment.user}
        </a>
        &nbsp;
        {comment.time_ago}
      </span>
      <div class="content" dangerouslySetInnerHTML={comment.content}></div>
      {hasChildren && (
        <>
          <div
            class={`divider ${
              isChildrenCollapsed.value ? "collapsed" : "open"
            }`}
          >
            {isChildrenCollapsed.value ? (
              <>
                <button
                  class="collapse-button"
                  onClick$={() => (isChildrenCollapsed.value = false)}
                >
                  +
                </button>
                <span class="collapse-text">
                  {comment.comments.length}
                  {comment.comments.length > 1 ? " replies " : " reply "}
                  collapsed
                </span>
              </>
            ) : (
              <>
                <button
                  class="collapse-button"
                  onClick$={() => (isChildrenCollapsed.value = true)}
                >
                  -
                </button>
              </>
            )}
          </div>
          {!isChildrenCollapsed.value && (
            <CommentList comments={comment.comments} />
          )}
        </>
      )}
    </li>
  );
});
