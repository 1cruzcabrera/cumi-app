import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image"; // IMPORTANTE: Agregamos Image para el logo
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
  title: "CUMI - ¡Camisetas y más!",
  description: "Personalización textil y rastreo de pedidos en El Salvador",
  icons: {
    // Usamos 'url' explícitamente y le ponemos ?v=5 para obligar al navegador a recargar
    icon: [
      { url: '/cumi_logo.png?v=5', href: '/cumi_logo.png?v=5' },
    ],
    // Esto ayuda a que se vea bien si alguien guarda tu página en iPhone
    apple: [
      { url: '/cumi_logo.png?v=5' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-gray-200 selection:bg-red-500 selection:text-white`}
      >
        {/* NAVBAR ELEGANTE */}
        <nav className="border-b border-white/5 p-2 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
          {/* Usamos h-14 para darle buena altura a la barra */}
          <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
            
            {/* 1. LADO IZQUIERDO (Vacío, pero necesario para empujar el logo al centro perfecto) */}
            <div className="flex-1 hidden sm:block"></div>

            {/* 2. CENTRO: TU LOGO */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
                <Image 
                  src="/cumi_logo_v2.png" 
                  alt="CUMI Logo" 
                  width={150} 
                  height={50} 
                  // h-10 asegura que mida máximo de alto eso, y w-auto ajusta el ancho proporcionalmente
                  className="h-10 w-auto object-contain" 
                  priority
                />
              </Link>
            </div>
            
            {/* 3. LADO DERECHO: LÍNEA VERTICAL + BOTÓN */}
            <div className="flex-1 flex justify-end items-center gap-5">
              
              {/* LÍNEA SEPARADORA VERTICAL ELEGANTE */}
              {/* w-px la hace de 1 pixel de ancho, bg-zinc-800 le da un gris oscuro */}
              <div className="hidden sm:block h-8 w-px bg-zinc-700"></div>

              {/* BOTÓN DE RASTREO (Se mantiene con su estilo fuego sutil) */}
              <Link 
                href="/rastreo" 
                className="text-sm font-bold text-gray-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2 rounded-full transition border border-red-500/20 hover:border-red-500/50 shadow-[0_0_10px_rgba(220,38,38,0.1)] flex items-center gap-2"
              >
                 <span className="hidden sm:inline">Rastrea mi pedido</span>
              </Link>

            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}