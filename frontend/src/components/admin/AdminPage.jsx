import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Welcome, Admin
      </h1>
      <div className="space-y-4">
        <button
          onClick={() => navigate("/admin/categories")}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Manage Categories
        </button>
        <button
          onClick={() => navigate("/admin/products")}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-200"
        >
          Manage Products
        </button>
        <button
          onClick={() => navigate("/admin/orders")}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-200"
        >
          Manage Orders
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
