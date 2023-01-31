import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { fetchStory, StoryWithComments } from "~/api";
import { CommentList } from "~/components/comment/list";
import { Spinner } from "~/components/spinner/spinner";
import { StoryDetail } from "~/components/story-detail/story-detail";

export default component$(() => {
  const location = useLocation();
  const id = location.params.id;
  const storyResource = useResource$<StoryWithComments>(async ({ track }) => {
    track(() => id);
    const response = await fetchStory({ id });
    return response;
  });

  return (
    <Resource
      value={storyResource}
      onPending={() => (
        <div class="center">
          <Spinner />
        </div>
      )}
      onResolved={(response) => (
        <>
          <StoryDetail story={response} />
          <CommentList comments={response.comments} />
        </>
      )}
      onRejected={() => <div>Error</div>}
    />
  );
});
