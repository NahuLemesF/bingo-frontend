import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between">
      <Link to="/" className="text-white text-lg font-semibold">Bingo Gran Buda</Link>
      <div>
        <Link to="/" className="text-white mr-4">Home</Link>
        <Link to="/game" className="text-white mr-4">Juego</Link>
        <Link to="/login" className="text-white">Iniciar Sesión</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
