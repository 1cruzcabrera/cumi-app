import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-zinc-950 text-gray-200">
      
      {/* 1. HERO SECTION: Portada Oscura */}
      <section className="relative w-full h-[600px] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.jpeg" 
            alt="Fondo CUMI" 
            fill 
            className="object-cover brightness-[0.71]" 
            priority
          />
          {/* Degradado negro suave hacia abajo */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950"></div>
        </div>

        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-2xl">
            Bienvenid@s 
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 drop-shadow-md font-light">
            Calidad, estilo y personalización garantizada.
          </p>
          
          <div className="bg-zinc-900/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl inline-block hover:border-red-500/50 transition-colors duration-500">
            <p className="text-xs uppercase tracking-[0.2em] mb-4 font-bold text-gray-300">
              ¿Ya tienes un pedido?
            </p>
            {/* BOTÓN RASTREAR */}
            <Link 
              href="/rastreo" 
              className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center gap-3 mx-auto justify-center"
            >
              Rastrear mi Pedido
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN: Servicios */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Luz ambiental roja suave detrás */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">Nuestras Especialidades</h2>
            {/* Línea divisoria roja sólida */}
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-400">Elige lo que deseas </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              img="/Po10.jpeg" 
              title="Camisas tipo Polo" 
              desc="Elegancia y resistencia. Ideales para uniformes que proyectan profesionalismo."
            />
            <ServiceCard 
              img="/camisas1.jpeg" 
              title="Solo Camisetas" 
              desc="Comodidad diaria. Algodón de alta calidad perfecto para promocionales."
            />
            <ServiceCard 
              img="/personalizacion.jpeg" 
              title="Personalización" 
              desc="Bordados, sublimación y estampados. ¡Todo lo que quieras!."
            />
          </div>
        </div>
      </section>

      {/* 3. FOOTER */}
      <footer className="bg-black text-gray-500 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-2xl font-bold text-white mb-4 tracking-tighter">CUMI</h4>
            <p className="text-sm opacity-80 leading-relaxed">
              Transformamos tela en identidad desde Santa Ana para todo El Salvador.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 justify-center md:justify-start transition cursor-pointer">
                <span className="text-red-500">📧</span> cumionline.sv@gmail.com
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start transition cursor-pointer">
                <span className="text-red-500">📍</span> Santa Ana, El Salvador
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center">
             {/* BOTÓN WHATSAPP */}
             <a 
              href="https://wa.me/50370176195" 
              target="_blank"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full transition shadow-lg hover:shadow-green-900/50 flex items-center gap-2 group transform hover:-translate-y-1"
            >
              Cotizar en WhatsApp
            </a>
            <p className="text-xs mt-8 opacity-40">
              © {new Date().getFullYear()} CUMI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// COMPONENTE DE TARJETAS (CORREGIDO A FORMATO VERTICAL 3:4 IDEAL PARA ROPA)
function ServiceCard({ img, title, desc }: { img: string, title: string, desc: string }) {
  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col">
      
      {/* CAMBIO 1: aspect-[3/4] 
         Hacemos la tarjeta VERTICAL (más alta que ancha) para que quepa la camiseta.
      */}
      <div className="aspect-[3/4] w-full relative overflow-hidden bg-zinc-800">
        <Image 
          src={img} 
          alt={title} 
          fill 
          /* CAMBIO 2: object-top
             Alineamos la foto ARRIBA. Así nunca corta el cuello/logo, 
             si sobra espacio, cortará de la cintura para abajo.
          */
          className="object-cover object-top group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
        />
        
        {/* Degradado ROJO intenso desde abajo */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">{title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed text-sm flex-1">
          {desc}
        </p>
        
        <div className="mt-auto">
          <span className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-lg transition-colors cursor-pointer shadow-md">
            Ver Más →
          </span>
        </div>
      </div>
    </div>
  )
}