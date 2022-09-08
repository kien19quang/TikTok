export interface Account {
    id: number | string;
    avatar: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
    first_name: string;
    last_name: string;
    nickname: string;
    followers_count: number;
    followings_count: number;
    likes_count: number;
    is_followed: boolean;
    tick: boolean;
}
