import { User } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface user {
    data: User;
    token: string;
    isLoggedIn: boolean;
}

const initialProfile = {
    id: 0,
    avatar: '',
    bio: '',
    facebook_url: '',
    youtube_url: '',
    instagram_url: '',
    first_name: '',
    last_name: '',
    followers_count: 0,
    followings_count: 0,
    likes_count: 0,
    is_followed: false,
    nickname: '',
    tick: false,
};

let initialState: user = {
    data: initialProfile,
    token: '',
    isLoggedIn: false,
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setIsLoggedIn: (state: user, action: PayloadAction<boolean>) => {
            return { ...state, isLoggedIn: action.payload };
        },
        setData: (state: user, action: PayloadAction<User>) => {
            return { ...state, data: action.payload };
        },
        setToken: (state: user, action: PayloadAction<string>) => {
            return { ...state, token: action.payload };
        },
    },
});

export const { setIsLoggedIn, setData, setToken } = UserSlice.actions;

export default UserSlice.reducer;
