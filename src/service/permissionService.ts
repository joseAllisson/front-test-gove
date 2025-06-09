import { Permission } from '@/types/permission';
import goveApi from './goveApi';
import { AxiosRequestConfig } from 'axios';

export const permissionService = {
  getAll: async (
    config?: AxiosRequestConfig,
  ): Promise<Permission[]> => {
    const { data } = await goveApi.get('/permissions', config);

    return data;
  },
};