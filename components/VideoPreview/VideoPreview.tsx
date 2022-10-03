import { ModelVideo } from '@/models';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { Box, Divider, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import VideoPreviewDetail from './VideoPreviewDetail';

export interface VideoPreviewProps {
    data: ModelVideo[];
    videoLiked?: ModelVideo[];
    isFollow: boolean;
    follow: () => void;
}

const tabActive = { height: '2px', background: 'rgba(22, 24, 35)' };
const tabDisabled = { height: '1px', background: 'rgba(0, 0, 0, 0.12)' };

export default function VideoPreview({ data, videoLiked = [], isFollow, follow }: VideoPreviewProps) {
    const [tab, setTab] = useState<string>('videos');

    let handleChangeTab = (type: string) => {
        if (type !== tab) {
            setTab(type);
        }
    };

    const renderTab = (): React.ReactNode => {
        if (tab === 'videos') {
            return (
                <Box
                    component="div"
                    sx={{
                        display: 'grid',
                        gridGap: '24px 16px',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(167px, 1fr))',
                    }}
                >
                    {data.map((item: ModelVideo) => (
                        <VideoPreviewDetail key={item.id} data={item} isFollow={isFollow} follow={follow} />
                    ))}
                </Box>
            );
        } else {
            if (videoLiked.length > 0) {
                return (
                    <Box
                        component="div"
                        sx={{
                            display: 'grid',
                            gridGap: '24px 16px',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(167px, 1fr))',
                        }}
                    >
                        {videoLiked.map((item: ModelVideo) => (
                            <VideoPreviewDetail key={item.id} data={item} isFollow={isFollow} follow={follow} />
                        ))}
                    </Box>
                );
            } else {
                return (
                    <Stack alignItems="center" justifyContent="center" width="100%" height="360px">
                        <LockPersonOutlinedIcon sx={{ fontSize: '6rem', color: 'rgba(22, 24, 35, 0.4)' }} />
                        <Typography
                            mt="48px"
                            fontSize="24px"
                            lineHeight="28px"
                            fontWeight="bold"
                            color="rgb(22, 24, 35)"
                        >
                            {`This user's liked videos are private`}
                        </Typography>
                        <Typography mt="8px" color="rgba(22, 24, 35, 0.75)">
                            Videos liked by phannguyencaca are currently hidden
                        </Typography>
                    </Stack>
                );
            }
        }
    };

    return (
        <Stack>
            <Stack direction="row" height="44px" width="460px" mb="8px" alignItems="center">
                <Box
                    width="50%"
                    sx={{
                        cursor: 'pointer',
                    }}
                    component="div"
                    onClick={() => handleChangeTab('videos')}
                >
                    <Stack direction="row" justifyContent="center" alignItems="center" height="44px">
                        <Typography
                            fontWeight="600"
                            fontSize="18px"
                            lineHeight="25px"
                            color={`${tab === 'videos' ? '#121212' : '#16182380'}`}
                        >
                            Videos
                        </Typography>
                    </Stack>

                    <Divider sx={tab === 'videos' ? tabActive : tabDisabled} />
                </Box>
                <Box
                    width="50%"
                    sx={{
                        cursor: 'pointer',
                    }}
                    component="div"
                    onClick={() => handleChangeTab('liked')}
                >
                    <Stack direction="row" justifyContent="center" alignItems="center" height="44px">
                        <Typography
                            fontWeight="600"
                            fontSize="18px"
                            lineHeight="25px"
                            color={`${tab === 'liked' ? '#121212' : '#16182380'}`}
                        >
                            Liked
                        </Typography>
                    </Stack>

                    <Divider sx={tab === 'liked' ? tabActive : tabDisabled} />
                </Box>
            </Stack>

            {renderTab()}
        </Stack>
    );
}
