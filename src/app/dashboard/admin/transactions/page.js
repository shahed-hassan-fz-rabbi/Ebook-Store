"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllPurchases,
} from "@/services/purchase.service";

export default function TransactionsPage() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res =
      await getAllPurchases();

    setOrders(res.data);
  };

  return (
    <div className="bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Transactions
      </h1>

      <table className="table">

        <thead>

          <tr>

            <th>Buyer</th>

            <th>Writer</th>

            <th>Ebook</th>

            <th>Amount</th>

            <th>Status</th>

            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order._id}>

              <td>
                {order.buyer?.name}
              </td>

              <td>
                {order.writer?.name}
              </td>

              <td>
                {order.ebook?.title}
              </td>

              <td>
                $
                {order.price}
              </td>

              <td>

                <span className="badge badge-success">

                  {order.paymentStatus}

                </span>

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