import { User } from './User';

export interface ModelVideo {
    id: number;
    description: string;
    file_url: string;
    is_liked: boolean;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    music: string;
    thumb_url: string;
    user: User;
    viewable?: string;
    views_count?: number;
}
