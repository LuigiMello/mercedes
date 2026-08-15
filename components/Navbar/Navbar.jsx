'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const links = [
  { label: 'Modelos',    href: '#models' },
  { label: 'Inovação',   href: '#innovation' },
  { label: 'Galeria',    href: '#experience' },
  { label: 'Configurar', href: '#heritage' },
  { label: 'Contato',    href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* scroll state only — no GSAP opacity to avoid StrictMode issues */

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo */}
        <a href="#hero" className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE}/Mercedes-Logo.svg.webp`} alt="Mercedes-Benz" className={styles.logoIcon} />
          <span className={styles.logoText}>Mercedes‑Benz</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} className={styles.link}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://www2.mercedes-benz.com.br/passengercars/configurator.html?filters="
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Configurar
        </a>

        {/* Burger */}
        <button
          className={`${styles.burger} ${open ? styles.open : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}>
        <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Fechar">✕</button>
        {links.map(l => (
          <a key={l.label} href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="https://www2.mercedes-benz.com.br/passengercars/configurator.html?filters="
          target="_blank" rel="noopener noreferrer"
          className={styles.mobileCta}
          onClick={() => setOpen(false)}
        >
          Configurar Agora
        </a>
      </div>
    </>
  );
}
