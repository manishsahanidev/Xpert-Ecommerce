import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await ApiService.getProductById(productId);
      setProduct(response.product);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  const incrementItem = () => {
    if (product) {
      dispatch({ type: "INCREMENT_ITEM", payload: product });
    }
  };

  const decrementItem = () => {
    if (product) {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem && cartItem.quantity > 1) {
        dispatch({ type: "DECREMENT_ITEM", payload: product });
      } else {
        dispatch({ type: "REMOVE_ITEM", payload: product });
      }
    }
  };

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading product details ...
      </p>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-md md:w-1/2">
        <img
          src={product?.imageUrl}
          alt={product?.name}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="md:ml-10 mt-6 md:mt-0 flex flex-col items-start">
        <h1 className="text-3xl font-semibold text-gray-800">
          {product?.name}
        </h1>
        <p className="mt-4 text-gray-600">{product?.description}</p>
        <span className="mt-4 text-2xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>

        {cartItem ? (
          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={decrementItem}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none transition"
            >
              -
            </button>
            <span className="text-xl">{cartItem.quantity}</span>
            <button
              onClick={incrementItem}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none transition"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={addToCart}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
