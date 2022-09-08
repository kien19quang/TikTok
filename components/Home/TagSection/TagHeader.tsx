import { MoreIcon, ShareOutLineIcon } from '@/components/Icons';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

export interface TagHeaderProps {}

export default function TagHeader(props: TagHeaderProps) {
    return (
        <Stack direction="row" mb="20px">
            <Stack width="532px">
                <Stack direction="row" alignItems="flex-start">
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
                            #suthatla
                        </Typography>

                        <Typography
                            component="h2"
                            variant="body1"
                            color="rgba(18, 18, 18, 0.75)"
                            pt="4px"
                            lineHeight="22px"
                        >
                            2.7B Views
                        </Typography>
                    </Box>
                </Stack>

                <Box pt="24px">
                    <Typography mt="8px" color="#16182380" lineHeight="22px">
                        Nếu cuộc sống luôn đơn giản như cách mọi người nghĩ thì chắc chắn sẽ không có gì thú vị rồi🤣 Sự
                        thật là luôn có nhiều điều bất ngờ đằng sau, chia sẻ câu chuyện của bạn cùng đoạn âm thanh siêu
                        hài hước nhé~😝
                    </Typography>
                </Box>
            </Stack>

            <Stack direction="row" spacing={2} width="92px" justifyContent="center">
                <ShareOutLineIcon />
                <MoreIcon />
            </Stack>
        </Stack>
    );
}
