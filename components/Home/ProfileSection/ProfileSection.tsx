import VideoPreview from '@/components/VideoPreview/VideoPreview';
import { Stack } from '@mui/material';
import HeaderProfile from './HeaderProfile';
import React, { useEffect, useState } from 'react';
import { GetProfileUser } from '@/services/Users';
import { ModelVideo, User } from '@/models';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { GetUserLikedVideo } from '@/services/GetVideoService';
import { FollowAnUser, UnFollowAnUser } from '@/services';

export interface ProfileSectionProps {
    profile: User;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
    const dataUser = useAppSelector((state: RootState) => state.user.data);
    const token = useAppSelector((state: RootState) => state.user.token);
    const myProfile: boolean = profile.id === dataUser.id;

    const pageNumber = useAppSelector<number>((state: RootState) => state.page.pageNumber);

    const [dataProfile, setDataProfile] = useState<User>(profile);
    const [videoLiked, setVideoLiked] = useState<ModelVideo[]>([]);

    useEffect(() => {
        if (myProfile) {
            let getUserLikedVideo = async () => {
                let res = await GetUserLikedVideo(dataUser.id, pageNumber, token);
                setVideoLiked(res);
            };

            getUserLikedVideo();
        }
    }, [dataUser.id, pageNumber, myProfile, token]);

    let handleFollowUser = async () => {
        if (dataProfile.is_followed) {
            let res = await UnFollowAnUser(dataProfile.id, pageNumber, token);
            setDataProfile(res);
        } else {
            let res = await FollowAnUser(dataProfile.id, pageNumber, token);
            setDataProfile(res);
        }
    };

    return (
        <Stack>
            <HeaderProfile dataProfile={dataProfile} myProfile={myProfile} handleFollowUser={handleFollowUser} />
            <VideoPreview
                data={profile?.videos || []}
                videoLiked={videoLiked}
                isFollow={dataProfile.is_followed}
                follow={handleFollowUser}
            />
        </Stack>
    );
}
