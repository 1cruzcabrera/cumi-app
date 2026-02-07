import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CUMI - Camisetas y Bordados",
  description: "Personalización textil y rastreo de pedidos en El Salvador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* SELECTION: Ahora cuando seleccionas texto se ve Naranja Fuego */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-gray-200 selection:bg-orange-500 selection:text-white`}
      >
        {/* NAVBAR */}
        <nav className="border-b border-white/5 p-4 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo con Degradado Fuego */}
            <Link href="/" className="text-2xl font-black tracking-tighter hover:opacity-80 transition">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                CUMI
              </span>
            </Link>
            
            {/* Botón de Rastreo con borde sutil naranja */}
            <div>
              <Link 
                href="/rastreo" 
                className="text-sm font-bold text-gray-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2 rounded-full transition border border-orange-500/20 hover:border-orange-500/50 shadow-[0_0_10px_rgba(234,88,12,0.1)]"
              >
                🔍 Rastrear
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}