import { Permission } from '@/app/types/permission';
import goveApi from './goveApi';

export const permissionService = {
  getAll: async (
    next?: NextFetchRequestConfig,
  ): Promise<Permission[]> => {
    const { data } = await goveApi.get('/permissions', {
      next
    });

    return data;
  },
};