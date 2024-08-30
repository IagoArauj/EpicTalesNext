import type { Metadata } from "next";
import "./globals.css";
import { noto } from "./components/ui/fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const metadata: Metadata = {
  title: "EpicTales",
  description:
    "Crie e compartilhe suas histórias épicas de RPG com seus jogadores usando IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body
        className={`${noto.className} antialiased bg-slate-950 w-screen h-screen overflow-x-hidden overflow-y-auto`}
        suppressHydrationWarning={true}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          pauseOnFocusLoss
          pauseOnHover
          newestOnTop
          theme="dark"
          draggable
        />
        {children}
      </body>
    </html>
  );
}
