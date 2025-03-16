import "@/app/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientBody from "@/app/ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "未来のインテリア | 空間の変容",
  description: "未来のインテリアを、今、あなたの手のひらに。美の革新と空間の変容が交差する、夢のようなインテリア体験。",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
