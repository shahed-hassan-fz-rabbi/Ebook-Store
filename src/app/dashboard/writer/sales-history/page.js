"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function SalesHistoryPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const res = await axiosInstance.get("/purchases/writer");

      setSales(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <h2>Loading...</h2>;

  return (
    <div className="bg-white rounded-xl p-8 shadow">

      <h1 className="text-3xl font-bold mb-8">
        Sales History
      </h1>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Buyer</th>
              <th>Price</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {sales.map((sale, index) => (

              <tr key={sale._id}>

                <td>{index + 1}</td>

                <td>{sale.ebook?.title}</td>

                <td>{sale.user?.name}</td>

                <td>${sale.amount}</td>

                <td>
                  {new Date(
                    sale.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}