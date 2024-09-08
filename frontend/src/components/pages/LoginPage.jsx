import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.loginUser(formData);
      if (response.status === 200) {
        setMessage("User Successfully Logged in");
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        setTimeout(() => {
          navigate("/profile");
        }, 4000);
      }
    } catch (error) {
      setMessage(
        error.response?.data.message || error.message || "Unable to log in"
      );
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-50">
      <div className="bg-white p-10 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl">
          Welcome to <span className="font-bold">Xpert Ecommerce</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Please log in to access your account.
        </p>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          <div className="relative">
            <label className="block text-gray-700 mb-2 text-sm">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-2 text-sm">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 mt-6 text-center">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
