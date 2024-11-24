import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const [isModalVisible, setIsModalVisible] = useState(false); // Mostrar/ocultar modal
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error en caso de fallo
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Mostrar el modal mientras se procesa
      setModalMessage("Iniciando sesión...");
      setIsModalVisible(true);

      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      console.log("Inicio de sesión exitoso:", response.data);

      // Guardar el token en localStorage
      localStorage.setItem("token", response.data.token);

      // Mantener el modal visible durante 2 segundos
      setTimeout(() => {
        setIsModalVisible(false); // Ocultar el modal
        navigate("/lobby"); // Redirigir al lobby
      }, 2000);  // 2 segundos

    } catch (error) {
      console.error("Error iniciando sesión:", error.response?.data || error.message);

      // Mostrar mensaje de error
      setIsModalVisible(false);
      setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");

      // Limpiar mensaje de error después de 3 segundos
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6 w-full max-w-sm bg-white p-6 rounded shadow-md"
      >
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
          Iniciar Sesión
        </button>
      </form>

      {/* Mensaje de error en caso de credenciales incorrectas */}
      {errorMessage && (
        <div className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded shadow">
          {errorMessage}
        </div>
      )}

      <p className="mt-4">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Regístrate
        </Link>
      </p>

      {/* Modal superpuesto */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-blue-100 p-6 rounded shadow-md text-center">
            <p className="text-lg font-semibold text-blue-700">{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
