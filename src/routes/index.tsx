import { component$ } from "@builder.io/qwik";
import StoryPage from "./(stories)/StoryListingPage";

export default component$(() => {
  return <StoryPage category="news" />;
});
