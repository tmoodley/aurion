import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { NotifProvider } from '@/lib/notifications';

export const metadata: Metadata = {
  title: 'AURION | Ndeipi Trading Terminal',
  description: 'African diaspora RWA trading platform powered by Ndeipi oracle network',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ height: '100vh', overflow: 'hidden', background: '#090B0E' }}>
        <AuthProvider>
          <NotifProvider>
            {children}
          </NotifProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
