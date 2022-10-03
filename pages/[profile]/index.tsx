import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { ProfileSection } from '@/components/Home/ProfileSection';
import { MainLayout } from '@/layouts';
import { User } from '@/models';
import { GetProfileUser } from '@/services';
import { Box } from '@mui/material';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export interface ProfileProps {}

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

export default function Profile(props: ProfileProps) {
    const router = useRouter();
    const profile: string = router.query?.profile ? `${router.query.profile}` : '';
    const token = useAppSelector<string>((state: RootState) => state.user.token);

    const [userProfile, setUserProfile] = useState<User>(initialProfile);

    useEffect(() => {
        const getProfileUser = async () => {
            let res = await GetProfileUser(profile, token);
            setUserProfile(res);
        };

        getProfileUser();
    }, [profile, token]);

    if (profile[0] !== '@' && profile !== '') {
        return null;
    }

    return <Box>{userProfile.id !== 0 && <ProfileSection profile={userProfile} />}</Box>;
}

Profile.Layout = MainLayout;
