import { User } from './User';

export interface Feedback {
    id: number;
    is_liked: boolean;
    comment: string;
    likes_count: number;
    created_at: string;
    updated_at: string;
    user: User;
}
