"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// COMPONENTE DE LA GALERÍA (Directo aquí para evitar errores de importación)
function CoutureGallery() {
  const [index, setIndex] = useState(0);

  // Estas fotos son de ejemplo, cámbialas luego por las de /public
  const images = [
    "/polo1.jpeg",
    "/polo2.jpeg",
    "/polo3.jpeg"
  ];

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const variants = {
    enter: { rotate: 45, opacity: 0, x: 200 },
    center: { zIndex: 1, rotate: 0, opacity: 1, x: 0 },
    exit: { 
      zIndex: 0, 
      rotate: -70, // El efecto de rotación hacia la izquierda
      opacity: 0, 
      transition: { duration: 0.4 } 
    }
  };

  return (
    <div className="relative w-full max-w-[350px] aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            rotate: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -50) nextImage();
          }}
          style={{ originX: 0, originY: 1 }} // ANCLA: Inferior Izquierda
          className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 right-4 z-10 text-white/40 text-[10px] uppercase tracking-widest font-bold">
        Swipe Izquierda ←
      </div>
    </div>
  );
}

// PÁGINA PRINCIPAL DE POLOS
export default function PolosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6 pt-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Columna Izquierda: Galería */}
        <div className="flex justify-center items-center">
          <CoutureGallery />
        </div>

        {/* Columna Derecha: Contenido */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              Polos de Calidad
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              En <span className="text-orange-500 font-bold">CUMI</span>, nuestras polos no son solo uniformes, son la imagen de tu marca. 
              Bordados de alta calidad y tallas que elevan tu presencia empresarial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-orange-500/50 transition-colors">
              <h3 className="text-orange-500 font-semibold mb-1">Corte Ergonómico</h3>
              <p className="text-sm text-zinc-400">Comodidad total para el día a día.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-red-500/50 transition-colors">
              <h3 className="text-red-500 font-semibold mb-1">Hilos Premium</h3>
              <p className="text-sm text-zinc-400">Bordados que no pierden su color.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="https://wa.me/tu-numero-aqui" 
              target="_blank"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-center transition-all rounded-full font-bold shadow-lg shadow-red-900/20 active:scale-95"
            >
              Cotizar vía WhatsApp
            </Link>
            <Link 
              href="/" 
              className="px-8 py-4 border border-white/10 hover:bg-white/5 text-center transition-all rounded-full active:scale-95"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}