import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { StoryType } from "~/api/index";
import styles from "./style.css?inline";

export interface StoryProps {
  story: StoryType;
}

export const Story = component$(({ story }: StoryProps) => {
  const { scopeId } = useStylesScoped$(styles);
  return (
    <div class="story">
      <span class="score">{story.points}</span>
      <div class="info">
        <span class="title">
          <a class="title-anchor" href={story.url} target="_blank">
            {story.title}
          </a>
          &nbsp;
          {story.domain && <span class="domain">({story.domain})</span>}
        </span>
        <span class="meta">
          by&nbsp;
          <a
            href={`https://news.ycombinator.com/user?id=${story.user}`}
            target="_blank"
          >
            {story.user}
          </a>
          &nbsp;
          {story.time_ago} |&nbsp;
          <Link href={`/story/${story.id}`} class={scopeId}>
            {story.comments_count} comments
          </Link>
        </span>
      </div>
    </div>
  );
});
