import { Account } from '@/models/Account';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import AccountItem from './AccountItem';

export interface SuggestedAccountsProps {
    label: string;
    list: Account[];
    pageNumber: number;
}

export default function SuggestedAccounts({ label, list, pageNumber }: SuggestedAccountsProps) {
    const [showMore, setShowMore] = useState<boolean>(false);

    let handleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <Box>
            <Typography fontSize="14px" padding="8px" fontWeight="600" color="#161823bf">
                {label}
            </Typography>
            {showMore
                ? list.map((dataAccount: Account) => {
                      return <AccountItem key={dataAccount.id} data={dataAccount} pageNumber={pageNumber} />;
                  })
                : list.slice(0, 5).map((dataAccount: Account) => {
                      return <AccountItem key={dataAccount.id} data={dataAccount} pageNumber={pageNumber} />;
                  })}

            <Typography
                fontSize="14px"
                padding="8px"
                fontWeight="700"
                color="#fe2c55"
                sx={{ cursor: 'pointer' }}
                onClick={handleShowMore}
            >
                {showMore ? 'See less' : 'See all'}
            </Typography>
        </Box>
    );
}
