'use client';
import { useEffect, useRef } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

import styles from './Hero.module.css';

export default function Hero() {
  const contentRef = useRef(null);

  /* GSAP entrance */
  useEffect(() => {
    let active = true;
    let ctx;

    const init = async () => {
      const { gsap } = await import('gsap');
      if (!active) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        tl.from('[data-h-tag]',    { y: 22, duration: 0.6, ease: 'power3.out' })
          .from('[data-h-line]',   { y: 48, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
          .from('[data-h-sub]',    { y: 22, duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .from('[data-h-btn]',    { y: 16, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
          .from('[data-h-stat]',   { y: 16, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
          .from('[data-h-scroll]', { y: 10, duration: 0.5 }, '-=0.2');
      });
    };

    init();
    return () => { active = false; ctx?.revert(); };
  }, []);

  return (
    <section className={styles.hero} id="hero">

      {/* ── Video background ── */}
      <div className={styles.videoBg}>
        <video
          src={`${BASE}/meca.mp4`}
          autoPlay muted loop playsInline
          className={styles.video}
        />
        {/* Cinematic overlays */}
        <div className={styles.ovGrad}   />
        <div className={styles.ovDark}   />
        <div className={styles.ovBottom} />
      </div>

      {/* ── Bottom content ── */}
      <div className={styles.content} ref={contentRef}>
        {/* Left: headline */}
        <div className={styles.left}>
          <p className={styles.tag} data-h-tag>
            <span className={styles.tagLine} />
            Since 1886 — Stuttgart
          </p>

          <h1 className={styles.h1}>
            <span data-h-line>The Best</span>
            <span data-h-line>or</span>
            <span className={styles.h1stroke} data-h-line>Nothing.</span>
          </h1>

          <p className={styles.sub} data-h-sub>
            130 anos de engenharia de precisão, design eterno e a busca
            implacável pela perfeição automobilística.
          </p>

          <div className={styles.btns}>
            <a href="#models" className={styles.btnPrimary} data-h-btn>
              Explorar Modelos
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#innovation" className={styles.btnGhost} data-h-btn>Ver Filme</a>
          </div>
        </div>

        {/* Right: stats */}
        <div className={styles.statsCol}>
          {[
            { num: '130+', label: 'Anos de Legado' },
            { num: '3.4M', label: 'Carros por Ano' },
            { num: '#1',   label: 'Marca de Luxo' },
          ].map(s => (
            <div key={s.label} className={styles.stat} data-h-stat>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className={styles.scrollHint} data-h-scroll>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
