import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!ApiService.isAuthenticated()) {
      setMessage("You need to login first before you can place an order");
      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 3000);
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderRequest = {
      totalPrice,
      items: orderItems,
    };

    try {
      const response = await ApiService.createOrder(orderRequest);
      setMessage(response.message);

      setTimeout(() => {
        setMessage("");
      }, 5000);

      if (response.status === 200) {
        dispatch({ type: "CLEAR_CART" });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to place an order"
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Your Cart
      </h1>
      {message && (
        <p className="bg-red-100 text-red-800 py-2 px-4 rounded mb-4 text-center">
          {message}
        </p>
      )}

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="flex py-4 items-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-500">{item.description}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decrementItem(item)}
                      className="px-2 py-1 text-gray-700 border border-gray-300 rounded-l hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementItem(item)}
                      className="px-2 py-1 text-gray-700 border border-gray-300 rounded-r hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-800 mt-2 block">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
