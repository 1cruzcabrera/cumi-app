'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Image from 'next/image' // IMPORTANTE: Importamos Image

export default function RastreoPage() {
  const [codigo, setCodigo] = useState('')
  const [pedido, setPedido] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const buscarPedido = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setPedido(null)

    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq('codigo_rastreo', codigo.trim())
      .single()

    if (error || !data) {
      setErrorMsg('No encontramos ese código. Verifica (Ej: CUMI-XXXX)')
    } else {
      setPedido(data)
    }
    setLoading(false)
  }

  // Lógica Visual
  const pasos = ['recibido', 'diseno', 'corte_confeccion', 'bordado', 'listo_entrega', 'entregado']
  const etiquetas = ['Recibido', 'Diseno', 'Corte', 'Bordado', 'Listo', 'Entregado']
  
  const getProgreso = (estadoActual) => {
    const index = pasos.indexOf(estadoActual)
    if (index === -1) return 0
    return Math.round(((index + 1) / pasos.length) * 100)
  }

  return (
    // CAMBIO 1: Contenedor relativo para que la imagen de fondo se posicione bien
    <div className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4 text-gray-200 overflow-hidden">
      
      {/* --- IMAGEN DE FONDO --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/fachada.jpeg"  // Usamos la misma imagen del Home para continuidad
          alt="Fondo Rastreo CUMI" 
          fill 
          // brightness-[0.25] la hace muy oscura, casi negra, para que resalte el contenido
          className="object-cover brightness-[0.45]" 
          priority
        />
        {/* Capa extra de oscurecimiento rojizo sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-red-900/10"></div>
      </div>


      {/* --- CONTENIDO (Con z-10 para que esté encima de la imagen) --- */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        
        <div className="w-full mb-8">
          <Link href="/" className="text-gray-400 hover:text-orange-500 flex items-center gap-2 transition font-bold text-sm uppercase tracking-wide">
            ← Volver al Inicio
          </Link>
        </div>

        {/* TARJETA PRINCIPAL CON EFECTO VIDRIO AHUMADO */}
        {/* bg-zinc-900/80 le da transparencia y backdrop-blur-md hace el efecto borroso */}
        <div className="bg-zinc-900/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl w-full relative overflow-hidden">
          
          {/* Detalle decorativo superior de fuego */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"></div>

          <h1 className="text-3xl font-black text-center text-white mb-2 drop-shadow-lg">Rastrear Pedido</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Ingresa tu código para ver el estado en tiempo real.
          </p>

          <form onSubmit={buscarPedido} className="flex gap-3 mb-8">
            <input
              type="text"
              placeholder="CUMI-XXXX"
              // Input un poco más oscuro para contraste
              className="flex-1 bg-black/50 border border-zinc-700 text-white rounded-xl p-4 text-center uppercase tracking-widest font-bold focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition placeholder:text-zinc-600"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            />
            <button 
              disabled={loading}
              // Botón rojo fuego
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white px-6 rounded-xl font-bold transition disabled:opacity-50 shadow-lg shadow-red-900/30"
            >
              {loading ? '...' : '🔍'}
            </button>
          </form>

          {errorMsg && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-xl text-sm text-center mb-6 animate-pulse">
              ⚠️ {errorMsg}
            </div>
          )}

          {pedido && (
            <div className="animate-fade-in-up">
              <div className="border-t border-white/10 pt-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-xl text-white">{pedido.nombre_cliente}</h3>
                    <p className="text-sm text-gray-400 mt-1">{pedido.descripcion}</p>
                  </div>
                  <span className="text-xs bg-black/30 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full font-mono font-bold tracking-wider">
                    {pedido.codigo_rastreo}
                  </span>
                </div>

                <div className="relative pt-2">
                  <div className="flex mb-3 items-center justify-between">
                    <span className="text-xs font-bold inline-block py-1 px-3 uppercase rounded-full text-orange-100 bg-orange-900/40 border border-orange-500/30">
                      {etiquetas[pasos.indexOf(pedido.estado)] || pedido.estado}
                    </span>
                    <span className="text-xs font-bold text-orange-400">
                      {getProgreso(pedido.estado)}%
                    </span>
                  </div>
                  
                  {/* RIEL DE FONDO */}
                  <div className="overflow-hidden h-4 mb-6 text-xs flex rounded-full bg-black/50 border border-white/10">
                    {/* BARRA DE PROGRESO DE FUEGO (Rojo -> Amarillo) */}
                    <div 
                      style={{ width: `${getProgreso(pedido.estado)}%` }}
                      className="shadow-[0_0_20px_rgba(234,88,12,0.8)] flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-1000 ease-out"
                    ></div>
                  </div>
                  
                  {pedido.estado === 'listo_entrega' && (
                    <div className="bg-green-900/30 border border-green-500/50 text-green-400 p-4 rounded-xl text-center text-sm font-bold mt-4 animate-bounce">
                      🎉 ¡Tu pedido está listo!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}