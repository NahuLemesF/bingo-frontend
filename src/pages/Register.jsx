import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password
      });
      console.log('Registro exitoso:', response.data);
      localStorage.setItem('token', response.data.token);

      setMessageType('success');
      setMessage('Usuario registrado exitosamente. Bienvenido al Bingo del Gran Buda!');
      setTimeout(() => {
        setMessage('');
        navigate('/lobby');
      }, 3000);

    } catch (error) {
      console.error('Error registrando usuario:', error);
      setMessageType('error');
      setMessage('Error al registrar usuario. Intentelo otra vez');
      setTimeout(() => {
        setMessage('');
      }, 3000);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      {message && (
        <div
          className={`mt-4 px-4 py-2 rounded shadow ${messageType === "success"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {message}
        </div>
      )}
      <p className="mt-4">
        ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500 hover:underline">Inicia sesión</Link>
      </p>
    </div>
  );
}


export default Register
