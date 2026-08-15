'use client';
import { useEffect, useRef } from 'react';
import styles from './Gallery.module.css';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=85', span: 'wide', label: 'AMG GT — Pronto para Pista' },
  { src: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=85', span: 'tall', label: 'Interior de Excelência' },
  { src: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=85', span: 'normal', label: 'S-Class — Elegância Pura' },
  { src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=85', span: 'normal', label: 'Noite em Movimento' },
  { src: `${BASE}/eqs.jpg`, span: 'wide', label: 'EQS — Futuro Elétrico' },
  { src: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=600&q=85', span: 'tall', label: 'G-Class — Domínio Total' },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const itemRefs   = useRef([]);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { scale: 1.06 },
          {
            scale: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            delay: i * 0.05,
          }
        );

        /* Subtle parallax inside each image */
        const img = el.querySelector('img');
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        }
      });

      gsap.from('[data-gallery-header]', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 50, duration: 1, ease: 'power3.out',
      });
    };
    init();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="experience">
      <div className={styles.container}>
        <div className={styles.header} data-gallery-header>
          <p className="tag">Galeria</p>
          <h2 className={styles.title}>Criado para<br /><em>Inspirar</em></h2>
        </div>

        <div className={styles.grid}>
          {IMAGES.map((img, i) => (
            <div
              key={i}
              ref={el => itemRefs.current[i] = el}
              className={`${styles.item} ${styles[img.span]}`}
            >
              <img src={img.src} alt={img.label} className={styles.img} />
              <div className={styles.overlay}>
                <span className={styles.imgLabel}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
