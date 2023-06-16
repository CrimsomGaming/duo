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

    
       if(isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueued.push({
              onSuccess: () => { 
                originalRequestConfig.headers.Authorization = ''
                resolve(serverSideApi(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                
                reject(error)
              },
            })
          })
        }

        isRefreshing = true

         return new Promise(async (resolve, reject) => {
          try {

            if(originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            originalRequestConfig.headers.Authorization = '';
            serverSideApi.defaults.headers.common.Authorization = '';

            failedQueued.forEach(request => {
              request.onSuccess();
            });
           

            resolve(serverSideApi(originalRequestConfig));
          } catch (error: any) {
            console.log(error)
            failedQueued.forEach(request => {
              request.onFailure(error);
          })
            reject(error);
          } finally {
           
            isRefreshing = false;
            failedQueued = []
           
          }
        })

      }

    
    return Promise.reject(requestError);
  }
);