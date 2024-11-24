import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import io from 'socket.io-client';

let socket;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [logoutMessage, setLogoutMessage] = useState(false);

  useEffect(() => {
    if (token) {
      socket = io('http://localhost:3000');
    } else if (socket) {
      socket.disconnect();
    }
  }, [token]);

  const handleLogout = () => {
    // Mostrar mensaje de cerrando sesión
    setLogoutMessage(true);
    localStorage.removeItem('token');

    // Desconectar del WebSocket
    if (socket) {
      socket.emit('leaveLobby');
      socket.disconnect();
    }

    // Esperar 2 segundos antes de redirigir al Home
    setTimeout(() => {
      setLogoutMessage(false);
      navigate('/');
    }, 1000);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-semibold">Bingo Gran Buda</Link>
        <div>
          <Link to="/" className="text-white mr-4">Home</Link>
          <Link to="/lobby" className="text-white mr-4">Juego</Link>
          {token ? (
            <button onClick={handleLogout} className="text-white">Salir</button>
          ) : (
            <Link to="/login" className="text-white">Iniciar Sesión</Link>
          )}
        </div>
      </div>
      {logoutMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <BeatLoader color="#36a1d7" loading={true} size={15} />
            <p className="text-lg font-medium">Cerrando sesión...</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;