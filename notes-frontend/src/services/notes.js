import axios from "axios";
const baseUrl = `/api/notes`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data.data;
};

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${newObject.note_id}`,
    newObject,
    config
  );
  return response.data.data;
};

const remove = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(
    `${baseUrl}/${newObject.note_id}`,
    config
  );
  return response.data.data;
};

export const noteService = {
  getAll,
  create,
  update,
  remove,
  setToken,
};
