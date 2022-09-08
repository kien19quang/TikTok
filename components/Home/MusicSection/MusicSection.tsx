import * as React from 'react';
import { Box } from '@mui/material';
import MusicHeader from './MusicHeader';
import VideoPreview from '@/components/VideoPreview/VideoPreview';

export interface MusicSectionProps {}

export default function MusicSection(props: MusicSectionProps) {
    return (
        <Box>
            <MusicHeader />
            <VideoPreview />
        </Box>
    );
}
