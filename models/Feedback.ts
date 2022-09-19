import { User } from './User';

export interface Feedback {
    id: number;
    comment: string;
    likes_count: number;
    created_at: string;
    updated_at: string;
    user: User;
}
