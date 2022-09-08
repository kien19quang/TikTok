import { MainLayout } from '@/layouts';
import * as React from 'react';
import { Box } from '@mui/material';
import MusicSection from '@/components/Home/MusicSection/MusicSection';

export interface MusicDetailProps {}

export default function MusicDetail(props: MusicDetailProps) {
    return (
        <Box>
            <MusicSection />
        </Box>
    );
}

MusicDetail.Layout = MainLayout;
