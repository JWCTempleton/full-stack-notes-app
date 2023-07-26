import axios from "axios";
const baseUrl = `/api/users`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllUserNotes = async (user) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/${user.user_id}`, config);
  return response.data.data;
};

export const userService = {
  setToken,
  getAllUserNotes,
};
