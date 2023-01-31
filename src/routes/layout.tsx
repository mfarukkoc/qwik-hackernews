import { component$, Slot } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navbar/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <main>
        <Slot />
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik - Hacker News",
};
