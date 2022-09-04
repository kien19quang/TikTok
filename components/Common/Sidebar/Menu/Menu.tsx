import { Box } from '@mui/material';
import * as React from 'react';

export interface MenuProps {
    children: React.ReactNode;
}

export default function Menu({ children }: MenuProps) {
    return <Box component="nav">{children}</Box>;
}
