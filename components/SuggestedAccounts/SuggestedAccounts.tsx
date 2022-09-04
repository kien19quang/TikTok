import { Box, Typography } from '@mui/material';
import * as React from 'react';
import AccountItem from './AccountItem';

export interface SuggestedAccountsProps {
    label: string;
}

export default function SuggestedAccounts({ label }: SuggestedAccountsProps) {
    return (
        <Box>
            <Typography fontSize="14px" padding="8px" fontWeight="600" color="#161823bf">
                {label}
            </Typography>
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <Typography fontSize="14px" padding="8px" fontWeight="700" color="#fe2c55" sx={{ cursor: 'pointer' }}>
                See all
            </Typography>
        </Box>
    );
}
