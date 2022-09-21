import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tippy from '@tippyjs/react/headless';
import { Account } from '@/models/Account';
import { FollowAnUser, UnFollowAnUser } from '@/services';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { Authen } from '../Auth';
import { useRouter } from 'next/router';
export interface AccountItemProps {
    data: Account;
    pageNumber: number;
}

export default function AccountItem({ data, pageNumber }: AccountItemProps) {
    const fullName = `${data.first_name} ${data.last_name}`;
    const [isFollowed, setIsFollowed] = useState<boolean>(data.is_followed);
    const [isOpenModalAuth, setIsOpenModalAuth] = useState<boolean>(false);

    const token = useAppSelector<string>((state: RootState) => state.user.token);
    const isLoggedIn = useAppSelector<boolean>((state: RootState) => state.user.isLoggedIn);
    const router = useRouter();

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
            if (isFollowed) {
                setIsFollowed(false);
                await UnFollowAnUser(Number(data.id), pageNumber, token);
            } else {
                setIsFollowed(true);
                await FollowAnUser(Number(data.id), pageNumber, token);
            }
        } else {
            setIsOpenModalAuth(true);
        }
    };

    let handleAuthClose = () => {
        setIsOpenModalAuth(false);
    };

    let renderButtonFollow = (): React.ReactNode => {
        if (isFollowed) {
            return (
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                        minWidth: '106px',
                        height: '36px',
                        textTransform: 'none',
                    }}
                    onClick={handleFollow}
                >
                    Following
                </Button>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    onClick={handleFollow}
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        minWidth: '106px',
                        height: '36px',
                        textTransform: 'none',

                        '&:hover': {
                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)),#FE2C55',
                        },
                    }}
                >
                    Follow
                </Button>
            );
        }
    };

    let handleArriveProfile = () => {
        router.push(`/@${data.nickname}`);
    };

    return (
        <>
            <Box>
                <Tippy
                    interactive
                    placement="bottom"
                    delay={[800, 0]}
                    offset={[-10, 0]}
                    render={(attrs) => (
                        <Box
                            component="div"
                            tabIndex={-1}
                            {...attrs}
                            width="320px"
                            borderRadius="8px"
                            bgcolor="white"
                            padding="20px"
                            boxShadow="rgb(0 0 0 / 12%) 0px 4px 16px"
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb="12px"
                                sx={{ cursor: 'pointer' }}
                            >
                                <Image
                                    src={data.avatar}
                                    alt="avatar"
                                    width="44px"
                                    height="44px"
                                    objectFit="cover"
                                    className="avatar"
                                />
                                {renderButtonFollow()}
                            </Stack>
                            <Stack direction="row" alignItems="center" pb="4px" sx={{ cursor: 'pointer' }}>
                                <Typography
                                    component="h4"
                                    variant="body1"
                                    fontWeight="bold"
                                    color="#161823"
                                    fontSize="18px"
                                    lineHeight="22px"
                                >
                                    {data.nickname}
                                </Typography>
                                {data.tick && (
                                    <CheckCircleIcon
                                        fontSize="small"
                                        sx={{ ml: '6px', color: 'rgb(32, 213, 236)', width: '17px' }}
                                    />
                                )}
                            </Stack>
                            <Typography
                                fontSize="14px"
                                fontWeight="600"
                                color="#161823"
                                lineHeight="20px"
                                sx={{ cursor: 'pointer' }}
                            >
                                {fullName}
                            </Typography>

                            <Stack direction="row" pt="10px" spacing="6px" fontSize="17px">
                                <Typography fontWeight="bold"> {handleCount(data.followers_count)} </Typography>
                                <Typography color="#161823bf" paddingRight="6px">
                                    Follower
                                </Typography>
                                <Typography fontWeight="bold"> {handleCount(data.likes_count)} </Typography>
                                <Typography color="#161823bf">Likes</Typography>
                            </Stack>
                        </Box>
                    )}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            cursor: 'pointer',
                            padding: '8px',
                            height: '48px',
                            '&:hover': {
                                background: 'rgba(22, 24, 35, 0.03)',
                            },
                        }}
                        component="div"
                        onClick={handleArriveProfile}
                    >
                        <Box width="32px" height="32px">
                            <Image
                                src={data.avatar}
                                alt="avatar"
                                width="32px"
                                height="32px"
                                objectFit="cover"
                                className="avatar"
                            />
                        </Box>
                        <Box flex="1" ml="12px">
                            <Stack direction="row" alignItems="center">
                                <Typography
                                    component="h4"
                                    variant="body1"
                                    fontWeight="bold"
                                    color="#161823"
                                    lineHeight="1"
                                >
                                    {data.nickname}
                                </Typography>
                                {data.tick && (
                                    <CheckCircleIcon
                                        fontSize="small"
                                        sx={{ ml: '6px', color: 'rgb(32, 213, 236)', width: '17px' }}
                                    />
                                )}
                            </Stack>
                            <Typography variant="body2" fontSize="12px" color="#161823bf">
                                {fullName}
                            </Typography>
                        </Box>
                    </Stack>
                </Tippy>
            </Box>

            {isOpenModalAuth && <Authen isOpen={isOpenModalAuth} close={handleAuthClose} />}
        </>
    );
}
