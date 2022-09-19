import { Box, Stack, Typography } from '@mui/material';
import { FacebookIcon, GoogleIcon, UserIcon } from '../Icons';
export interface LoginProps {
    onChange: (type: string) => void;
}

export function Login({ onChange }: LoginProps) {
    return (
        <Stack mt="48px" height="550px">
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
                <Typography component="h2" color="rgb(22, 24, 35)" fontSize="32px" margin="16px 0" fontWeight="bold">
                    Log in to TikTok
                </Typography>
                <Box component="div" onClick={() => onChange('Form Login')}>
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
                <Typography>{`Don't have an account?`}</Typography>
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
                    onClick={() => onChange('register')}
                >
                    Sign up
                </Box>
            </Stack>
        </Stack>
    );
}
