import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemList);
    } catch (error) {
      console.error(error.message || error);
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderitemStatus(
        orderItemId,
        selectedStatus[orderItemId]
      );
      setMessage("Order item status was successfully updated");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to update order item status"
      );
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-white bg-blue-600 rounded-md shadow-lg z-50">
          {message}
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Order Details
      </h2>
      {orderItems.length ? (
        orderItems.map((orderItem) => (
          <div
            key={orderItem.id}
            className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Order Information
              </h3>
              <p>
                <strong>Order Item ID:</strong> {orderItem.id}
              </p>
              <p>
                <strong>Quantity:</strong> {orderItem.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> ${orderItem.price.toFixed(2)}
              </p>
              <p>
                <strong>Order Status:</strong> {orderItem.status}
              </p>
              <p>
                <strong>Date Ordered:</strong>{" "}
                {new Date(orderItem.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                User Information
              </h3>
              <p>
                <strong>Name:</strong> {orderItem.user.name}
              </p>
              <p>
                <strong>Email:</strong> {orderItem.user.email}
              </p>
              <p>
                <strong>Phone:</strong> {orderItem.user.phoneNumber}
              </p>
              <p>
                <strong>Role:</strong> {orderItem.user.role}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Delivery Address
              </h3>
              <p>
                <strong>Country:</strong> {orderItem.user.address?.country}
              </p>
              <p>
                <strong>State:</strong> {orderItem.user.address?.state}
              </p>
              <p>
                <strong>City:</strong> {orderItem.user.address?.city}
              </p>
              <p>
                <strong>Street:</strong> {orderItem.user.address?.street}
              </p>
              <p>
                <strong>Zip Code:</strong> {orderItem.user.address?.zipcode}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Product Information
              </h3>
              <img
                src={orderItem.product.imageUrl}
                alt={orderItem.product.name}
                className="w-32 h-32 object-cover mb-4"
              />
              <p>
                <strong>Name:</strong> {orderItem.product.name}
              </p>
              <p>
                <strong>Description:</strong> {orderItem.product.description}
              </p>
              <p>
                <strong>Price:</strong> ${orderItem.product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col flex-grow">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Change Status
                </h4>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                  value={selectedStatus[orderItem.id] || orderItem.status}
                  onChange={(e) =>
                    handleStatusChange(orderItem.id, e.target.value)
                  }
                >
                  {OrderStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="px-4 py-2 mt-9 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring"
                onClick={() => handleSubmitStatusChange(orderItem.id)}
              >
                Update Status
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Loading order details...</p>
      )}
    </div>
  );
};

export default AdminOrderDetailsPage;
