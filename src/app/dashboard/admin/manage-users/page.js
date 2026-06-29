"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getAllUsers,
  blockUser,
  unblockUser,
  changeRole,
} from "@/services/user.service";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getAllUsers();

    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleBlock = async (id) => {
    await blockUser(id);

    toast.success("Blocked");

    loadUsers();
  };

  const handleUnblock = async (id) => {
    await unblockUser(id);

    toast.success("Unblocked");

    loadUsers();
  };

  const handleRole = async (
    id,
    role
  ) => {
    await changeRole(id, role);

    toast.success("Role Updated");

    loadUsers();
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow">

      <h1 className="text-3xl font-bold mb-8">
        Manage Users
      </h1>

      <table className="table">

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>

                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRole(
                      user._id,
                      e.target.value
                    )
                  }
                >

                  <option value="reader">
                    Reader
                  </option>

                  <option value="writer">
                    Writer
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </td>

              <td>

                {user.isBlocked
                  ? "Blocked"
                  : "Active"}

              </td>

              <td>

                {user.isBlocked ? (
                  <button
                    onClick={() =>
                      handleUnblock(
                        user._id
                      )
                    }
                    className="btn btn-success btn-sm"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleBlock(
                        user._id
                      )
                    }
                    className="btn btn-error btn-sm"
                  >
                    Block
                  </button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}