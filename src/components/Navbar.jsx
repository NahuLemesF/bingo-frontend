import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [logoutMessage, setLogoutMessage] = useState(false);

  const handleLogout = () => {
    // Mostrar mensaje de cerrando sesión
    setLogoutMessage(true);
    localStorage.removeItem('token');
    
    // Esperar 2 segundos antes de redirigir al Home
    setTimeout(() => {
      setLogoutMessage(false);
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-semibold">Bingo Gran Buda</Link>
          <div className="flex items-center">
            <Link to="/" className="text-white mr-4">Home</Link>
            <Link to="/lobby" className="text-white mr-4">Juego</Link>
            {token ? (
              <button onClick={handleLogout} className="text-white">Salir</button>
            ) : (
              <Link to="/login" className="text-white">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mostrar mensaje modal en el centro del body */}
      {logoutMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-blue-100 p-6 rounded shadow-md text-center">
            <p className="text-lg font-semibold text-blue-700">Cerrando sesión...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
