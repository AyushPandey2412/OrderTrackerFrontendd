


import React, { useEffect, useState } from "react";
import axios from "axios";
const url ="https://ordertrackerbackend-1hho.onrender.com"
export default function OrdersKPI() {
  const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    shippedOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${url}/orders/dashboard`);
        setDashboard(res.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="text-center py-4">Loading dashboard...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white shadow rounded p-4 text-center">
        <h2 className="text-sm font-medium text-gray-500">Total Orders</h2>
        <p className="text-2xl font-bold">{dashboard.totalOrders}</p>
      </div>

      <div className="bg-white shadow rounded p-4 text-center">
        <h2 className="text-sm font-medium text-gray-500">Pending Orders</h2>
        <p className="text-2xl font-bold">{dashboard.pendingOrders}</p>
      </div>

      <div className="bg-white shadow rounded p-4 text-center">
        <h2 className="text-sm font-medium text-gray-500">Shipped Orders</h2>
        <p className="text-2xl font-bold">{dashboard.shippedOrders}</p>
      </div>

      <div className="bg-white shadow rounded p-4 text-center">
        <h2 className="text-sm font-medium text-gray-500">Delivered Orders</h2>
        <p className="text-2xl font-bold">{dashboard.deliveredOrders}</p>
      </div>
    </div>
  );
}
