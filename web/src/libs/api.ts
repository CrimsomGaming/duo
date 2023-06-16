import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie'

interface refreshTokenResponse {
    refresh: string,
    access: string
}

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}


let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;



export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000
})

api.interceptors.request.use(request => {
    const token = Cookies.get('token')
    if(token){
        request.headers.Authorization  = `Bearer ${token}`

    }
    return Promise.resolve(request)
})



api.interceptors.response.use(
  response => response,
  async (requestError: AxiosError) => {
    if (requestError.response?.status === 401) {
      
      const refresh_token  = Cookies.get('refresh-token');

        if(!refresh_token) {
            Cookies.remove('token')
        
            return Promise.reject(requestError)
            
        }
        
        const originalRequestConfig = requestError.config as InternalAxiosRequestConfig;

       if(isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueued.push({
              onSuccess: (token: string) => { 
                originalRequestConfig.headers.Authorization = `Bearer ${token}`
                resolve(api(originalRequestConfig));
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
            const { data } = await api.post<refreshTokenResponse>('/auth/refresh',{
                refresh: refresh_token
            });

            Cookies.set('token', data.access)
            Cookies.set('refresh-token', data.refresh)
            

            if(originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            originalRequestConfig.headers.Authorization = `Bearer ${data.access}` 
            api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

            failedQueued.forEach(request => {
              request.onSuccess(data.access);
            });

            

            resolve(api(originalRequestConfig));
          } catch (error: any) {
            console.log(error)
            failedQueued.forEach(request => {
              request.onFailure(error);
            })

             Cookies.remove('token')
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