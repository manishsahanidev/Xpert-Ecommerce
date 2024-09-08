import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAllProducts();
      const productList = response.productList || [];
      setTotalPages(Math.ceil(productList.length / itemsPerPage));
      setProducts(
        productList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        await ApiService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to delete product"
        );
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {error ? (
        <p className="mb-4 text-center text-sm text-red-600">{error}</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Products
          </h2>
          <button
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
            onClick={() => {
              navigate("/admin/add-product");
            }}
          >
            Add Product
          </button>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="text-lg font-medium text-gray-700">
                  {product.name}
                </span>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition duration-200"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition duration-200"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;
