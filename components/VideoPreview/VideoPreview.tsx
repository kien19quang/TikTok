import { ModelVideo } from '@/models';
import { Box, Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface VideoPreviewProps {
    data: ModelVideo[];
}

export default function VideoPreview({ data }: VideoPreviewProps) {
    const handleHover = (e: React.MouseEvent<HTMLVideoElement>): void => {
        (e.target as HTMLVideoElement).play();
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLVideoElement>): void => {
        (e.target as HTMLVideoElement).pause();
    };

    return (
        <Stack>
            <Stack direction="row" height="44px" width="460px" mb="8px" alignItems="center">
                <Box
                    width="50%"
                    sx={{
                        cursor: 'pointer',
                    }}
                >
                    <Stack direction="row" justifyContent="center" alignItems="center" height="44px">
                        <Typography fontWeight="600" fontSize="18px" lineHeight="25px" color="#121212">
                            Videos
                        </Typography>
                    </Stack>

                    <Divider sx={{ height: '2px', background: 'rgba(22, 24, 35)' }} />
                </Box>
            </Stack>

            <Box
                component="div"
                sx={{
                    display: 'grid',
                    gridGap: '24px 16px',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(167px, 1fr))',
                }}
            >
                {data.map((item: ModelVideo) => (
                    <Box key={item.id}>
                        <Box
                            width="100%"
                            height="250px"
                            borderRadius="4px"
                            component="video"
                            onMouseOver={handleHover}
                            onMouseOut={handleMouseOut}
                            sx={{ objectFit: 'cover' }}
                            src={item.file_url}
                        ></Box>

                        <Typography
                            mt="4px"
                            color="rgba(22, 24, 35)"
                            padding="2px 4px 0"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                        >
                            {item.description}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
}
