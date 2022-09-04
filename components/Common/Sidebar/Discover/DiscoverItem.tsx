import { Box, Chip, Stack, Typography } from '@mui/material';
import * as React from 'react';
import TagIcon from '@mui/icons-material/Tag';

export interface DiscoverItemProps {
    label: string;
    icon: React.ReactNode;
}

export default function DiscoverItem({ label, icon }: DiscoverItemProps) {
    return (
        <Stack
            direction="row"
            width="fit-content"
            maxWidth="100%"
            height="24px"
            alignItems="center"
            padding="3px 10px"
            border="1px solid rgba(22, 24, 35, 0.2)"
            borderRadius="12px"
            justifyContent="center"
            sx={{
                cursor: 'pointer',
                marginRight: '8px',
                marginBottom: '12px',
                '&:hover': {
                    background: '#16182308',
                },
            }}
        >
            {/*<TagIcon fontSize="small" sx={{ color: 'rgba(22, 24, 35, 1)' }} />*/}
            {icon}
            <Typography
                fontSize="14px"
                sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    color: 'rgba(22, 24, 35, 0.75)',
                    lineHeight: '18px',
                    paddingLeft: '4px',
                }}
            >
                suthatla
            </Typography>
        </Stack>
    );
}
