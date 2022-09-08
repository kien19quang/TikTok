import axiosClient from '@/ApiClient/axiosClient';
import { Account } from '@/models/Account';

const GetSuggestedUsers = (pageNumber: number, per_page: number): Promise<Account[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/users/suggested?page=${pageNumber}&per_page=${per_page}`,
                method: 'get',
            });
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
};

export { GetSuggestedUsers };
