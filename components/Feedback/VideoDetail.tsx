import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { Feedback, ModelVideo } from '@/models';
import { getCommentsAVideo } from '@/services/Feedback';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Input, Modal, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import HeroPreview from '../Home/HeroSection/HeroPreview';
import { CommentIcon, MusicIcon, ShareIcon, TymIcon } from '../Icons';
import Comment from './Comment';

export interface VideoDetailProps {
    isOpen: boolean;
    close: () => void;
    data: ModelVideo;
}

const style = {
    position: 'relative',
    width: '100%',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    height: '100%',
    outline: 'none',
};

const styledCount = {
    fontSize: '14px',
    lineHeight: '18px',
    color: 'rgba(22, 24, 35, 0.75)',
    textAlign: 'center',
    fontWeight: 'bold',
};

export default function VideoDetail({ isOpen, close, data }: VideoDetailProps) {
    const [listComments, setListComments] = useState<Feedback[]>([]);

    const videoRef = useRef<HTMLVideoElement>();
    const pageNumber = useAppSelector<number>((state: RootState) => state.page.pageNumber);
    const token = useAppSelector<string>((state: RootState) => state.user.token);

    useEffect(() => {
        let getComments = async () => {
            let res = await getCommentsAVideo(data.id, pageNumber, token);
            setListComments(res);
        };
        getComments();
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, [videoRef.current]);

    const fullname = `${data.user.first_name} ${data.user.last_name}`;
    let handleNumberFarorites = (number: number): string => {
        let n = number / 1000;
        if (n < 1) {
            return number.toString();
        }
        let view = n.toFixed(1);
        return view + 'K';
    };

    let handleClose = () => {
        close();
    };

    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box sx={style}>
                <Stack direction="row">
                    <Stack
                        width="62%"
                        sx={{
                            backgroundColor: 'black',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '10%',
                                height: '10%',
                                filter: 'blur(2px)',
                                left: '50%',
                                top: '50%',
                                transform: 'scale(11)',
                                opacity: '0.3',
                                background: `url(${data.thumb_url}) center center / cover no-repeat`,
                            }}
                        ></Box>

                        <Box position="relative" width="100%" height="100%" sx={{ cursor: 'pointer' }}>
                            <Stack alignItems="center" justifyContent="center" width="100%">
                                <Box
                                    component="video"
                                    controls
                                    sx={{
                                        objectFit: 'contain',
                                        overflow: 'hidden',
                                        height: '100vh',
                                        width: '100%',
                                    }}
                                    ref={videoRef}
                                    src={data.file_url}
                                />
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack width="38%" pt="32px" height="100vh">
                        <Stack
                            direction="row"
                            alignItems="center"
                            padding="22px 32px 15px"
                            sx={{ cursor: 'pointer' }}
                            justifyContent="space-between"
                        >
                            <HeroPreview nickname={data.user.nickname} bio={data.user.bio} user={data.user}>
                                <Stack direction="row" alignItems="center">
                                    <Link href="/@pro" passHref>
                                        <Box width="40px" height="40px" mr="12px">
                                            <Image
                                                src={data.user.avatar}
                                                alt="avatar"
                                                className="avatar"
                                                width="40px"
                                                height="40px"
                                                objectFit="cover"
                                            />
                                        </Box>
                                    </Link>
                                    <Link href="/@pro" passHref>
                                        <Box
                                            textOverflow="ellipsis"
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            mr="12px"
                                            color="rgb(22, 24, 35)"
                                            component="div"
                                            flexGrow={1}
                                        >
                                            <Typography
                                                fontWeight="bold"
                                                fontSize="18px"
                                                sx={{
                                                    '&:hover': {
                                                        textDecoration: 'underline',
                                                    },
                                                }}
                                            >
                                                {data.user.nickname}
                                            </Typography>
                                            <Typography fontSize="14px">{fullname}</Typography>
                                        </Box>
                                    </Link>
                                </Stack>
                            </HeroPreview>

                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    minHeight: '28px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                Follow
                            </Button>
                        </Stack>

                        <Box px="32px" component="div" margin="10px 0 16px">
                            <Typography mb="20px" ml="2px">
                                {data.description}
                            </Typography>

                            <Link href="/music" passHref>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    component="a"
                                    spacing={1}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <MusicIcon />
                                    <Typography component="h4" variant="body1" fontWeight="bold">
                                        {data.music}
                                    </Typography>
                                </Stack>
                            </Link>

                            <Box padding="16px 0">
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={4}
                                        sx={{
                                            button: {
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '34px',
                                                height: '34px',
                                                padding: '6px',
                                                borderRadius: '50%',
                                                mr: '6px',
                                                backgroundColor: 'rgba(22, 24, 35, 0.06)',
                                                border: 'none',
                                                cursor: 'pointer',
                                            },
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Stack spacing={0.5} direction="row" alignItems="center">
                                            <Box component="button">
                                                <TymIcon />
                                            </Box>
                                            <Typography sx={styledCount}>
                                                {handleNumberFarorites(data.likes_count)}
                                            </Typography>
                                        </Stack>

                                        <Stack spacing={0.5} direction="row" alignItems="center">
                                            <Box component="button">
                                                <CommentIcon />
                                            </Box>
                                            <Typography sx={styledCount}>
                                                {handleNumberFarorites(data.comments_count)}
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack direction="row" alignItems="center">
                                        <ShareIcon />
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>

                        <Stack
                            flexGrow={1}
                            sx={{
                                padding: '24px 32px',
                                backgroundColor: 'rgb(248,248,248)',
                                borderTop: '1px solid rgb(22, 24, 35, 0.2)',
                                borderBottom: '1px solid rgb(22, 24, 35, 0.2)',
                                overflow: 'hidden auto',
                            }}
                        >
                            {listComments.map((item) => (
                                <Comment key={item.id} data={item} />
                            ))}
                        </Stack>

                        <Stack height="82px" padding="21px 30px" direction="row" alignItems="center" spacing={1}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                flexGrow={1}
                                padding="0 9px"
                                height="100%"
                                bgcolor="rgba(22, 24, 35, 0.06)"
                                borderRadius="8px"
                                border="1.5px solid transparent"
                                sx={{
                                    '&:focus-within': {
                                        borderColor: 'rgba(22, 24, 35, 0.2)',
                                    },
                                }}
                            >
                                <Input
                                    placeholder="Add comment..."
                                    spellCheck="false"
                                    disableUnderline
                                    sx={{
                                        backgroundColor: 'transparent',
                                        height: '100%',
                                        outline: 'none',
                                        fontSize: '14px',
                                        caretColor: '#fe2c55',
                                    }}
                                    fullWidth
                                />
                            </Stack>

                            <Button
                                variant="text"
                                sx={{
                                    fontSize: '14px',
                                    textTransform: 'none',
                                }}
                            >
                                Post
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 255, 255, 0.12)',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        top: '20px',
                        left: '20px',
                        transition: 'opacity 0.3s ease 0s',

                        '&:hover': {
                            opacity: '0.7',
                        },
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon sx={{ width: '28px', height: '28px', color: 'white' }} />
                </Box>
            </Box>
        </Modal>
    );
}
