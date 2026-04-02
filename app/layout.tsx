import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURION | Ndeipi Trading Terminal',
  description: 'African diaspora RWA trading platform powered by Ndeipi oracle network',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ height: '100vh', overflow: 'hidden', background: '#090B0E' }}>
        {children}
      </body>
    </html>
  );
}
