import type { Metadata } from "next";
import "./globals.css";
import { noto } from "./components/ui/fonts";

export const metadata: Metadata = {
  title: "EpicTales",
  description: "Crie e compartilhe suas histórias épicas de RPG com seus jogadores usando IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${noto.className} antialiased bg-slate-950 w-screen h-screen overflow-x-hidden overflow-y-auto`}>
        {children}
      </body>
    </html>
  );
}
