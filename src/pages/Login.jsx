import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
      <form className="mt-6 w-full max-w-sm bg-white p-6 rounded shadow-md">
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-4">
        ¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:underline">Regístrate</Link>
      </p>
    </div>
  );
}

export default Login;
