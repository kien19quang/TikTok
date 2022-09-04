import { Box, Stack } from '@mui/material';
import * as React from 'react';

export interface WrapperProps {
    children: React.ReactNode;
}

export default function PopperWrapper({ children }: WrapperProps) {
    return (
        <Stack
            sx={{
                width: '100%',
                background: 'rgb(255, 255, 255)',
                boxShadow: 'rgb(0 0 0 / 12%) 0px 2px 12px',
                borderRadius: '8px',
                maxHeight: 'min((100vh - 96px) - 60px, 734px)',
                paddingTop: '8px',
            }}
        >
            {children}
        </Stack>
    );
}
