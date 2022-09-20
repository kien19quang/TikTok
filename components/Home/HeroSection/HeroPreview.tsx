import { Box, Link as MuiLink, Stack, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Tippy from '@tippyjs/react/headless';
import Image from 'next/image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { forwardRef } from 'react';
import { User } from '@/models';

export interface HeroPreviewProps {
    nickname: string;
    bio: string;
    children: React.ReactElement;
    offset?: [number, number];
    user: User;
}

export default function HeroPreview({ children, nickname, bio, offset, user }: HeroPreviewProps) {
    //let handleNumberFarorites = (number: number): string => {
    //    let n = number / 1000;
    //    if (n < 1) {
    //        return number.toString();
    //    }
    //    let view = n.toFixed(1);
    //    return view + 'K';
    //};

    return (
        <Box flexGrow={1}>
            <Tippy
                interactive
                delay={[800, 0]}
                placement="bottom-start"
                offset={offset || undefined}
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
                                src={user.avatar}
                                alt="avatar"
                                width="44px"
                                height="44px"
                                objectFit="cover"
                                className="avatar"
                            />
                            <Button
                                variant="outlined"
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    minWidth: '106px',
                                    height: '36px',
                                    textTransform: 'none',
                                }}
                                size="medium"
                            >
                                Follow
                            </Button>
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
                                {nickname}
                            </Typography>
                            <CheckCircleIcon
                                fontSize="small"
                                sx={{ ml: '6px', color: 'rgb(32, 213, 236)', width: '17px' }}
                            />
                        </Stack>
                        <Typography
                            fontSize="14px"
                            fontWeight="600"
                            color="#161823"
                            lineHeight="20px"
                            sx={{ cursor: 'pointer' }}
                        >
                            {bio}
                        </Typography>

                        <Stack direction="row" pt="10px" spacing="6px" fontSize="17px">
                            <Typography fontWeight="bold">{user.followers_count}</Typography>
                            <Typography color="#161823bf" paddingRight="6px">
                                Follower
                            </Typography>
                            <Typography fontWeight="bold">{user.likes_count}</Typography>
                            <Typography color="#161823bf">Likes</Typography>
                        </Stack>
                    </Box>
                )}
            >
                {children}
            </Tippy>
        </Box>
    );
}
