import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Game = () => {
  const [bingoCard, setBingoCard] = useState(null);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Solicitar el tarjetón al backend
    const fetchBingoCard = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/game/bingo-card');
        setBingoCard(response.data);
      } catch (error) {
        console.error('Error fetching bingo card:', error);
      }
    };

    fetchBingoCard();

    // Configurar el socket para recibir los números llamados
    socket.on('ballDrawn', ({ ballNumber }) => {
      setCalledNumbers((prevNumbers) => [...prevNumbers, ballNumber]);
    });

    // Recibir la tarjeta de bingo asignada
    socket.on('gameCard', (card) => {
      setBingoCard(card);
    });

    // Recibir mensaje de bingo
    socket.on('bingoResult', (result) => {
      if (result.winner) {
        setMessage(`¡${result.winner} ha ganado con un ${result.winnerType}!`);
      } else {
        setMessage('¡Bingo incorrecto! Has sido descalificado.');
      }
    });

    return () => {
      socket.off('ballDrawn');
      socket.off('gameCard');
      socket.off('bingoResult');
    };
  }, []);

  const handleNumberClick = (number) => {
    if (calledNumbers.includes(number)) {
      setMarkedNumbers((prevNumbers) => [...prevNumbers, number]);
    }
  };

  const handleBingo = () => {
    socket.emit('callBingo', { card: bingoCard });
  };

  if (!bingoCard) {
    return <div>Cargando tarjetón...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Juego de Bingo</h1>
      <div className="grid grid-cols-5 gap-4 mt-6">
        {Object.entries(bingoCard).map(([letter, numbers]) => (
          <div key={letter} className="flex flex-col items-center">
            <h2 className="text-xl font-bold">{letter}</h2>
            {numbers.map((number, index) => (
              <button
                key={index}
                onClick={() => handleNumberClick(number)}
                className={`w-12 h-12 m-1 flex items-center justify-center border rounded ${
                  markedNumbers.includes(number) ? 'bg-green-500 text-white' : 'bg-white'
                }`}
              >
                {number === 'FREE' ? <img src="/path/to/image.png" alt="Free" /> : number}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={handleBingo}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        ¡Bingo!
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Game;