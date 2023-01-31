import {
  component$,
  useClientEffect$,
  useSignal,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";

interface PaginationProps {
  store?: {
    page: number;
  };
  nextDisabled?: boolean;
}

export const Pagination = component$<PaginationProps>(
  ({ store: storeFromProps, nextDisabled }) => {
    useStyles$(styles);
    const localStore = useStore({
      page: 1,
    });

    const store = storeFromProps || localStore;

    const ref = useSignal<Element>();

    useClientEffect$(({ cleanup }) => {
      function updatePaginationHeight() {
        if (ref.value) {
          const rect = ref.value.getBoundingClientRect();
          document.documentElement.style.setProperty(
            "--pagination-height",
            rect.height + "px"
          );
        }
      }

      const resizeObserver = new ResizeObserver(() => {
        updatePaginationHeight();
      });
      if (ref.value) {
        resizeObserver.observe(ref.value);
      }
      cleanup(() => {
        document.documentElement.style.setProperty(
          "--pagination-height",
          "0px"
        );
        resizeObserver.disconnect();
      });
    });

    return (
      <div class="pagination" ref={ref}>
        <button onClick$={() => store.page--} disabled={store.page === 1}>
          &lt; prev
        </button>
        <span>{store.page}</span>
        <button onClick$={() => store.page++} disabled={nextDisabled}>
          next &gt;
        </button>
      </div>
    );
  }
);
