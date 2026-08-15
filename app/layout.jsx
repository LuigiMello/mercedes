import './globals.css';

export const metadata = {
  title: 'Mercedes-Benz — The Best or Nothing',
  description: 'Experience the pinnacle of automotive engineering.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
