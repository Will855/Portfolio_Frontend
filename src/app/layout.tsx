import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio - Wilmer Lynch',
  description: 'Mi portafolio profesional y proyectos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${montserrat.className}`}>
      <body className="antialiased min-h-screen text-slate-200 bg-transparent">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
