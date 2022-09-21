import axiosClient from '@/ApiClient/axiosClient';
import { Account, User } from '@/models';
import { resolve } from 'path';

const GetFollowingsList = (pageNumber: number, token: string): Promise<Account[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/me/followings?page=${pageNumber}`,
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

const FollowAnUser = (userId: number, pageNumber: number, token: string): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/users/${pageNumber}/follow`,
                method: 'POST',
                data: { id: userId },
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

const UnFollowAnUser = (userId: number, pageNumber: number, token: string): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: `https://tiktok.fullstack.edu.vn/api/users/${pageNumber}/unfollow`,
                method: 'POST',
                data: { id: userId },
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

export { GetFollowingsList, FollowAnUser, UnFollowAnUser };
