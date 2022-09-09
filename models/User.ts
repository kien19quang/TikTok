import { ModelVideo } from './Video';

export interface User {
    id: number;
    avatar: string;
    bio: string;
    facebook_url: string;
    first_name: string;
    followers_count: number;
    followings_count: number;
    instagram_url: string;
    is_followed: boolean;
    last_name: string;
    likes_count: number;
    nickname: string;
    tick: boolean;
    youtube_url: string;
    videos?: ModelVideo[];
}
