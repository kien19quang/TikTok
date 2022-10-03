import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ModelVideo } from '@/models';
import VideoDetail from '../Feedback/VideoDetail';
import { LikeAVideo, UnLikeAVideo } from '@/services/Feedback';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { Authen } from '../Auth';

export interface VideoPreviewDetailProps {
    data: ModelVideo;
    isFollow: boolean;
    follow: () => void;
}

export default function VideoPreviewDetail({ data, isFollow, follow }: VideoPreviewDetailProps) {
    const [isOpenVideoDetail, setIsOpenVideoDetail] = useState<boolean>(false);
    const [isOpenModalAuth, setIsOpenModalAuth] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(data.is_liked);
    const [dataPreview, setDataPreview] = useState<ModelVideo>(data);

    const pageNumber = useAppSelector<number>((state: RootState) => state.page.pageNumber);
    const token = useAppSelector<string>((state: RootState) => state.user.token);
    const isLoggedIn = useAppSelector<boolean>((state: RootState) => state.user.isLoggedIn);

    const handleHover = (e: React.MouseEvent<HTMLVideoElement>): void => {
        (e.target as HTMLVideoElement).play();
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLVideoElement>): void => {
        (e.target as HTMLVideoElement).pause();
    };

    let handleLikeVideo = async () => {
        setIsLiked(true);
        let res = await LikeAVideo(data.id, pageNumber, token);
        setDataPreview(res);
    };

    let handleUnLikeVideo = async () => {
        setIsLiked(false);
        let res = await UnLikeAVideo(data.id, pageNumber, token);
        setDataPreview(res);
    };

    let handleClose = (): void => {
        setIsOpenVideoDetail(false);
    };

    let handleShowVideoDetail = () => {
        if (isLoggedIn) {
            setIsOpenVideoDetail(true);
        } else {
            setIsOpenModalAuth(true);
        }
    };

    let handleAuthClose = async () => {
        setIsOpenModalAuth(false);
    };

    return (
        <>
            <Box component="div" onClick={handleShowVideoDetail}>
                <Box
                    width="100%"
                    height="250px"
                    borderRadius="4px"
                    component="video"
                    onMouseOver={handleHover}
                    onMouseOut={handleMouseOut}
                    sx={{ objectFit: 'cover' }}
                    src={data.file_url}
                ></Box>

                <Typography
                    mt="4px"
                    color="rgba(22, 24, 35)"
                    padding="2px 4px 0"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                >
                    {data.description}
                </Typography>
            </Box>

            {isOpenVideoDetail && (
                <VideoDetail
                    isOpen={isOpenVideoDetail}
                    close={handleClose}
                    data={dataPreview}
                    isLiked={isLiked}
                    LikeVideo={handleLikeVideo}
                    UnlikeVideo={handleUnLikeVideo}
                    isFollow={isFollow}
                    follow={follow}
                />
            )}

            {isOpenModalAuth && <Authen isOpen={isOpenModalAuth} close={handleAuthClose} />}
        </>
    );
}
