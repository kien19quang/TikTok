import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import DiscoverItem from './DiscoverItem';
import { TagIcon, MusicIcon } from '@/components/Icons';

export interface DiscoverProps {}

export default function Discover(props: DiscoverProps) {
    return (
        <Box width="100%" padding="16px 8px 8px">
            <Typography fontSize="14px" paddingBottom="16px" fontWeight="600" color="#161823bf">
                Discover
            </Typography>

            <Stack direction="row" flexWrap="wrap">
                <DiscoverItem label="SuThatLa" icon={<TagIcon />} />
                <DiscoverItem label="SuThatLa" icon={<TagIcon />} />
                <DiscoverItem label="SuThatLa" icon={<MusicIcon />} />
                <DiscoverItem label="SuThatLa" icon={<MusicIcon />} />
            </Stack>
        </Box>
    );
}
