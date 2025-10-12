import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TikTok Recipe Extractor",
  description: "Turn any TikTok cooking video into a formatted recipe",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥘</text></svg>",
      },
    ],
  },
  openGraph: {
    title: "TikTok Recipe Extractor",
    description: "Turn any TikTok cooking video into a formatted recipe",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TikTok Recipe Extractor",
    description: "Turn any TikTok cooking video into a formatted recipe",
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

