import VideoPreview from '@/components/VideoPreview/VideoPreview';
import { Box } from '@mui/material';
import * as React from 'react';
import TagHeader from './TagHeader';

export interface TagSectionProps {}

export default function TagSection(props: TagSectionProps) {
    return (
        <Box>
            <TagHeader />
        </Box>
    );
}
