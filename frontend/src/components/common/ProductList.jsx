import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = ({ products }) => {
  const { cart, dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product, index) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3 h-16">
                  {product.description}
                </p>
              </div>
            </Link>
            <div className="p-4 flex flex-col items-center">
              <span className="text-primary font-bold text-lg mb-4">
                ${product.price.toFixed(2)}
              </span>
              {cartItem ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decrementItem(product)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-semibold text-gray-700">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => incrementItem(product)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
