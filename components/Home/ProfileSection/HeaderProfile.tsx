import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { Authen } from '@/components/Auth';
import { EditProfileIcon, MoreIcon, ShareOutLineIcon } from '@/components/Icons';
import { User } from '@/models';
import { FollowAnUser, UnFollowAnUser } from '@/services';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

export interface HeaderProfileProps {
    dataProfile: User;
    myProfile: boolean;
    handleFollowUser: () => void;
}

export default function HeaderProfile({ dataProfile, myProfile, handleFollowUser }: HeaderProfileProps) {
    const [isOpenModalAuth, setIsOpenModalAuth] = useState<boolean>(false);
    const [isFollowed, setIsFollowed] = useState<boolean>(dataProfile.is_followed);

    const isLoggedIn = useAppSelector<boolean>((state: RootState) => state.user.isLoggedIn);

    const fullname = `${dataProfile.first_name} ${dataProfile.last_name}`;
    let handleCount = (number: number): string => {
        if (number / 1000000 >= 1) {
            return (number / 1000000).toFixed(1) + 'M';
        }
        if (number / 1000 >= 1) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number.toString();
    };

    let handleFollow = async () => {
        if (isLoggedIn) {
            if (dataProfile.is_followed) {
                setIsFollowed(false);
                handleFollowUser();
            } else {
                setIsFollowed(true);
                handleFollowUser();
            }
        } else {
            setIsOpenModalAuth(true);
        }
    };

    let handleAuthClose = async () => {
        setIsOpenModalAuth(false);
    };

    let renderButton = () => {
        if (myProfile) {
            return (
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                        minHeight: '36px',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '22px',
                        minWidth: '150px',
                    }}
                    size="small"
                >
                    <EditProfileIcon />
                    <Typography fontWeight="bold" ml="6px">
                        Edit Profile
                    </Typography>
                </Button>
            );
        } else if (!isFollowed) {
            return (
                <Button
                    variant="contained"
                    sx={{
                        minHeight: '36px',
                        fontSize: '18px',
                        fontWeight: '600',
                        minWidth: '180px',
                        lineHeight: '22px',
                    }}
                    onClick={handleFollow}
                    size="small"
                >
                    Follow
                </Button>
            );
        } else {
            return (
                <Button
                    variant="outlined"
                    sx={{
                        minHeight: '36px',
                        fontSize: '18px',
                        fontWeight: '600',
                        minWidth: '180px',
                        lineHeight: '22px',
                    }}
                    onClick={handleFollow}
                    size="small"
                >
                    Unfollow
                </Button>
            );
        }
    };

    return (
        <>
            <Stack direction="row" mb="20px" sx={{ cursor: 'default' }}>
                <Stack width="532px">
                    <Stack direction="row" alignItems="center">
                        <Box width="116px" height="116px">
                            <Image
                                src={dataProfile.avatar}
                                alt="avatar"
                                className="avatar"
                                width="116px"
                                height="116px"
                                objectFit="cover"
                            />
                        </Box>

                        <Box ml="20px" flex="1">
                            <Typography
                                component="h2"
                                fontSize="32px"
                                fontWeight="bold"
                                lineHeight="38px"
                                pb="4px"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                textAlign="left"
                                whiteSpace="nowrap"
                            >
                                {dataProfile.nickname}
                            </Typography>
                            <Typography
                                component="h3"
                                fontSize="18px"
                                fontWeight="500"
                                lineHeight="25px"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                maxWidth="450px"
                            >
                                {fullname}
                            </Typography>
                            <Box mt="16px">{renderButton()}</Box>
                        </Box>
                    </Stack>

                    <Stack direction="row" component="h2" mt="22px" spacing={3} mb="0">
                        <Stack direction="row" alignItems="center">
                            <Typography fontSize="18px" color="#121212bf" fontWeight="bold" lineHeight="25px">
                                {handleCount(dataProfile.followings_count)}
                            </Typography>
                            <Typography ml="6px" color="#121212bf" lineHeight="22px">
                                Following
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center">
                            <Typography fontSize="18px" color="#121212bf" fontWeight="bold" lineHeight="25px">
                                {handleCount(dataProfile.followers_count)}
                            </Typography>
                            <Typography ml="6px" color="#121212bf" lineHeight="22px">
                                Followers
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center">
                            <Typography fontSize="18px" color="#121212bf" fontWeight="bold" lineHeight="25px">
                                {handleCount(dataProfile.likes_count)}
                            </Typography>
                            <Typography ml="6px" color="#121212bf" lineHeight="22px">
                                Likes
                            </Typography>
                        </Stack>
                    </Stack>

                    <Typography component="h2" variant="body1" color="#121212" lineHeight="22px" mt="10px">
                        {dataProfile.bio ? dataProfile.bio : 'No bio yet.'}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={2} width="92px" justifyContent="center">
                    <ShareOutLineIcon />
                    <MoreIcon />
                </Stack>
            </Stack>

            {isOpenModalAuth && <Authen isOpen={isOpenModalAuth} close={handleAuthClose} />}
        </>
    );
}
