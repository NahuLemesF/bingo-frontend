import { useNavigate } from 'react-router-dom';

const Timeout = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/lobby');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Nadie se ha conectado, se acabó el tiempo de espera.</h1>
      <button
        onClick={handleRetry}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Intentar otra vez
      </button>
    </div>
  );
};

export default Timeout;