import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { MusicIcon } from '@/components/Icons';
import { ModelVideo } from '@/models/Video';
import { FollowAnUser, UnFollowAnUser } from '@/services';
import { Box, Button, Link as MuiLink, Stack, Typography, CardMedia } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import FeedBack from './Feedback';
import HeroPreview from './HeroPreview';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Authen } from '@/components/Auth';

export interface HeroItemProps {
    data: ModelVideo;
}

function HeroItem({ data }: HeroItemProps) {
    const videoRef = useRef<HTMLVideoElement>();
    const pageNumber = useAppSelector<number>((state: RootState) => state.page.pageNumber);
    const token = useAppSelector<string>((state: RootState) => state.user.token);
    const isLoggedIn = useAppSelector<boolean>((state: RootState) => state.user.isLoggedIn);
    const router = useRouter();

    const [isFollowed, setIsFollowed] = useState<boolean>(data.user.is_followed);
    const [isOpenModalAuth, setIsOpenModalAuth] = useState<boolean>(false);
    const [dataItem, setDataItem] = useState<ModelVideo>(data);

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

    let handleFollow = async () => {
        if (isLoggedIn) {
            if (isFollowed) {
                setIsFollowed(false);
                let res = await UnFollowAnUser(dataItem.user.id, pageNumber, token);
                let copyDataItem: ModelVideo = { ...dataItem };
                copyDataItem = { ...copyDataItem, user: { ...res } };
                setDataItem(copyDataItem);
            } else {
                setIsFollowed(true);
                let res = await FollowAnUser(dataItem.user.id, pageNumber, token);
                let copyDataItem: ModelVideo = { ...dataItem };
                copyDataItem = { ...copyDataItem, user: { ...res } };
                setDataItem(copyDataItem);
            }
        } else {
            setIsOpenModalAuth(true);
        }
    };

    let handleAuthClose = async () => {
        setIsOpenModalAuth(false);
    };

    let handleArriveProfile = () => {
        router.push(`/@${dataItem.user.nickname}`);
    };

    return (
        <>
            <Stack direction="row" py="20px" alignItems="flex-start" component="div">
                <Box width="56px" height="56px">
                    <Image
                        src={dataItem.user.avatar || dataItem.file_url}
                        alt="avatar"
                        width="56px"
                        height="56px"
                        className="avatar"
                        objectFit="cover"
                    />
                </Box>
                <Stack justifyContent="flex-start" flexGrow="1" ml="12px">
                    <Stack flex="1" direction="row" justifyContent="space-between">
                        <Stack width="510px">
                            <Stack direction="row" alignItems="center">
                                <HeroPreview
                                    nickname={dataItem.user.nickname}
                                    bio={dataItem.user.bio}
                                    offset={[-70, 35]}
                                    user={dataItem.user}
                                    follow={handleFollow}
                                    isFollow={isFollowed}
                                >
                                    {/*<Link href={`/@${dataItem.user.nickname}`} passHref>*/}
                                    <Box
                                        sx={{
                                            marginRight: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleArriveProfile}
                                    >
                                        <Typography
                                            component="h3"
                                            variant="body1"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                lineHeight: '25px',

                                                ':hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            {dataItem.user.nickname}
                                        </Typography>
                                    </Box>
                                    {/*</Link>*/}
                                </HeroPreview>
                                <Typography
                                    fontSize="14px"
                                    lineHeight="25px"
                                    component="h4"
                                    variant="body1"
                                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                >
                                    {dataItem.user.bio}
                                </Typography>
                            </Stack>

                            <Stack direction="row" flexWrap="wrap" pt="6px">
                                <Typography> {dataItem.description} </Typography>
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
                                        {dataItem.music}
                                    </Typography>
                                </MuiLink>
                            </Link>
                        </Stack>

                        <Button
                            variant="outlined"
                            color={`${isFollowed ? 'secondary' : 'primary'}`}
                            onClick={handleFollow}
                            sx={{
                                height: '28px',
                                minWidth: '88px',
                                textTransform: 'none',
                                fontWeight: '500',
                                fontSize: '16px',
                            }}
                        >
                            {`${isFollowed ? 'Following' : 'Follow'}`}
                        </Button>
                    </Stack>
                    <Stack direction="row" alignItems="flex-end" ref={ref}>
                        <Box position="relative">
                            <Stack
                                component="video"
                                src={dataItem.file_url}
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

                        <FeedBack data={dataItem} videoRef={videoRef} follow={handleFollow} isFollow={isFollowed} />
                    </Stack>
                </Stack>
            </Stack>
            {isOpenModalAuth && <Authen isOpen={isOpenModalAuth} close={handleAuthClose} />}
        </>
    );
}

export default HeroItem;
