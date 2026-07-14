import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const createEmployee = (data) =>
  axios.post(`${BASE_URL}/createemployee`, data);
export const getEmployees = () => axios.get(`${BASE_URL}/getallemployees`);

export const updateEmployee = (id, data) =>
  axios.put(`${BASE_URL}/updateemployee/${id}`, data);
export const deleteEmployee = (id) =>
  axios.delete(`${BASE_URL}/deleteemployee/${id}`);
