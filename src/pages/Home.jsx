import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
            <h1 className="text-4xl font-bold text-gray-800">Bienvenido al Bingo del Gran Buda!</h1>
            <p className="mt-4 text-lg text-gray-600">
                Inicia sesión para comenzar a jugar.
            </p>
            <Link
                to="/login"
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Iniciar sesión
            </Link>
        </div>)
}

export default Home
