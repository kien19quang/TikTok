import { Box, Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface VideoPreviewProps {}

export default function VideoPreview(props: VideoPreviewProps) {
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
                <Box>
                    <Box
                        width="100%"
                        height="250px"
                        borderRadius="4px"
                        component="video"
                        onMouseOver={handleHover}
                        onMouseOut={handleMouseOut}
                        sx={{ objectFit: 'cover' }}
                        src="https://v16-webapp.tiktok.com/281ead18a90cd3f0d79b0c1966f9806d/63170914/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/da962f027f8b48a5983a29fd882a9781/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3340&bt=1670&cs=0&ds=3&ft=eXd.6Hk_Myq8Z_Df~he2NWwgml7Gb&mime_type=video_mp4&qs=0&rc=ZmkzZDY0NDwzNzkzNDZnM0Bpamx5O2U6ZnhpOzMzZjgzM0A2LmFfYDMyXzMxYjU2LmFhYSNjaC0ycjRvYGJgLS1kL2Nzcw%3D%3D&l=202209060247030102451301132601AF21&btag=80000"
                    ></Box>

                    <Typography
                        mt="4px"
                        color="rgba(22, 24, 35)"
                        padding="2px 4px 0"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        Bé cưng nói là gì thía
                    </Typography>
                </Box>
            </Box>
        </Stack>
    );
}
