import { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (error) {
      console.log("Error fetching category list", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      try {
        await ApiService.deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.log("Error deleting category by id", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        <button
          onClick={() => navigate("/admin/add-category")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Add Category
        </button>
      </div>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <span className="text-gray-800 font-medium">{category.name}</span>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
                onClick={() => handleEdit(category.id)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-200"
                onClick={() => handleDelete(category.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategoryPage;
