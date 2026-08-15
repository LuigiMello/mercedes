'use client';
import { useEffect } from 'react';

export default function SmoothWrapper({ children }) {
  useEffect(() => {
    let smoother;

    const init = async () => {
      const { gsap }           = await import('gsap');
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger');
      const { ScrollSmoother } = await import('gsap/ScrollSmoother');

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      smoother = ScrollSmoother.create({
        wrapper:  '#smooth-wrapper',
        content:  '#smooth-content',
        smooth:   1.6,          /* butter-smooth scroll lag */
        effects:  true,         /* enables data-speed & data-lag parallax */
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    };

    init().catch(console.error);
    return () => smoother?.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
