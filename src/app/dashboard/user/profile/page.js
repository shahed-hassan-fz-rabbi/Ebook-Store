"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <div className="space-y-5">

        <div>
          <p className="text-gray-500">Name</p>
          <h2 className="text-xl font-semibold">
            {user.name}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <h2>{user.email}</h2>
        </div>

        <div>
          <p className="text-gray-500">Role</p>
          <h2 className="capitalize">
            {user.role}
          </h2>
        </div>

      </div>

    </div>
  );
}