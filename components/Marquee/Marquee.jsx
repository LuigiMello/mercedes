'use client';
import { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';

const ITEMS = [
  'Performance', '✦', 'Luxury', '✦', 'Innovation', '✦',
  'Heritage', '✦', 'Precision', '✦', 'Excellence', '✦',
  'Performance', '✦', 'Luxury', '✦', 'Innovation', '✦',
  'Heritage', '✦', 'Precision', '✦', 'Excellence', '✦',
];

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      });
    };
    init();
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.track} ref={trackRef}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className={item === '✦' ? styles.dot : styles.word}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
