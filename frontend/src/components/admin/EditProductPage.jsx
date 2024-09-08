import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditProductPage = () => {
  const { productId } = useParams();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));

    if (productId) {
      ApiService.getProductById(productId).then((response) => {
        setName(response.product.name);
        setDescription(response.product.description);
        setPrice(response.product.price);
        setCategoryId(response.product.categoryId);
        setImageUrl(response.product.imageUrl);
      });
    }
  }, [productId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("productId", productId);
      formData.append("categoryId", categoryId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      const response = await ApiService.updateProduct(formData);
      if (response.status === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/products");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to update product"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Edit Product
        </h2>
        {message && (
          <div className="text-center mb-4 text-sm text-green-600">
            {message}
          </div>
        )}
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-32 h-32 object-cover rounded mt-2 mx-auto"
          />
        )}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
