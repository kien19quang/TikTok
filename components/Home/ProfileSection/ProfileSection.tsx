import VideoPreview from '@/components/VideoPreview/VideoPreview';
import { Stack } from '@mui/material';
import HeaderProfile from './HeaderProfile';
import React, { useEffect, useState } from 'react';
import { GetProfileUser } from '@/services/Users';
import { User } from '@/models';

export interface ProfileSectionProps {
    profile: string;
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

export function ProfileSection({ profile }: ProfileSectionProps) {
    const [userProfile, setUserProfile] = useState<User>(initialProfile);

    useEffect(() => {
        const getProfileUser = async () => {
            let res = await GetProfileUser(profile);
            setUserProfile(res);
        };

        getProfileUser();
    }, [profile]);

    return (
        <Stack>
            <HeaderProfile dataProfile={userProfile} />
            <VideoPreview data={userProfile?.videos || []} />
        </Stack>
    );
}
