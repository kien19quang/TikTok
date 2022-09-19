import axiosClient from '@/ApiClient/axiosClient';
import { Auth } from '@/models';

const Register = (data: Auth): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: 'https://tiktok.fullstack.edu.vn/api/auth/register',
                method: 'POST',
                data,
            });
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
};

const Login = (data: Auth): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosClient({
                url: 'https://tiktok.fullstack.edu.vn/api/auth/login',
                method: 'POST',
                data,
            });
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
};

export { Register, Login };
