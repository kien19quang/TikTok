import { Box, Typography } from '@mui/material';
import * as React from 'react';

export interface FooterSidebarProps {}

export default function FooterSidebar(props: FooterSidebarProps) {
    return (
        <Box padding="8px">
            <Typography fontSize="14px" padding="8px" fontWeight="600" color="#161823bf">
                Copyright © 2022 Next Study, Inc.
            </Typography>
        </Box>
    );
}
