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
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik - Hacker News",
};
