import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username,
        email,
        password
      });
      console.log('Registro exitoso:', response.data);
      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);
      // Redirigir al usuario a la página de inicio
      navigate('/login');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      // Manejar el error, como mostrar un mensaje de error al usuario
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Registro</h1>
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-500"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-500"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4">
        ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500 hover:underline">Inicia sesión</Link>
      </p>
    </div>
  );
}


export default Register
