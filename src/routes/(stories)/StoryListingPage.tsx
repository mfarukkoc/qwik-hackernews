import {
  component$,
  Resource,
  useClientEffect$,
  useResource$,
  useStore,
} from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { fetchStoryList, StoryCategory, StoryType } from "~/api";
import { Pagination } from "~/components/pagination/pagination";
import { Spinner } from "~/components/spinner/spinner";
import { Story } from "~/components/story/story";

export default component$(({ category }: { category: StoryCategory }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageStore = useStore({
    page: parseInt(location.query.page || "1") || 1,
  });
  const stories = useResource$<StoryType[]>(async ({ track }) => {
    track(pageStore);
    const response = await fetchStoryList({
      category: category,
      page: pageStore.page,
    });
    return response;
  });

  useClientEffect$(({ track }) => {
    track(() => location.query.page);
    pageStore.page = parseInt(location.query.page || "1") || 1;
  });

  useClientEffect$(({ track }) => {
    track(pageStore);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", pageStore.page.toString());

    navigate.path = `${location.pathname}?${searchParams}`;
  });

  return (
    <div>
      <Resource
        value={stories}
        onPending={() => (
          <>
            <Pagination store={pageStore} nextDisabled />
            <div class="center">
              <Spinner />
            </div>
          </>
        )}
        onResolved={(response) => (
          <>
            <Pagination
              store={pageStore}
              nextDisabled={response.length === 0}
            />
            {response.map((story) => (
              <Story key={story.id} story={story} />
            ))}
          </>
        )}
      />
    </div>
  );
});
