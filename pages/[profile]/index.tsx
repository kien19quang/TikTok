import { ProfileSection } from '@/components/Home/ProfileSection';
import { MainLayout } from '@/layouts';
import { Box } from '@mui/material';
import * as React from 'react';

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
    return (
        <Box>
            <ProfileSection />
        </Box>
    );
}

Profile.Layout = MainLayout;
