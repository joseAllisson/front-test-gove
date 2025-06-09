import { ApiResponse } from '@/app/types/global';
import { User, UserFormValues } from '@/app/types/user';
import goveApi from './goveApi';

export const userService = {
  getUsersList: async (
    page = 1,
    perPage = 10,
    orderBy = 'name',
    order = 'asc',
    next?: NextFetchRequestConfig,
  ): Promise<ApiResponse<User[]>> => {
    const { data } = await goveApi.get('/users', {
      params: {
        page,
        per_page: perPage,
        order_by: orderBy,
        order
      },
      next
    });

    return data;
  },

  getUserById: async (userId: number, next?: NextFetchRequestConfig): Promise<User> => {
    const { data } = await goveApi.get(`/users/${userId}`, {
      next
    });
    return data;
  },

  createUser: async (userData: UserFormValues): Promise<User> => {
    const response = await goveApi.post('/users', userData);
    return response?.data;
  },

  updateUser: async (userId: number, userData: UserFormValues): Promise<User> => {
    const { data } = await goveApi.put(`/users/${userId}`, userData);
    return data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await goveApi.delete(`/users/${userId}`);
  }
};