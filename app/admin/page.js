'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

// Lista de estados posibles (enum)
const ESTADOS = [
  'recibido', 
  'diseno', 
  'corte_confeccion', 
  'bordado', 
  'listo_entrega', 
  'entregado'
]

export default function AdminPanel() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [pedidos, setPedidos] = useState([])
  
  // Estado para nuevo pedido
  const [nuevoCliente, setNuevoCliente] = useState('')
  const [nuevaDescripcion, setNuevaDescripcion] = useState('')

  // 1. VERIFICAR SESIÓN Y CARGAR PEDIDOS
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        fetchPedidos()
      }
    }
    checkSession()
  }, [])

  const fetchPedidos = async () => {
    // Traemos los pedidos ordenados por fecha (más reciente primero)
    let { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.log('Error cargando:', error)
    else setPedidos(data)
    setLoading(false)
  }

  // 2. CREAR NUEVO PEDIDO (Genera código CUMI-XXXX)
  const crearPedido = async (e) => {
    e.preventDefault()
    if (!nuevoCliente || !nuevaDescripcion) return

    // Generar código aleatorio simple (Ej: CUMI-4821)
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    const codigoFinal = `CUMI-${randomCode}`

    const { error } = await supabase
      .from('pedidos')
      .insert([
        { 
          codigo_rastreo: codigoFinal, 
          nombre_cliente: nuevoCliente, 
          descripcion: nuevaDescripcion,
          estado: 'recibido' // Estado inicial por defecto
        }
      ])

    if (error) {
      alert('Error creando pedido: ' + error.message)
    } else {
      // Limpiar form y recargar tabla
      setNuevoCliente('')
      setNuevaDescripcion('')
      fetchPedidos() 
    }
  }

  // 3. ACTUALIZAR ESTADO
  const actualizarEstado = async (id, nuevoEstado) => {
    const { error } = await supabase
      .from('pedidos')
      .update({ estado: nuevoEstado })
      .eq('id', id)

    if (error) {
      alert('Error actualizando: ' + error.message)
    } else {
      fetchPedidos() // Recargar para ver cambios
    }
  }

  // 4. LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="p-10 text-center">Cargando sistema...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900">Panel de Control CUMI</h1>
        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
          Cerrar Sesión
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO DE INGRESO */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded shadow sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Nuevo Pedido</h2>
            <form onSubmit={crearPedido} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded mt-1"
                  placeholder="Ej: Juan Pérez"
                  value={nuevoCliente}
                  onChange={e => setNuevoCliente(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea 
                  className="w-full border p-2 rounded mt-1"
                  placeholder="Ej: 12 Camisetas Polo con logo bordado..."
                  rows="3"
                  value={nuevaDescripcion}
                  onChange={e => setNuevaDescripcion(e.target.value)}
                />
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">
                + Crear Pedido
              </button>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: TABLA DE PEDIDOS */}
        <div className="md:col-span-2">
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Código</th>
                  <th className="p-4 font-semibold text-gray-600">Cliente / Detalle</th>
                  <th className="p-4 font-semibold text-gray-600">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50">
                    <td className="p-4 font-mono font-bold text-blue-600">
                      {pedido.codigo_rastreo}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{pedido.nombre_cliente}</div>
                      <div className="text-sm text-gray-500">{pedido.descripcion}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(pedido.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      {/* SELECTOR PARA CAMBIAR ESTADO */}
                      <select 
                        value={pedido.estado}
                        onChange={(e) => actualizarEstado(pedido.id, e.target.value)}
                        className={`border rounded p-1 text-sm font-semibold cursor-pointer
                          ${pedido.estado === 'entregado' ? 'bg-green-100 text-green-800 border-green-200' : 
                            pedido.estado === 'recibido' ? 'bg-gray-100 text-gray-800' : 
                            'bg-yellow-50 text-yellow-800 border-yellow-200'}`}
                      >
                        {ESTADOS.map(estado => (
                          <option key={estado} value={estado}>
                            {estado.replace('_', ' ').toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {pedidos.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">
                      No hay pedidos activos. ¡A vender! 🚀
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}