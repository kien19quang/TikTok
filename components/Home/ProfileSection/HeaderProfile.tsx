import { MoreIcon, ShareOutLineIcon } from '@/components/Icons';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

export interface HeaderProfileProps {}

export default function HeaderProfile(props: HeaderProfileProps) {
    return (
        <Stack direction="row" mb="20px">
            <Stack width="532px">
                <Stack direction="row" alignItems="center">
                    <Box width="116px" height="116px">
                        <Image
                            src="https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/864f04a883f2fc59568079c98c4c61e4.jpeg?x-expires=1662541200&x-signature=nHVUzqY62J4QRwTcu210uM7hCws%3D"
                            alt="avatar"
                            className="avatar"
                            width="116px"
                            height="116px"
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
                            dyluccc
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
                            em an com chua
                        </Typography>
                        <Box mt="16px">
                            <Button
                                variant="contained"
                                sx={{
                                    minHeight: '36px',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    minWidth: '208px',
                                    lineHeight: '22px',
                                }}
                                size="small"
                            >
                                Follow
                            </Button>
                        </Box>
                    </Box>
                </Stack>

                <Stack direction="row" component="h2" mt="22px" spacing={3} mb="0">
                    <Stack direction="row" alignItems="center">
                        <Typography fontSize="18px" color="#121212bf" fontWeight="bold" lineHeight="25px">
                            109
                        </Typography>
                        <Typography ml="6px" color="#121212bf" lineHeight="22px">
                            Following
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <Typography fontSize="18px" color="#121212bf" fontWeight="bold" lineHeight="25px">
                            441
                        </Typography>
                        <Typography ml="6px" color="#121212bf" lineHeight="22px">
                            Followers
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <Typography fontSize="18px" color="#121212bf" fontWeight="bold" lineHeight="25px">
                            28.3K
                        </Typography>
                        <Typography ml="6px" color="#121212bf" lineHeight="22px">
                            Likes
                        </Typography>
                    </Stack>
                </Stack>

                <Typography component="h2" variant="body1" color="#121212" lineHeight="22px" mt="10px">
                    No bio yet.
                </Typography>
            </Stack>

            <Stack direction="row" spacing={2} width="92px" justifyContent="center">
                <ShareOutLineIcon />
                <MoreIcon />
            </Stack>
        </Stack>
    );
}
