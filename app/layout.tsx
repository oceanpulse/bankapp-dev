export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import './globals.css';
import type { Metadata } from 'next';
import { Inter, IBM_Plex_Serif } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: 'CiFi Banking',
  description: 'CiFi Banking is a modern banking platform for everyone.',
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ibmPlexSerif.variable}`}>{children}</body>
    </html>
  );
}

// this file sets out the fonts across the entire application
