import axios, { AxiosError } from 'axios';

import type { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://664250c33d66a67b34370073.mockapi.io/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const successCallback = (response: AxiosResponse) => response;
const errCallback = async (error: AxiosError) => {
  console.log(error.response?.status, error.response?.data);

return Promise.reject(error);
};

axiosInstance.interceptors.response.use(successCallback, errCallback);
export default axiosInstance;