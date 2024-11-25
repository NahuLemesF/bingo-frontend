import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Lobby = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('waiting');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username') || 'Jugador';

    socket.emit('joinLobby', { username });

    socket.on('updatePlayers', (players) => {
      setPlayers(players);
    });

    socket.on('countdown', (time) => {
      setTimeLeft(time);
    });

    socket.on('gameState', (state) => {
      setGameState(state);
    });

    socket.on('startGame', (players) => {
      setPlayers(players);
      navigate('/game');
    });

    socket.on('timeout', () => {
      navigate('/timeout');
    });

    return () => {
      socket.off('updatePlayers');
      socket.off('countdown');
      socket.off('gameState');
      socket.off('startGame');
      socket.off('timeout');
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Esperando a otros jugadores...</h1>
      {gameState === 'countdown' && (
        <p className="mt-4 text-lg text-gray-600">El juego comenzará en {timeLeft} segundos.</p>
      )}
      <p className="mt-4 text-lg text-gray-600">Jugadores conectados: {players.length}</p>
    </div>
  );
};

export default Lobby;