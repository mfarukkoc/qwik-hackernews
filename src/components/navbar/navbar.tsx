import {
  component$,
  useClientEffect$,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { QwikLogo } from "../icons/qwik";
import styles from "./style.css?inline";

export const Navbar = component$(() => {
  const { scopeId } = useStylesScoped$(styles);
  const location = useLocation();
  const navbarItems = [
    {
      href: "/new",
      child: "New",
    },
    {
      href: "/show",
      child: "Show",
    },
    {
      href: "/ask",
      child: "Ask",
    },
    {
      href: "/jobs",
      child: "Jobs",
    },
  ];

  const ref = useSignal<Element>();

  useClientEffect$(({ cleanup }) => {
    function updateNavbarHeight() {
      if (ref.value) {
        const rect = ref.value.getBoundingClientRect();
        document.documentElement.style.setProperty(
          "--navbar-height",
          rect.height + "px"
        );
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      updateNavbarHeight();
    });
    if (ref.value) {
      resizeObserver.observe(ref.value);
    }
    cleanup(() => resizeObserver.disconnect());
  });

  return (
    <header class="navbar" ref={ref}>
      <nav class="inner">
        <Link class={`${scopeId} link logo`} href="/">
          <QwikLogo />
        </Link>
        <ul class="navbar-list">
          {navbarItems.map((navbarItem) => (
            <li
              class={`navbar__item ${
                location.pathname.includes(navbarItem.href) ? "active" : ""
              }`}
            >
              <Link class={`${scopeId} link`} href={navbarItem.href}>
                {navbarItem.child}
              </Link>
            </li>
          ))}
        </ul>
        <Link class={`${scopeId} link qwik`} href="https://qwik.builder.io/">
          Built with qwik
        </Link>
      </nav>
    </header>
  );
});
