import axios from "axios";

const url = "http://localhost:3001/api/persons";

const getAll = () => {
  const req = axios.get(url);
  return req.then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`);
};

const addPerson = (person) => {
  const req = axios.post(url, person);
  return req.then((res) => res.data);
};

const editPerson = (person) => {
  return axios.put(`${url}/${person.id}`, person);
};

const funcs = { getAll, deletePerson, addPerson, editPerson };

export default funcs;
