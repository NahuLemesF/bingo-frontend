import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState(""); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setModalMessage("Iniciando sesión...");
      setIsModalVisible(true);

      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      console.log("Inicio de sesión exitoso:", response.data);

      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        setIsModalVisible(false); 
        navigate("/lobby"); 
      }, 1000); 

    } catch (error) {
      console.error("Error iniciando sesión:", error.response?.data || error.message);

      setIsModalVisible(false);
      setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");

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
            placeholder="example@email.com"
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

      {/* Modal con BeatLoader */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <BeatLoader color="#36a1d7" loading={true} size={15} />
            <p className="text-lg font-medium">{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
