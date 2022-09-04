import { ModelMenuItem } from '@/models';
import { Box, Button, Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface MenuItemProps {
    data: ModelMenuItem;
    onClick: () => void;
}

export default function MenuItem({ data, onClick }: MenuItemProps) {
    const Icon = data?.icon ?? 'div';

    return (
        <Button variant="text" sx={{ color: 'black', width: '100%', justifyContent: 'flex-start' }} onClick={onClick}>
            <Stack direction="row" alignItems="center" spacing={1} padding="8px 16px">
                <Icon fontSize="medium" />
                <Typography fontWeight="500" textTransform="none">
                    {data.title}
                </Typography>
            </Stack>
        </Button>
    );
}
