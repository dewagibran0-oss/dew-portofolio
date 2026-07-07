import { useEffect } from "react";

/**
 * Shared modal behavior: locks background scroll while open and closes on Escape.
 * Keeps overlays accessible and prevents the page from scrolling behind them.
 */
export function useModalBehavior(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const html = document.documentElement;
    const body = document.body;

    // Compensate for the scrollbar so the page doesn't shift when it disappears.
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    document.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.paddingRight = prev.bodyPaddingRight;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);
}
