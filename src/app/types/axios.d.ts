import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    next?: NextFetchRequestConfig;
  }
}