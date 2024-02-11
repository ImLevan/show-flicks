function NotFound() { // como lanzar un 404 a nivel servidor? Buscar. Ahora solo lanza uno por pantalla.
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-red-600 text-4xl font-bold">404 NotFound</h1>
      </div>
    )
  }
  
  export default NotFound