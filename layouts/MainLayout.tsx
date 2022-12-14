import { LayoutProps } from '@/models';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Header, Sidebar } from '@/components/Common';

export function MainLayout({ children }: LayoutProps) {
    return (
        <Box>
            <Header />

            <Container>
                <Stack direction="row" mt="60px" justifyContent="space-between">
                    <Box width="30%">
                        <Sidebar />
                    </Box>
                    <Box width="65%" py="24px">
                        {children}
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
