import axiosClient from '@/ApiClient/axiosClient';
import { User } from '@/models';
import { Account } from '@/models/Account';

const GetSuggestedUsers = (pageNumber: number, per_page: number, token?: string): Promise<Account[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/users/suggested?page=${pageNumber}&per_page=${per_page}`,
                method: 'get',
                headers: {
                    Authorization: token ? 'Bearer  ' + token : '',
                    'Content-Type': 'application/json',
                },
            });
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
};

const GetProfileUser = (profile: string): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/users/${profile}`,
                method: 'get',
            });
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
};

export { GetSuggestedUsers, GetProfileUser };
