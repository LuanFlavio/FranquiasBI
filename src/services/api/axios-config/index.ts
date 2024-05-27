import axios from 'axios';
import { Environment } from 'src/configs/environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

export const API = axios.create({
    baseURL: Environment.URL_BASE,
});

API.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
)
