export interface user {
    id: number;
    avatar: string;
    bio: string;
    facebook_url: string;
    first_name: string;
    followers_count: string;
    followings_count: string;
    instagram_url: string;
    is_followed: boolean;
    last_name: string;
    likes_count: number;
    nickname: string;
    tick: boolean;
    youtube_url: string;
}

export interface ModelVideo {
    id: number | string;
    description: string;
    file_url: string;
    is_liked: boolean;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    music: string;
    thumb_url: string;
    user: user;
}
