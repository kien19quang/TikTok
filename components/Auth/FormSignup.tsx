import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';
import { Auth } from '@/models';
import { Register } from '@/services';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
export interface FormSignUpProps {
    onChange: (type: string) => void;
}

const styleInput = {
    backgroundColor: 'rgba(22, 24, 35, 0.06)',
    color: 'rgb(22, 24, 35)',
    fontSize: '16px',
    caretColor: 'rgb(254, 44, 85)',
};

const initialFormRegister = {
    email: '',
    password: '',
    type: 'email',
};

export function FormSignUp({ onChange }: FormSignUpProps) {
    const [formRegister, setFormRegister] = useState<Auth>(initialFormRegister);
    const [errMsg, setErrMsg] = useState<string>('');
    const [errEmail, setErrEmail] = useState<boolean>(false);
    const [errPassword, setErrPasword] = useState<boolean>(false);

    let handleChange = (type: 'email' | 'password', e: React.ChangeEvent<HTMLInputElement>): void => {
        if (errMsg) {
            setErrMsg('');
            if (errEmail) {
                setErrEmail(false);
            } else {
                setErrPasword(false);
            }
        }

        formRegister[type] = e.target.value;
        setFormRegister({
            email: formRegister.email.trim(),
            password: formRegister.password.trim(),
            type: formRegister.type,
        });
    };

    const validateEmail = (email: string) => {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    };

    let handleRegister = async () => {
        let checkEmail = validateEmail(formRegister.email);
        if (!checkEmail) {
            setErrMsg('Email bạn nhập không chính xác');
            setErrEmail(true);
            return;
        }
        let checkPassword = formRegister.password.length >= 6;
        if (!checkPassword) {
            setErrMsg('Mật khẩu cần tối thiểu 6 kí tự');
            setErrPasword(true);
            return;
        }
        try {
            await Register(formRegister);
            toast.success('Đăng ký tài khoản thành công');
            onChange('Form Login');
        } catch (e) {
            const err = e as AxiosError;
            let statusCode = err.response?.status ? err.response.status : undefined;
            if (statusCode === 409) {
                setErrMsg('Email của bạn đã được sử dụng');
                setErrEmail(true);
                return;
            }
        }
    };

    return (
        <>
            <Stack mt="48px" height="550px">
                {/* Body modal */}
                <Stack flexGrow="1" justifyContent="flext-start" alignItems="center" overflow="auto">
                    <Typography
                        component="h2"
                        color="rgb(22, 24, 35)"
                        fontSize="32px"
                        margin="16px 0"
                        fontWeight="bold"
                    >
                        Sign up
                    </Typography>
                    <Box width="375px">
                        <Typography color="rgb(22, 24, 35)" fontWeight="600" mb="5px">
                            Sign up with email
                        </Typography>
                        <TextField
                            id="email-signup"
                            label="Email address"
                            variant="outlined"
                            fullWidth
                            error={errEmail}
                            color="info"
                            required
                            margin="normal"
                            sx={styleInput}
                            value={formRegister.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            error={errPassword}
                            color="info"
                            required
                            margin="dense"
                            sx={styleInput}
                            value={formRegister.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('password', e)}
                        />

                        {errMsg && (
                            <Typography mt="8px" color="rgb(255, 76, 58)" fontSize="15px">
                                {errMsg}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            disabled={!formRegister.email || !formRegister.password}
                            sx={{
                                width: '100%',
                                minWidth: '120px',
                                minHeight: '46px',
                                lineHeight: '22px',
                                fontWeight: '700',
                                fontSize: '16px',
                                mt: '21px',
                            }}
                            onClick={handleRegister}
                        >
                            Next
                        </Button>
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
            <Box
                sx={{
                    position: 'absolute',
                    left: '16px',
                    top: '25px',
                    cursor: 'pointer',
                    height: '30px',
                    width: '30px',
                }}
                component="div"
                onClick={() => onChange('register')}
            >
                <ArrowBackIosNewIcon />
            </Box>
        </>
    );
}
