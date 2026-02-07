'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient' 

export default function Home() {
  const [busqueda, setBusqueda] = useState('')
  const [pedido, setPedido] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const buscarPedido = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError(null)
    setPedido(null)

    try {
      // AQUÍ ESTÁ LA MAGIA: .eq() es "igual a"
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('codigo_rastreo', busqueda)
        .single() // Solo queremos UNO, no una lista

      if (error) throw error
      setPedido(data)
    } catch (error) {
      setError('No encontramos un pedido con ese código. Revisa que esté bien escrito.')
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* ENCABEZADO */}
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Rastreo CUMI 👕</h1>
          <p className="text-blue-100 mt-2">Ingresa tu código de seguimiento</p>
        </div>

        {/* FORMULARIO DE BÚSQUEDA */}
        <div className="p-6">
          <form onSubmit={buscarPedido} className="flex gap-2">
            <input
              type="text"
              placeholder="Ej: CUMI-TEST-01"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button 
              type="submit"
              disabled={cargando}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {cargando ? '...' : '🔍'}
            </button>
          </form>

          {/* RESULTADOS */}
          <div className="mt-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {pedido && (
              <div className="border border-green-200 bg-green-50 rounded-lg p-4 animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 font-mono">Pedido #{pedido.codigo_rastreo}</span>
                  <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded uppercase">
                    {pedido.estado}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Hola, {pedido.nombre_cliente} 👋</h3>
                <p className="text-gray-600 mt-1">{pedido.descripcion}</p>
                
                {/* BARRA DE PROGRESO VISUAL */}
                <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ 
                      width: pedido.estado === 'recibido' ? '20%' : 
                             pedido.estado === 'produccion' ? '50%' : 
                             pedido.estado === 'terminado' ? '100%' : '10%' 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">Tu pedido está en proceso</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}