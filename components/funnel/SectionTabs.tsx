"use client";

import { useEffect, useState } from "react";

interface Props {
  /** In page order; each id is a section's anchor. */
  items: { id: string; label: string }[];
}

/** Sticky in-page tab bar. The tab for the section currently under it is highlighted. */
export default function SectionTabs({ items }: Props) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const bar = document.querySelector<HTMLElement>(".efs-section-tabs");
      const line = (bar?.getBoundingClientRect().bottom ?? 0) + 8;
      // The last section whose top has scrolled past the bottom of the tab bar.
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last section wins even if it's too short to reach the bar.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = items[items.length - 1]?.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // Keep the active tab visible when the bar scrolls sideways on small screens.
  useEffect(() => {
    document.querySelector(`.efs-section-tabs a[href="#${active}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  return (
    <nav className="efs-section-tabs" aria-label="On this page">
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
