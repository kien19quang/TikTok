import TagSection from '@/components/Home/TagSection/TagSection';
import { MainLayout } from '@/layouts';
import { Box } from '@mui/material';
import * as React from 'react';

export interface TagDetailProps {}

export default function TagDetail(props: TagDetailProps) {
    return (
        <Box>
            <TagSection />
        </Box>
    );
}

TagDetail.Layout = MainLayout;
