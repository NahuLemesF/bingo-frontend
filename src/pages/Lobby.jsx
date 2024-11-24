import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
    const [timeLeft, setTimeLeft] = useState(30);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    navigate("/game");
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800">Esperando a otros jugadores...</h1>
            <p className="mt-4 text-lg text-gray-600">El juego comenzará en {timeLeft} segundos.</p>
        </div>
    )
}

export default Lobby