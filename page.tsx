import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GEAR ADDICTION AI | STYLE WORKS GARAGE',
  description: 'キャンプギア好きのためのギア共感診断。'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
