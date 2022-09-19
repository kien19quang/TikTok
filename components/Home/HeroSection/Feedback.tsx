import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import VideoDetail from '@/components/Feedback/VideoDetail';
import { CommentIcon, ShareIcon, TymIcon, TymIconActive } from '@/components/Icons';
import { ModelVideo } from '@/models';
import { LikeAVideo, UnLikeAVideo } from '@/services/Feedback';
import { Box, Stack, Typography } from '@mui/material';
import { MutableRefObject, useState } from 'react';

export interface FeedBackProps {
    data: ModelVideo;
    videoRef: MutableRefObject<HTMLVideoElement | undefined>;
}

const styledCount = {
    fontSize: '12px',
    lineHeight: '18px',
    color: 'rgba(22, 24, 35, 0.75)',
    textAlign: 'center',
    fontWeight: 'bold',
};

export default function FeedBack({ data, videoRef }: FeedBackProps) {
    const [isLiked, setIsLiked] = useState<boolean>(data.is_liked);
    const [feedBack, setFeedBack] = useState<ModelVideo>(data);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const token = useAppSelector<string>((state: RootState) => state.user.token);
    const pageNumber = useAppSelector<number>((state: RootState) => state.page.pageNumber);

    let handleNumberFarorites = (number: number): string => {
        let n = number / 1000;
        if (n < 1) {
            return number.toString();
        }
        let view = n.toFixed(1);
        return view + 'K';
    };

    let handleFeedback = async (type: string) => {
        if (type === 'like') {
            if (isLiked) {
                setIsLiked(false);
                let res = await UnLikeAVideo(feedBack.id, pageNumber, token);
                setFeedBack(res);
            } else {
                setIsLiked(true);
                let res = await LikeAVideo(feedBack.id, pageNumber, token);
                setFeedBack(res);
            }
        }
        if (type === 'comment') {
            videoRef.current?.pause();
            setIsOpen(true);
        }
    };

    let handleClose = () => {
        videoRef.current?.play();
        setIsOpen(false);
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
                    <Typography sx={styledCount}>{handleNumberFarorites(feedBack.likes_count)}</Typography>
                </Stack>

                <Stack spacing={1}>
                    <Box component="button" onClick={() => handleFeedback('comment')}>
                        <CommentIcon />
                    </Box>
                    <Typography sx={styledCount}>{handleNumberFarorites(feedBack.comments_count)}</Typography>
                </Stack>

                <Stack spacing={1}>
                    <Box component="button">
                        <ShareIcon />
                    </Box>
                    <Typography sx={styledCount}>{handleNumberFarorites(feedBack.shares_count)}</Typography>
                </Stack>
            </Stack>
            {isOpen && <VideoDetail isOpen={isOpen} close={handleClose} data={data} />}
        </>
    );
}
