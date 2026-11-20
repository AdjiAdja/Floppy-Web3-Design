import type { Metadata } from 'next';
import { Pixelify_Sans, Space_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-pixel',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'floppy — Collect Unique Digital Art NFTs',
  description: 'Create, Explore, & Collect Digital Art NFTs on Base.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pixelify.variable} ${spaceMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="floppy-mesh-bg floppy-grain min-h-screen font-[family-name:var(--font-sans)] antialiased selection:bg-[#0A0A0A] selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
