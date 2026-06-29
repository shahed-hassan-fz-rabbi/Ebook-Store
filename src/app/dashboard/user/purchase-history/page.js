"use client";

import { useEffect, useState } from "react";

import {
  getPurchaseHistory,
} from "@/services/purchase.service";

export default function PurchaseHistoryPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    load();

  }, []);

  const load = async () => {

    const res =
      await getPurchaseHistory();

    setOrders(res.data || []);

  };

  return (
    <div className="bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Purchase History
      </h1>

      <table className="table">

        <thead>

          <tr>

            <th>Book</th>

            <th>Price</th>

            <th>Status</th>

            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order._id}>

              <td>
                {order.ebook?.title}
              </td>

              <td>
                ${order.price}
              </td>

              <td>
                {order.paymentStatus}
              </td>

              <td>
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}