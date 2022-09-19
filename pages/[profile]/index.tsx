import { ProfileSection } from '@/components/Home/ProfileSection';
import { MainLayout } from '@/layouts';
import { Box } from '@mui/material';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
    const router = useRouter();
    const profile: string = router.query?.profile ? `${router.query.profile}` : '';

    if (profile[0] !== '@' && profile !== '') {
        return null;
    }

    return (
        <Box>
            <ProfileSection profile={profile} />
        </Box>
    );
}

Profile.Layout = MainLayout;
