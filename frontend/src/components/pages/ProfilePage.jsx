import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserInfo(response.user);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch user info"
      );
    }
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  const handleAddressClick = () => {
    navigate(userInfo.address ? "/edit-address" : "/add-address");
  };

  const orderItemList = userInfo.orderItemList || [];
  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);

  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Welcome, {userInfo.name}
      </h2>

      {error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p>
              <strong>Name: </strong>
              {userInfo.name}
            </p>
            <p>
              <strong>Email: </strong>
              {userInfo.email}
            </p>
            <p>
              <strong>Phone Number: </strong>
              {userInfo.phoneNumber}
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-medium text-gray-700 mb-2">Address</h3>
            {userInfo.address ? (
              <div className="space-y-1">
                <p>
                  <strong>Street: </strong>
                  {userInfo.address.street}
                </p>
                <p>
                  <strong>City: </strong>
                  {userInfo.address.city}
                </p>
                <p>
                  <strong>State: </strong>
                  {userInfo.address.state}
                </p>
                <p>
                  <strong>Zip Code: </strong>
                  {userInfo.address.zipCode}
                </p>
                <p>
                  <strong>Country: </strong>
                  {userInfo.address.country}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No Address information available</p>
            )}
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200"
              onClick={handleAddressClick}
            >
              {userInfo.address ? "Edit Address" : "Add Address"}
            </button>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Order History
            </h3>
            <ul className="space-y-3">
              {paginatedOrders.map((order) => (
                <li
                  key={order.id}
                  className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                >
                  <img
                    src={order.product?.imageUrl}
                    alt={order.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <p>
                      <strong>Name: </strong>
                      {order.product.name}
                    </p>
                    <p>
                      <strong>Status: </strong>
                      {order.status}
                    </p>
                    <p>
                      <strong>Quantity: </strong>
                      {order.quantity}
                    </p>
                    <p>
                      <strong>Price: </strong>${order.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
