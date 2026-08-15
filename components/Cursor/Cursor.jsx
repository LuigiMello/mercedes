'use client';
import { useEffect, useRef } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Cursor() {
  const cursorRef = useRef(null);
  const xRef = useRef(window?.innerWidth  / 2 || 0);
  const yRef = useRef(window?.innerHeight / 2 || 0);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let tx = xRef.current, ty = yRef.current;
    let rafId;

    const onMove = e => {
      xRef.current = e.clientX;
      yRef.current = e.clientY;
    };

    /* Silky-smooth lag follow */
    const follow = () => {
      tx += (xRef.current - tx) * 0.14;
      ty += (yRef.current - ty) * 0.14;
      el.style.left = tx + 'px';
      el.style.top  = ty + 'px';
      rafId = requestAnimationFrame(follow);
    };
    follow();

    /* Hover scale on interactive elements */
    const onEnter = () => el.classList.add('hovering');
    const onLeave = () => el.classList.remove('hovering');

    document.addEventListener('mousemove', onMove, { passive: true });

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attachHover();

    /* Also handle dynamically added elements */
    const mo = new MutationObserver(attachHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      mo.disconnect();
    };
  }, []);

  return (
    <div ref={cursorRef} className="mb-cursor">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${BASE}/Mercedes-Logo.svg.webp`} alt="" aria-hidden="true" />
    </div>
  );
}
