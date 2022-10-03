import axiosClient from '@/ApiClient/axiosClient';
import { Feedback, ModelVideo } from '@/models';

const LikeAVideo = (id: number, pageNumber: number, token: string): Promise<ModelVideo> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/videos/${pageNumber}/like`,
                method: 'POST',
                data: { id: id.toString() },
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
                data: { id: id.toString() },
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

const likeAComment = (id: number, pageNumber: number, token: string): Promise<Feedback> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/comments/${pageNumber}/like`,
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

const unlikeAComment = (id: number, pageNumber: number, token: string): Promise<Feedback> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/comments/${pageNumber}/unlike`,
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

const createANewComment = (uuid: string, token: string, data: any): Promise<Feedback> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/videos/${uuid}/comments`,
                method: 'POST',
                data,
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

const deleteAComment = (id: number, pageNumber: number, token: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/comments/${pageNumber}?id=${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (e) {
            reject(e);
        }
    });
};

export { LikeAVideo, UnLikeAVideo, likeAComment, unlikeAComment, getCommentsAVideo, createANewComment, deleteAComment };
