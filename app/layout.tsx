import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tiktok recipe extractor",
  description: "turn any tiktok cooking video into a formatted recipe",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🥘</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "🥘 tiktok recipe extractor",
    description: "turn any tiktok cooking video into a formatted recipe",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "🥘 tiktok recipe extractor",
    description: "turn any tiktok cooking video into a formatted recipe",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

