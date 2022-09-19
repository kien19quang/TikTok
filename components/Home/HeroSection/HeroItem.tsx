import { MusicIcon } from '@/components/Icons';
import { ModelVideo } from '@/models/Video';
import { Box, Button, Link as MuiLink, Stack, Typography, CardMedia } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import FeedBack from './Feedback';
import HeroPreview from './HeroPreview';

export interface HeroItemProps {
    data: ModelVideo;
}

function HeroItem({ data }: HeroItemProps) {
    const videoRef = useRef<HTMLVideoElement>();

    const { ref, inView } = useInView({
        threshold: 0.7,
        trackVisibility: true,
        delay: 800,
    });

    useEffect(() => {
        if (inView && videoRef.current) {
            videoRef.current.play();
        }
        if (!inView && videoRef.current) {
            videoRef.current.pause();
        }
    }, [inView]);

    return (
        <Stack direction="row" py="20px" alignItems="flex-start" component="div">
            <Box width="56px" height="56px">
                <Image
                    src={data.user.avatar || data.file_url}
                    alt="avatar"
                    width="56px"
                    height="56px"
                    className="avatar"
                />
            </Box>
            <Stack justifyContent="flex-start" flexGrow="1" ml="12px">
                <Stack flex="1" direction="row" justifyContent="space-between">
                    <Stack width="510px">
                        <Stack direction="row" alignItems="center">
                            <Link href={`/@${data.user.nickname}`} passHref>
                                <MuiLink
                                    sx={{
                                        marginRight: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <HeroPreview
                                        nickname={data.user.nickname}
                                        bio={data.user.bio}
                                        offset={[-70, 35]}
                                        user={data.user}
                                    >
                                        <Typography
                                            component="h3"
                                            variant="body1"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                lineHeight: '25px',
                                            }}
                                        >
                                            {data.user.nickname}
                                        </Typography>
                                    </HeroPreview>
                                </MuiLink>
                            </Link>
                            <Typography
                                fontSize="14px"
                                lineHeight="25px"
                                component="h4"
                                variant="body1"
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            >
                                {data.user.bio}
                            </Typography>
                        </Stack>

                        <Stack direction="row" flexWrap="wrap" pt="6px">
                            <Typography> {data.description} </Typography>
                        </Stack>

                        <Link href="/music">
                            <MuiLink
                                sx={{
                                    display: 'flex',
                                    lineHeight: '24px',
                                    mt: '8px',
                                    mb: '12px',
                                }}
                            >
                                <MusicIcon />
                                <Typography fontWeight="600" pl="6px" mt="-4px" sx={{ cursor: 'pointer' }}>
                                    {data.music}
                                </Typography>
                            </MuiLink>
                        </Link>
                    </Stack>

                    <Button
                        variant="outlined"
                        sx={{
                            height: '28px',
                            minWidth: '88px',
                            textTransform: 'none',
                            fontWeight: '500',
                            fontSize: '16px',
                        }}
                    >
                        Follow
                    </Button>
                </Stack>
                <Stack direction="row" alignItems="flex-end" ref={ref}>
                    <Box position="relative">
                        <Stack
                            component="video"
                            src={data.file_url}
                            height="calc(450px + (100vw - 768px) / 1152 * 100)"
                            borderRadius="8px"
                            overflow="hidden"
                            mr="20px"
                            ref={videoRef}
                            controls
                            sx={{
                                cursor: 'pointer',
                                maxWidth: '520px',
                                objectFit: 'contain',
                                backgroundColor: 'rgba(22, 24, 35, 0.06)',
                            }}
                        ></Stack>
                    </Box>

                    <FeedBack data={data} videoRef={videoRef} />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default HeroItem;
