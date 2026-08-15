'use client';
import { useEffect, useRef } from 'react';
import styles from './Innovation.module.css';

const IconLightning = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconCpu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 9V4M9 9V4M15 20v-5M9 20v-5M4 15h5M4 9h5M15 15h5M15 9h5" />
    <rect x="2" y="2" width="20" height="20" rx="2" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconWind = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
);

const FEATURES = [
  {
    Icon: IconLightning,
    title: 'Tração Elétrica',
    desc: 'Emissão zero, possibilidades infinitas. Nossa linha EQ redefine o que mobilidade elétrica significa.',
    stat: '770km', statLabel: 'Autonomia máxima',
  },
  {
    Icon: IconCpu,
    title: 'Inteligência MBUX',
    desc: 'Infoentretenimento com IA que aprende suas preferências e antecipa cada necessidade.',
    stat: '12.8"', statLabel: 'Tela principal',
  },
  {
    Icon: IconShield,
    title: 'Segurança Ativa',
    desc: 'Mais de 20 sistemas inteligentes trabalhando em conjunto para proteger cada trajeto.',
    stat: '200+', statLabel: 'Patentes',
  },
  {
    Icon: IconWind,
    title: 'Conforto Total',
    desc: 'Climatização multi-zone com sensoriamento biométrico para condições perfeitas no interior.',
    stat: '4 zonas', statLabel: 'Climatização',
  },
];

export default function Innovation() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(imgRef.current, {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.from('[data-feat-card]', {
        scrollTrigger: { trigger: '[data-feat-card]', start: 'top 80%', once: true },
        y: 50, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      });

      gsap.from('[data-innov-header]', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        y: 60, duration: 1, ease: 'power3.out',
      });
    };
    init();
  }, []);

  return (
    <section id="innovation" className={styles.section} ref={sectionRef}>
      <div className={styles.imgWrap}>
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Mercedes inovação"
          className={styles.bgImg}
        />
        <div className={styles.imgOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.header} data-innov-header>
          <p className="tag">Tecnologia</p>
          <h2 className={styles.title}>
            Inovação<br />
            <em>Redefinida</em>
          </h2>
          <p className={styles.sub}>
            A Mercedes-Benz expande os limites do possível — fundindo tecnologia de ponta com design atemporal para entregar uma experiência de condução inigualável.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map(f => (
            <div key={f.title} className={styles.card} data-feat-card>
              <span className={styles.icon} style={{ color: 'var(--blue)' }}><f.Icon /></span>
              <div className={styles.stat}>
                <span className={styles.statNum}>{f.stat}</span>
                <span className={styles.statLabel}>{f.statLabel}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
