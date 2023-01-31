import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { StoryWithComments } from "~/api/index";
import styles from "./style.css?inline";

export interface StoryDetail {
  story: StoryWithComments;
}

export const StoryDetail = component$(({ story }: StoryDetail) => {
  useStylesScoped$(styles);
  return (
    <div class="story">
      <div class="info">
        <span class="header">
          <a class="title-anchor" href={story.url} target="_blank">
            {story.title}
          </a>
          &nbsp;
          {story.domain && <span class="domain">({story.domain})</span>}
        </span>
        <span class="meta">
          <span>{story.points} points</span> |&nbsp;by&nbsp;
          <a
            href={`https://news.ycombinator.com/user?id=${story.user}`}
            target="_blank"
          >
            {story.user}
          </a>
          &nbsp;
          {story.time_ago}
        </span>
      </div>
    </div>
  );
});
