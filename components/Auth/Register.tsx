import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FacebookIcon, GoogleIcon, UserIcon } from '../Icons';
import CloseIcon from '@mui/icons-material/Close';
export interface RegisterProps {
    close: () => void;
    onChange: (type: string) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 483,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: '10px',
};

export function Register({ close, onChange }: RegisterProps) {
    return (
        <Box sx={style}>
            <Stack mt="48px" height="600px">
                {/* Body modal */}
                <Stack
                    flexGrow="1"
                    justifyContent="flext-start"
                    alignItems="center"
                    overflow="auto"
                    sx={{
                        div: {
                            border: '1px solid rgba(22, 24, 35, 0.12)',
                            padding: '0 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '44px',
                            width: '375px',
                            marginBottom: '16px',
                            cursor: 'pointer',
                            position: 'relative',
                            borderRadius: '6px',
                        },
                    }}
                >
                    <Typography
                        component="h2"
                        color="rgb(22, 24, 35)"
                        fontSize="32px"
                        margin="16px 0"
                        fontWeight="bold"
                    >
                        Sign up for TikTok
                    </Typography>
                    <Box>
                        <UserIcon className="icon-login" />
                        <Typography color="rgb(22, 24, 35)" fontWeight="600">
                            Use phone / email / username
                        </Typography>
                    </Box>
                    <Box>
                        <FacebookIcon className="icon-login" />
                        <Typography color="rgb(22, 24, 35)" fontWeight="600">
                            Continue with Facebook
                        </Typography>
                    </Box>
                    <Box>
                        <GoogleIcon className="icon-login" />
                        <Typography color="rgb(22, 24, 35)" fontWeight="600">
                            Continue with Google
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    height="64px"
                    justifyContent="center"
                    alignItems="center"
                    borderTop="1px solid rgba(22, 24, 35, 0.12)"
                    direction="row"
                >
                    <Typography>Already have an account?</Typography>
                    <Box
                        ml="5px"
                        fontWeight="600"
                        fontSize="16px"
                        color="rgb(254, 44, 85)"
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            },
                        }}
                        onClick={() => onChange('login')}
                    >
                        Log in
                    </Box>
                </Stack>
            </Stack>
            <Box
                sx={{
                    position: 'absolute',
                    top: '24px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: '24px',
                    width: '24px',
                    height: '24px',
                    background: 'rgba(22, 24, 35, 0.03)',
                    transform: 'scale(1.7)',
                }}
                onClick={close}
            >
                <CloseIcon sx={{ width: '15px', height: '15px' }} />
            </Box>
        </Box>
    );
}
