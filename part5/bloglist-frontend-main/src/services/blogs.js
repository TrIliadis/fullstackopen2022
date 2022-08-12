import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (blogInfo) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.post(baseUrl, blogInfo, config);
};

const exportObj = { getAll, createBlog, setToken };

export default exportObj;

