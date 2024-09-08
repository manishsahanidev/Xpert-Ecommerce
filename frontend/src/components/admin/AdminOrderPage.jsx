import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [searchStatus, currentPage]);

  const fetchOrders = async () => {
    try {
      let response;
      if (searchStatus) {
        response = await ApiService.getAllOrderItemsByStatus(searchStatus);
      } else {
        response = await ApiService.getAllOrders();
      }
      const orderList = response.orderItemList || [];

      setTotalPages(Math.ceil(orderList.length / itemsPerPage));
      setOrders(orderList);
      setFilteredOrders(
        orderList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch orders"
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setStatusFilter(filterValue);
    setCurrentPage(1);

    if (filterValue) {
      const filtered = orders.filter((order) => order.status === filterValue);
      setFilteredOrders(filtered.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    } else {
      setFilteredOrders(orders.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(orders.length / itemsPerPage));
    }
  };

  const handleSearchStatusChange = async (e) => {
    setSearchStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Orders
      </h2>
      {error && (
        <p className="text-center text-red-600 bg-red-100 p-2 rounded mb-4">
          {error}
        </p>
      )}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Filter By Status</label>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All</option>
            {OrderStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Search By Status</label>
          <select
            value={searchStatus}
            onChange={handleSearchStatusChange}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All</option>
            {OrderStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Ordered
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${order.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleOrderDetails(order.id)}
                  className="text-blue-600 hover:underline"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AdminOrdersPage;
