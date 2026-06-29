import axiosInstance from "@/lib/axios";

export const getAllEbooks = async () => {
  const res = await axiosInstance.get("/ebooks");

  return res.data;
};

export const getSingleEbook = async (id) => {
  const res = await axiosInstance.get(`/ebooks/${id}`);

  return res.data;
};

export const createEbook = async (data) => {
  const res = await axiosInstance.post(
    "/ebooks",
    data
  );

  return res.data;
};

export const updateEbook = async (
  id,
  data
) => {
  const res = await axiosInstance.patch(
    `/ebooks/${id}`,
    data
  );

  return res.data;
};

export const deleteEbook = async (id) => {
  const res = await axiosInstance.delete(
    `/ebooks/${id}`
  );

  return res.data;
};