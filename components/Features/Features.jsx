'use client';
import { useEffect, useRef } from 'react';
import styles from './Features.module.css';

const STEPS = [
  {
    num: '01',
    title: 'Escolha Seu Modelo',
    desc: 'Explore nossa linha completa — dos ícones de performance AMG aos visionários elétricos EQ.',
  },
  {
    num: '02',
    title: 'Personalize',
    desc: 'Escolha cada detalhe: cor, materiais internos, pacotes de condução e opções de tecnologia.',
  },
  {
    num: '03',
    title: 'Configure & Solicite',
    desc: 'Finalize seu carro dos sonhos online com preços em tempo real e estimativas de entrega.',
  },
  {
    num: '04',
    title: 'Entrega Exclusiva',
    desc: 'Um concierge dedicado entrega seu Mercedes-Benz e apresenta cada funcionalidade pessoalmente.',
  },
];

export default function Features() {
  const lineRef    = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      /* Animated progress line */
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%', end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      gsap.from('[data-step]', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        x: -50, duration: 1, stagger: 0.18, ease: 'power3.out',
      });

      gsap.from('[data-feat-img]', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        x: 80, duration: 1.2, ease: 'power3.out',
      });

      gsap.from('[data-feat-h]', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 50, duration: 1, ease: 'power3.out',
      });
    };
    init();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="heritage">
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.header} data-feat-h>
            <p className={styles.tag}><span className={styles.tagLine} />Sua Jornada</p>
            <h2 className={styles.title}>
              Tenha um<br /><em>Mercedes-Benz</em>
            </h2>
            <p className={styles.sub}>
              Da escolha à entrega — uma experiência tão extraordinária quanto o carro em si.
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.lineTrack}>
              <div ref={lineRef} className={styles.lineFill} />
            </div>

            {STEPS.map(s => (
              <div key={s.num} className={styles.step} data-step>
                <span className={styles.stepNum}>{s.num}</span>
                <div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image stack */}
        <div className={styles.right} data-feat-img>
          <div className={styles.imgStack}>
            <img
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=700&q=85"
              alt="Mercedes AMG GT"
              className={styles.imgMain}
            />
            <div className={styles.floatCard}>
              <img
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&q=85"
                alt="Mercedes S-Class interior"
                className={styles.floatImg}
              />
              <div className={styles.floatBadge}>
                <span className={styles.badgeNum}>130+</span>
                <span className={styles.badgeLabel}>Anos de<br />Excelência</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
