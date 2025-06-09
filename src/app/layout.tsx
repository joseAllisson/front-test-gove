import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teste gove",
  description: "Um teste para Gove",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className="antialiased bg-[#dcdcdc] p-6"
      >
        <main className="bg-gray-50 px-6 py-4 rounded-lg">
          {children}
        </main>
      </body>
    </html>
  );
}
