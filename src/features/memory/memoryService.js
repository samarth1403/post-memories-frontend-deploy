import { base_url } from "../../utils/base_url";
import axios from "axios";
import { toast } from "react-toastify";

const createAMemory = async (data) => {
  const response = await axios.post(`${base_url}/memory/create`, data?.body, {
    headers: {
      Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
      Accept: "application/json",
    },
  });
    if (response.data?.res?.unauthorized === true) {
      return false;
    } else {
      return response.data;
    }
};

const getAllMemories = async () => {
  const response = await axios.get(`${base_url}/memory/all-memories`);
    if (response.data?.res?.unauthorized === true) {
      toast.error("Session Expired , Please Login Again");
      return false;
    } else {
      return response.data;
    }
};

const getMemory = async (data) => {
  const response = await axios.get(`${base_url}/memory/get/${data?.id}`, {
    headers: {
      Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
      Accept: "application/json",
    },
  });
  console.log(response.data)
  return response.data;
};

const updateMemory = async (data) => {
  const response = await axios.put(
    `${base_url}/memory/update/${data.id}`,
    {
      title: data?.body?.title,
      description: data?.body?.description,
      tags: data?.body?.tags,
      date: data?.body?.date,
      image: data?.body?.image
    },
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const deleteMemory = async (data) => {
  const response = await axios.delete(
    `${base_url}/memory/delete/${data?.id}`,
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const uploadImage = async (data) => {
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dkddmjgqj/image/upload",
    data
  );
  if(response.data){
    return { public_id :response?.data?.public_id, url : response?.data?.secure_url }
  }
}

const deleteUploadedImage = async(data) => {
  const response = await axios.delete(
    `${base_url}/memory/delete-uploaded-image/${data?.id}`,
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
}



const memoryService = {
  createAMemory,
  getAllMemories,
  getMemory,
  updateMemory,
  deleteMemory,
  uploadImage,
  deleteUploadedImage,
};

export default memoryService;