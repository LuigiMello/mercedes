import styles from './Footer.module.css';

function MercedesStar({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2.5" />
      <path d="M50 4 L54 46 L50 50 L46 46 Z" fill="currentColor" />
      <path d="M50 4 L54 46 L50 50 L46 46 Z" fill="currentColor" transform="rotate(120,50,50)" />
      <path d="M50 4 L54 46 L50 50 L46 46 Z" fill="currentColor" transform="rotate(240,50,50)" />
    </svg>
  );
}

const COLS = [
  { heading: 'Modelos', links: ['AMG GT', 'S-Class', 'E-Class', 'GLE SUV', 'G-Class', 'EQS'] },
  { heading: 'Experiência', links: ['Test Drive', 'Configurar', 'Financiamento', 'Troca', 'Seminovos Certificados'] },
  { heading: 'Empresa', links: ['Sobre', 'Inovação', 'História', 'Imprensa', 'Carreiras'] },
  { heading: 'Suporte', links: ['Portal do Proprietário', 'Concessionárias', 'Assistência Técnica', 'Assistência na Estrada'] },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      {/* CTA banner */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            Pronto para o<br /><em>Carro dos Seus Sonhos?</em>
          </h2>
          <a href="#models" className={styles.ctaBtn}>Encontre Seu Mercedes-Benz</a>
        </div>
        <div className={styles.ctaBg} />
      </div>

      {/* Main footer */}
      <div className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <MercedesStar size={40} />
              <span>Mercedes-Benz</span>
            </div>
            <p className={styles.brandTagline}>The Best or Nothing.</p>
            <p className={styles.brandSub}>
              Mais de 130 anos de paixão, inovação e arte automotiva — moldando o futuro da mobilidade.
            </p>
          </div>

          {COLS.map(col => (
            <div key={col.heading} className={styles.col}>
              <h4 className={styles.colHead}>{col.heading}</h4>
              <ul className={styles.colLinks}>
                {col.links.map(l => (
                  <li key={l}><a href="#" className={styles.colLink}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span>© 2025 Mercedes-Benz AG. Todos os direitos reservados.</span>
        <div className={styles.bottomLinks}>
          <a href="#">Privacidade</a>
          <a href="#">Legal</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
