'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Models.module.css';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const CONFIGURATOR = 'https://www2.mercedes-benz.com.br/passengercars/configurator.html?filters=';

const MODELS = [
  {
    name: 'AMG GT',
    category: 'Performance',
    tagline: 'Potência bruta. Alma refinada.',
    price: 'A partir de R$ 860.000',
    accent: '#00adef',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=85',
    specs: [
      { l: 'Motor',   v: '4.0L V8 Biturbo' },
      { l: 'Potência', v: '630 cv' },
      { l: '0–100',   v: '3,2 s' },
    ],
  },
  {
    name: 'S-Class',
    category: 'Sedã de Luxo',
    tagline: 'O ápice do luxo automobilístico.',
    price: 'A partir de R$ 595.000',
    accent: '#d8d8d8',
    img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=900&q=85',
    specs: [
      { l: 'Motor',    v: '3.0L I6 EQ Boost' },
      { l: 'Potência', v: '429 cv' },
      { l: '0–100',   v: '4,9 s' },
    ],
  },
  {
    name: 'EQS',
    category: 'Elétrico',
    tagline: 'O futuro é silencioso.',
    price: 'A partir de R$ 540.000',
    accent: '#00d4aa',
    img: `${BASE}/eqs.jpg`,
    specs: [
      { l: 'Autonomia', v: '770 km' },
      { l: 'Potência',  v: '658 cv' },
      { l: 'Recarga',   v: '200 kW' },
    ],
  },
  {
    name: 'G-Class',
    category: 'Off-Road Icônico',
    tagline: 'Lendário. Invencível.',
    price: 'A partir de R$ 720.000',
    accent: '#c8aa6e',
    img: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=900&q=85',
    specs: [
      { l: 'Motor',    v: '4.0L V8 Biturbo' },
      { l: 'Potência', v: '577 cv' },
      { l: 'Torque',   v: '850 Nm' },
    ],
  },
];

export default function Models() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('[data-models-h]', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 60, duration: 1, ease: 'power3.out',
      });
      gsap.from('[data-models-card]', {
        scrollTrigger: { trigger: '[data-models-card]', start: 'top 85%', once: true },
        y: 40, stagger: 0.12, duration: 0.9, ease: 'power3.out',
      });
    };
    init();
  }, []);

  const m = MODELS[active];

  return (
    <section id="models" className={styles.section} ref={sectionRef}>
      <div className={styles.bgBlob} style={{ background: m.accent }} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} data-models-h>
          <p className={styles.tag}>
            <span className={styles.tagLine} />Nossa Linha
          </p>
          <h2 className={styles.title}>
            Modelos<br /><em>Icônicos</em>
          </h2>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {MODELS.map((model, i) => (
            <button
              key={model.name}
              className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
              style={{ '--acc': model.accent }}
            >
              {model.name}
            </button>
          ))}
        </div>

        {/* Showcase */}
        <div className={styles.showcase} key={active}>
          <div className={styles.showcaseImg}>
            <img src={m.img} alt={m.name} className={styles.img} />
            <div className={styles.imgOverlay} />
            <span className={styles.categoryBadge}>{m.category}</span>
          </div>

          <div className={styles.showcaseInfo}>
            <h3 className={styles.modelName}>{m.name}</h3>
            <p className={styles.tagline}>{m.tagline}</p>
            <p className={styles.price}>{m.price}</p>

            <div className={styles.specs}>
              {m.specs.map(s => (
                <div key={s.l} className={styles.spec}>
                  <span className={styles.specVal} style={{ color: m.accent }}>{s.v}</span>
                  <span className={styles.specLabel}>{s.l}</span>
                </div>
              ))}
            </div>

            <a
              href={CONFIGURATOR}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
              style={{ background: m.accent, color: m.accent === '#d8d8d8' ? '#111' : '#fff' }}
            >
              Configurar Este Modelo →
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {MODELS.map((model, i) => (
            <article
              key={model.name}
              data-models-card
              className={`${styles.card} ${i === active ? styles.cardActive : ''}`}
              onClick={() => setActive(i)}
            >
              <div className={styles.cardImg}>
                <img src={model.img} alt={model.name} />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardCategory}>{model.category}</span>
                <h4 className={styles.cardName}>{model.name}</h4>
                <span className={styles.cardPrice}>{model.price}</span>
              </div>
              <div className={styles.cardAccentBar} style={{ background: model.accent }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
