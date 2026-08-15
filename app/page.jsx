import dynamic from 'next/dynamic';
import Footer  from '@/components/Footer/Footer';

/* All client components loaded without SSR (Three.js / GSAP) */
const Cursor        = dynamic(() => import('@/components/Cursor/Cursor'),                 { ssr: false });
const SmoothWrapper = dynamic(() => import('@/components/SmoothWrapper/SmoothWrapper'),   { ssr: false });
const Navbar        = dynamic(() => import('@/components/Navbar/Navbar'),                 { ssr: false });
const Hero          = dynamic(() => import('@/components/Hero/Hero'),                     { ssr: false });
const Marquee       = dynamic(() => import('@/components/Marquee/Marquee'),               { ssr: false });
const Models        = dynamic(() => import('@/components/Models/Models'),                 { ssr: false });
const Innovation    = dynamic(() => import('@/components/Innovation/Innovation'),         { ssr: false });
const Gallery       = dynamic(() => import('@/components/Gallery/Gallery'),               { ssr: false });
const Features      = dynamic(() => import('@/components/Features/Features'),             { ssr: false });

export default function Home() {
  return (
    <>
      {/* Fixed — outside the scroll wrapper */}
      <Cursor />
      <Navbar />

      {/* Smooth scroll wrapper — provides data-speed parallax via effects: true */}
      <SmoothWrapper>
        <main>
          {/* Hero has its own data-speed on inner elements */}
          <Hero />

          {/* Marquee moves at normal speed */}
          <div data-speed="1">
            <Marquee />
          </div>

          {/* Models section — slight slower scroll = depth effect */}
          <div data-speed="0.97">
            <Models />
          </div>

          {/* Innovation — background parallax handled inside component */}
          <div data-speed="0.95">
            <Innovation />
          </div>

          {/* Gallery — each image has internal parallax */}
          <div data-speed="0.97">
            <Gallery />
          </div>

          {/* Features */}
          <div data-speed="0.98">
            <Features />
          </div>
        </main>

        <Footer />
      </SmoothWrapper>
    </>
  );
}
