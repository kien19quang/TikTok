import { MoreIcon, ShareOutLineIcon } from '@/components/Icons';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

export interface MusicHeaderProps {}

export default function MusicHeader(props: MusicHeaderProps) {
    return (
        <Stack direction="row" mb="20px">
            <Stack width="532px">
                <Stack direction="row" alignItems="center">
                    <Box width="120px" height="120px">
                        <Image
                            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/32432daa5ae2b7f7ffc2ff6647505ffb~c5_720x720.jpeg?x-expires=1662606000&x-signature=2b4prW1JNVoqEc4%2B40tXAv04hbM%3D"
                            alt="avatar"
                            width="120px"
                            height="120px"
                            className="music-img"
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
                            maxHeight="80px"
                            sx={{
                                WebkitLineClamp: '2',
                                cursor: 'pointer',
                            }}
                        >
                            nhạc nền - Phan Nguyễn Ca Ca
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
                            sx={{
                                cursor: 'pointer',

                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Phan Nguyễn Ca Ca
                        </Typography>

                        <Typography component="h2" variant="body1" color="rgba(18, 18, 18, 0.75)" pt="4px">
                            3 videos
                        </Typography>
                    </Box>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={2} width="92px" justifyContent="center">
                <ShareOutLineIcon />
                <MoreIcon />
            </Stack>
        </Stack>
    );
}
