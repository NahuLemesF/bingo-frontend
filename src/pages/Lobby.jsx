import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling'] // Forzar orden de transportes
});

const Lobby = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('waiting');
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username') || 'Jugador';

    // Manejar conexión inicial
    if (!socket.connected) {
      console.log('Intentando conectar...');
      socket.connect();
    }

    socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
      setGameState('error');
    });

    socket.on('connect', () => {
      console.log('Conectado al servidor');
      setConnected(true);
      setGameState('waiting');
      // Emitir joinLobby solo después de conectar
      socket.emit('joinLobby', { username });
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      setConnected(false);
      setGameState('disconnected');
    });

    socket.on('updatePlayers', (updatedPlayers) => {
      console.log('Jugadores actualizados:', updatedPlayers);
      setPlayers(updatedPlayers);
    });

    socket.on('countdown', (time) => {
      console.log('Tiempo actualizado:', time);
      setTimeLeft(time);
    });

    socket.on('gameState', (state) => {
      console.log('Estado del juego:', state);
      setGameState(state);
      if (state === 'in-progress') {
        navigate('/game');
      }
    });

    socket.on('timeout', () => {
      console.log('Timeout recibido');
      socket.emit('leaveLobby');
      navigate('/timeout');
    });

    return () => {
      console.log('Limpiando conexión...');
      if (socket.connected) {
        socket.emit('leaveLobby');
        socket.disconnect();
      }
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('updatePlayers');
      socket.off('countdown');
      socket.off('gameState');
      socket.off('timeout');
    };
  }, [navigate]);

  // Renderizado con estado de conexión
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">
        {!connected ? 'Conectando al servidor...' :
         gameState === 'waiting' ? 'Esperando jugadores...' :
         gameState === 'error' ? 'Error de conexión' :
         'Preparando juego...'}
      </h1>
      {connected && (
        <>
          <p className="mt-4 text-lg text-gray-600">
            Tiempo restante: {timeLeft} segundos
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Jugadores conectados: {players.length}
          </p>
        </>
      )}
      {gameState === 'error' && (
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Reintentar conexión
        </button>
      )}
    </div>
  );
};

export default Lobby;