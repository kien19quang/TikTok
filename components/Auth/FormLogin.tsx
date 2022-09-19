import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setData, setIsLoggedIn, setToken } from '@/features/Authen/AuthSlice';
import { Auth } from '@/models';
import { Login } from '@/services';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface FormLoginProps {
    onChange: (type: string) => void;
    close: () => void;
}

const styleInput = {
    backgroundColor: 'rgba(22, 24, 35, 0.06)',
    color: 'rgb(22, 24, 35)',
    fontSize: '16px',
    caretColor: 'rgb(254, 44, 85)',
};

const initialFormLogin: Auth = {
    email: '',
    password: '',
};

export function FormLogin({ onChange, close }: FormLoginProps) {
    const [formLogin, setFormLogin] = useState<Auth>(initialFormLogin);
    const [errMsg, setErrMsg] = useState<string>('');
    const [errEmail, setErrEmail] = useState<boolean>(false);
    const [errPassword, setErrPasword] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    let handleChange = (type: 'email' | 'password', e: React.ChangeEvent<HTMLInputElement>): void => {
        if (errMsg) {
            setErrMsg('');
            if (errEmail) {
                setErrEmail(false);
            } else {
                setErrPasword(false);
            }
        }

        formLogin[type] = e.target.value;
        setFormLogin({
            email: formLogin.email.trim(),
            password: formLogin.password.trim(),
        });
    };

    const validateEmail = (email: string) => {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    };

    let handleLogin = async () => {
        let checkEmail = validateEmail(formLogin.email);
        if (!checkEmail) {
            setErrMsg('Email bạn nhập không chính xác');
            setErrEmail(true);
            return;
        }
        let checkPassword = formLogin.password.length >= 6;
        if (!checkPassword) {
            setErrMsg('Mật khẩu cần tối thiểu 6 kí tự');
            setErrPasword(true);
            return;
        }
        try {
            let res = await Login(formLogin);
            toast.success('Bạn đã đăng nhập thành công');
            close();
            dispatch(setIsLoggedIn(true));
            dispatch(setData(res.data));
            dispatch(setToken(res?.meta.token));
        } catch (e) {
            const err = e as AxiosError;
            let statusCode = err.response?.status ? err.response.status : undefined;
            if (statusCode === 401) {
                setErrMsg('Tài khoản hoặc mật khẩu bạn nhập không chính xác');
                setErrPasword(true);
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
                        Log in
                    </Typography>
                    <Box width="375px">
                        <Typography color="rgb(22, 24, 35)" fontWeight="600" mb="5px">
                            Login with email
                        </Typography>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            color="info"
                            error={errEmail}
                            margin="normal"
                            sx={styleInput}
                            value={formLogin.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            error={errPassword}
                            color="info"
                            margin="dense"
                            sx={styleInput}
                            value={formLogin.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('password', e)}
                        />

                        {errMsg && (
                            <Typography mt="8px" color="rgb(255, 76, 58)" fontSize="15px">
                                {errMsg}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            disabled={!formLogin.email || !formLogin.password}
                            sx={{
                                width: '100%',
                                minWidth: '120px',
                                minHeight: '46px',
                                lineHeight: '22px',
                                fontWeight: '700',
                                fontSize: '16px',
                                mt: '21px',
                            }}
                            onClick={handleLogin}
                        >
                            Log in
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
                onClick={() => onChange('login')}
            >
                <ArrowBackIosNewIcon />
            </Box>
        </>
    );
}
