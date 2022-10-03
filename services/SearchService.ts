import axiosClient from '@/ApiClient/axiosClient';
import { ModelSearch } from '@/models';

const SearchAccount = (searchValue: string): Promise<ModelSearch[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`,
                method: 'GET',
            });
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
};

export { SearchAccount };
