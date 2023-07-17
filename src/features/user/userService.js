import {base_url} from "../../utils/base_url";
import axios from "axios";
import { toast } from "react-toastify";

const registerUser = async(userData) => {
  const response = await axios.post(`${base_url}/user/register-user`,userData);
  return response.data;
}

const loginUser = async (data) => {
  const response = await axios.post(`${base_url}/user/login-user`, data);
  return response.data;
};

const getUser = async (data) => {
  const response = await axios.get(`${base_url}/user/get`, {
    headers: {
      Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
      Accept: "application/json",
    },
  });
  if (
    response.data?.res?.unauthorized === true &&
    response.data?.res?.success === false && data?.Token !== undefined
  ) {
    toast.error("Session Expired , Please Login Again");
    return false;
  } else {
    return response.data;
  }
}

const updateUserProfile = async (data) => {
  const response = await axios.put(
    `${base_url}/user/update-user-profile`,
    data?.body,
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
    if (
      response.data?.res?.unauthorized === true &&
      response.data?.res?.success === false
    ) {
      toast.error("Session Expired , Please Login Again");
      return false;
    } else {
      return response.data;
    }
};

const userService = {
  registerUser,
  loginUser,
  getUser,
  updateUserProfile,
};

export default userService;