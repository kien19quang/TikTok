import axiosClient from '@/ApiClient/axiosClient';
import { Feedback, ModelVideo } from '@/models';

const LikeAVideo = (id: number, pageNumber: number, token: string): Promise<ModelVideo> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/videos/${pageNumber}/like`,
                method: 'POST',
                data: { id: id },
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

const UnLikeAVideo = (id: number, pageNumber: number, token: string): Promise<ModelVideo> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/videos/${pageNumber}/unlike`,
                method: 'POST',
                data: { id: id },
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

const getCommentsAVideo = (id: number, pageNumber: number, token: string): Promise<Feedback[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/videos/${pageNumber}/comments?id=${id}`,
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

export { LikeAVideo, UnLikeAVideo, getCommentsAVideo };
