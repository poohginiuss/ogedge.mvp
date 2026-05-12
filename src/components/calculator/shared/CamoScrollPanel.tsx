"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

function getScrollThumbState(scroller: HTMLDivElement) {
  const { clientHeight, scrollHeight, scrollTop } = scroller;
  const visible = scrollHeight > clientHeight + 1;
  if (!visible) {
    return { height: 0, top: 0, visible: false };
  }

  const trackHeight = Math.max(clientHeight - 32, 0);
  const height = Math.max((clientHeight / scrollHeight) * trackHeight, 36);
  const maxTop = Math.max(trackHeight - height, 0);
  const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop;

  return { height, top, visible: true };
}

export function CamoScrollPanel({ children }: { children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ height: 0, top: 0, visible: false });

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setThumb(getScrollThumbState(scroller));
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller) return;

    const update = () => setThumb(getScrollThumbState(scroller));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    if (content) observer.observe(content);

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="relative h-full">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="camo-native-scrollbar h-full overflow-y-auto overflow-x-hidden pr-3"
      >
        <div ref={contentRef} className="flex flex-col">
          {children}
        </div>
      </div>
      {thumb.visible && (
        <div
          className="pointer-events-none absolute bottom-4 right-1.5 top-4 w-1 rounded-full"
          style={{ background: "rgba(56, 56, 82, 0.3)" }}
        >
          <div
            className="absolute left-0 w-full rounded-full"
            style={{
              height: thumb.height,
              transform: `translateY(${thumb.top}px)`,
              background: "var(--brand-deep)",
            }}
          />
        </div>
      )}
    </div>
  );
}
