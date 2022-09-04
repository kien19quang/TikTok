import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export interface HeaderMenuProps {
    title: string;
    onBack: () => void;
}

export default function HeaderMenu({ title, onBack }: HeaderMenuProps) {
    return (
        <Stack direction="row" alignItems="center" height="50px" position="relative" mt="-8px" flexShrink="0">
            <Button
                variant="text"
                sx={{
                    color: 'black',
                    cursor: 'pointer',
                    '&:hover': {
                        background: 'transparent',
                    },
                }}
                onClick={onBack}
            >
                <ArrowBackIosNewIcon fontSize="small" />
            </Button>
            <Typography
                fontWeight="500"
                textAlign="center"
                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            >
                {title}
            </Typography>
        </Stack>
    );
}
