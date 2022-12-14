import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { Authen } from '@/components/Auth';
import VideoDetail from '@/components/Feedback/VideoDetail';
import { CommentIcon, ShareIcon, TymIcon, TymIconActive } from '@/components/Icons';
import { ModelVideo } from '@/models';
import { LikeAVideo, UnLikeAVideo } from '@/services/Feedback';
import { Box, Stack, Typography } from '@mui/material';
import { MutableRefObject, useState } from 'react';

export interface FeedBackProps {
    data: ModelVideo;
    videoRef: MutableRefObject<HTMLVideoElement | undefined>;
    isFollow: boolean;
    follow: () => void;
}

const styledCount = {
    fontSize: '12px',
    lineHeight: '18px',
    color: 'rgba(22, 24, 35, 0.75)',
    textAlign: 'center',
    fontWeight: 'bold',
};

export default function FeedBack({ data, videoRef, isFollow, follow }: FeedBackProps) {
    const [isLiked, setIsLiked] = useState<boolean>(data.is_liked);
    const [feedBack, setFeedBack] = useState<ModelVideo>(data);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [commentsCount, setCommentsCount] = useState<number>(data.comments_count);
    const [isOpenAuth, setIsOpenAuth] = useState<boolean>(false);

    const token = useAppSelector<string>((state: RootState) => state.user.token);
    const pageNumber = useAppSelector<number>((state: RootState) => state.page.pageNumber);
    const isLoggedIn = useAppSelector<boolean>((state: RootState) => state.user.isLoggedIn);

    let handleNumberFarorites = (number: number): string => {
        let n = number / 1000;
        if (n < 1) {
            return number.toString();
        }
        let view = n.toFixed(1);
        return view + 'K';
    };

    let handleUnlikeVideo = async () => {
        setIsLiked(false);
        let res = await UnLikeAVideo(data.id, pageNumber, token);
        setFeedBack(res);
    };

    let handleLikeVideo = async () => {
        setIsLiked(true);
        let res = await LikeAVideo(data.id, pageNumber, token);
        setFeedBack(res);
    };

    let handleCommentCount = (amount: number): void => {
        setCommentsCount(amount);
    };

    let handleFeedback = async (type: string) => {
        if (type === 'like') {
            if (isLoggedIn) {
                if (isLiked) {
                    handleUnlikeVideo();
                } else {
                    handleLikeVideo();
                }
            } else {
                setIsOpenAuth(true);
            }
        }
        if (type === 'comment') {
            if (!isLoggedIn) {
                setIsOpenAuth(true);
            } else {
                videoRef.current?.pause();
                setIsOpen(true);
            }
        }
    };

    let handleClose = () => {
        videoRef.current?.play();
        setIsOpen(false);
    };

    let handleCloseModalAuth = () => {
        setIsOpenAuth(false);
        if (isLoggedIn) {
            videoRef.current?.pause();
            setIsOpen(true);
        }
    };

    return (
        <>
            <Stack
                spacing={2}
                sx={{
                    button: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none',
                        border: 'none',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        padding: '0',
                        backgroundColor: 'rgba(22, 24, 35, 0.06)',
                        cursor: 'pointer',

                        '&:hover': {
                            backgroundColor: '#1618231a',
                        },
                    },
                }}
            >
                <Stack spacing={1}>
                    <Box component="button" onClick={() => handleFeedback('like')}>
                        {isLiked ? <TymIconActive /> : <TymIcon />}
                    </Box>
                    <Typography sx={styledCount}>{feedBack.likes_count}</Typography>
                </Stack>

                <Stack spacing={1}>
                    <Box component="button" onClick={() => handleFeedback('comment')}>
                        <CommentIcon />
                    </Box>
                    <Typography sx={styledCount}>{handleNumberFarorites(commentsCount)}</Typography>
                </Stack>

                <Stack spacing={1}>
                    <Box component="button">
                        <ShareIcon />
                    </Box>
                    <Typography sx={styledCount}>{handleNumberFarorites(feedBack.shares_count)}</Typography>
                </Stack>
            </Stack>
            {isOpen && (
                <VideoDetail
                    isOpen={isOpen}
                    close={handleClose}
                    data={feedBack}
                    LikeVideo={handleLikeVideo}
                    UnlikeVideo={handleUnlikeVideo}
                    isLiked={isLiked}
                    commentsCount={handleCommentCount}
                    isFollow={isFollow}
                    follow={follow}
                />
            )}
            {isOpenAuth && <Authen isOpen={isOpenAuth} close={handleCloseModalAuth} />}
        </>
    );
}
