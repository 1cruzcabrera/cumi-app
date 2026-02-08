"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Estas son fotos de prueba, luego las cambias por las tuyas en /public
const images = [
  "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000", 
  "https://images.unsplash.com/photo-1598533161400-697bd66f973c?q=80&w=1000",
];

export default function CoutureGallery() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = Math.abs(page % images.length);

  const variants = {
    enter: (direction: number) => ({
      rotate: 45,
      opacity: 0,
      x: 300,
    }),
    center: {
      zIndex: 1,
      rotate: 0,
      opacity: 1,
      x: 0,
    },
    exit: {
      zIndex: 0,
      rotate: -60, // Rotación hacia la izquierda
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="relative w-full max-w-[350px] aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            rotate: { duration: 0.4 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            if (offset.x < -50) paginate(1);
            else if (offset.x > 50) paginate(-1);
          }}
          style={{ originX: 0, originY: 1 }} // ANCLA: Abajo a la izquierda (hilo y aguja)
          className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
        />
      </AnimatePresence>
      
      <div className="absolute bottom-4 right-4 z-10 text-white/50 text-xs font-light">
        Swipe para ver más →
      </div>
    </div>
  );
}