import axios from "axios";
const baseUrl = `/api/userCheck`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const checkUser = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    console.log("ERROR RESPONSE");
  }
};

export const userCheck = { checkUser, setToken };
