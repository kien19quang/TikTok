import { Box, Stack, Typography, Link as MuiLink, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { CommentIcon, MusicIcon, ShareIcon, TymIcon, TymIconActive } from '@/components/Icons';
import HeroPreview from './HeroPreview';
import { ModelVideo } from '@/models/Video';

export interface HeroItemProps {
    data: ModelVideo;
}

export default function HeroItem({ data }: HeroItemProps) {
    let handleNumberFarorites = (number: number): string => {
        let n = number / 1000;
        if (n < 1) {
            return number.toString();
        }
        let view = n.toFixed(1);
        return view + 'K';
    };

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
                        <HeroPreview nickname={data.user.nickname} bio={data.user.bio} />

                        <Stack direction="row" flexWrap="wrap" pt="6px">
                            <Typography> {data.description} </Typography>

                            {/*{tagList.map((item, index) => (
                                <Link href={item.to} key={index}>
                                    <MuiLink
                                        sx={{
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            mr: '8px',
                                        }}
                                    >{`#${item.label}`}</MuiLink>
                                </Link>
                            ))}*/}
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
                <Stack direction="row" alignItems="flex-end">
                    <Box>
                        <Box
                            component="video"
                            src={data.file_url}
                            height="calc(450px + (100vw - 768px) / 1152 * 100)"
                            borderRadius="8px"
                            overflow="hidden"
                            mr="20px"
                            controls
                            sx={{ objectFit: 'cover', cursor: 'pointer', maxWidth: '520px' }}
                        ></Box>
                    </Box>

                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Box
                                bgcolor="rgba(22, 24, 35, 0.06)"
                                component="button"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    outline: 'none',
                                    border: 'none',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    padding: '0',
                                    cursor: 'pointer',

                                    '&:hover': {
                                        backgroundColor: '#1618231a',
                                    },
                                }}
                            >
                                {data.is_liked ? <TymIconActive /> : <TymIcon />}
                            </Box>
                            <Typography
                                fontSize="12px"
                                lineHeight="18px"
                                color="rgba(22, 24, 35, 0.75)"
                                textAlign="center"
                                fontWeight="bold"
                            >
                                {handleNumberFarorites(data.likes_count)}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Box
                                bgcolor="rgba(22, 24, 35, 0.06)"
                                component="button"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    outline: 'none',
                                    border: 'none',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    padding: '0',
                                    cursor: 'pointer',

                                    '&:hover': {
                                        backgroundColor: '#1618231a',
                                    },
                                }}
                            >
                                <CommentIcon />
                            </Box>
                            <Typography
                                fontSize="12px"
                                lineHeight="18px"
                                color="rgba(22, 24, 35, 0.75)"
                                textAlign="center"
                                fontWeight="bold"
                            >
                                {handleNumberFarorites(data.comments_count)}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Box
                                bgcolor="rgba(22, 24, 35, 0.06)"
                                component="button"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    outline: 'none',
                                    border: 'none',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    padding: '0',
                                    cursor: 'pointer',

                                    '&:hover': {
                                        backgroundColor: '#1618231a',
                                    },
                                }}
                            >
                                <ShareIcon />
                            </Box>
                            <Typography
                                fontSize="12px"
                                lineHeight="18px"
                                color="rgba(22, 24, 35, 0.75)"
                                textAlign="center"
                                fontWeight="bold"
                            >
                                {handleNumberFarorites(data.shares_count)}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
