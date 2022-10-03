import axiosClient from '@/ApiClient/axiosClient';
import { ModelVideo } from '@/models/Video';

const GetVideosList = (pageNumber: number, token?: string): Promise<ModelVideo[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${pageNumber}`,
                method: 'GET',
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

const GetUserVideos = (userId: number, pageNumber: number): Promise<ModelVideo[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/users/${pageNumber}/videos?id=${userId}`,
                method: 'GET',
            });
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
};

const GetUserLikedVideo = (id: number, pageNumber: number, token: string): Promise<ModelVideo[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/users/${pageNumber}/liked-videos?id=${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
};

export { GetVideosList, GetUserVideos, GetUserLikedVideo };
