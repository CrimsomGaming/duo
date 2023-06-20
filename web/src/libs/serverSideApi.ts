import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";

type PromiseType = {
  onSuccess: () => void;
  onFailure: (error: AxiosError) => void;
}

let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;

export const serverSideApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
}) 

serverSideApi.interceptors.request.use((request) => {
  const token = cookies().get('token')?.value
  if (!token) {
    return request;
  }
  const tokenDecoded = jwtDecode(token)
  if(!tokenDecoded){
    return request
  }
  
  serverSideApi.defaults.headers.common.Authorization = `Bearer ${token}`;

  return request
});

serverSideApi.interceptors.response.use(
  response => response,
  async (requestError: AxiosError) => {
    if (requestError.response?.status === 401) {
        const originalRequestConfig = requestError.config as InternalAxiosRequestConfig;
        originalRequestConfig.headers.Authorization = ''
        serverSideApi(originalRequestConfig)

      }

    
    return Promise.reject(requestError);
  }
);