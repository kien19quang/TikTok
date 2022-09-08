import axiosClient from '@/ApiClient/axiosClient';
import { ModelVideo } from '@/models/Video';

const GetVideosList = (pageNumber: number): Promise<ModelVideo[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${pageNumber}`,
                method: 'get',
            });
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
};

export { GetVideosList };
