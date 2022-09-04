import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface MenuItemProps {
    title: string;
    to: string;
    icon: React.ReactNode;
    iconActive: React.ReactNode;
}

export default function MenuItem({ title, to, icon, iconActive }: MenuItemProps) {
    const router = useRouter();
    const checkLinkActive = to === router.pathname;

    return (
        <Link href={to}>
            <Stack
                className={`${checkLinkActive ? 'active' : ''}`}
                direction="row"
                alignItems="center"
                padding="8px"
                sx={{
                    borderRadius: '4px',
                    transition: 'background-color ease-in-out 200ms',

                    '&:hover': {
                        backgroundColor: 'rgba(22, 24, 35, 0.03)',
                    },
                }}
                spacing={1}
            >
                {checkLinkActive ? iconActive : icon}
                <Typography fontSize="18px" fontWeight="bold">
                    {title}
                </Typography>
            </Stack>
        </Link>
    );
}
