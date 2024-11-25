import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Login from './pages/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Lobby from './pages/Lobby';
import PrivateRoute from './components/PrivateRoute';
import Timeout from './pages/Timeout';

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lobby" element={<PrivateRoute><Lobby /></PrivateRoute>} />
        <Route path="/timeout" element={<Timeout />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
