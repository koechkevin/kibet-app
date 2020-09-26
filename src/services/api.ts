import axios from 'axios';

const authToken = () => localStorage.getItem('token');
const instance = () => axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  headers: {
    Authorization: authToken && `Bearer ${authToken()}`,
  },
});

export default instance;
