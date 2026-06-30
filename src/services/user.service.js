import axiosInstance from "@/lib/axios";

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const blockUser = async (id) => {
  const res = await axiosInstance.patch(
    `/users/${id}/block`
  );
  return res.data;
};

export const unblockUser = async (id) => {
  const res = await axiosInstance.patch(
    `/users/${id}/unblock`
  );
  return res.data;
};

export const changeRole = async (
  id,
  role
) => {
  const res = await axiosInstance.patch(
    `/users/${id}/role`,
    { role }
  );

  return res.data;
};

export const getReaderDashboard = async () => {
  const res = await axiosInstance.get("/users/dashboard");
  return res.data;
};