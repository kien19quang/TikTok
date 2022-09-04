import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../Popper/Wrapper';
export interface AccountItemProps {}

export default function AccountItem(props: AccountItemProps) {
    return (
        <Box>
            <Tippy
                interactive
                placement="bottom"
                delay={[800, 0]}
                offset={[-10, 0]}
                render={(attrs) => (
                    <Box
                        component="div"
                        tabIndex={-1}
                        {...attrs}
                        width="320px"
                        borderRadius="8px"
                        bgcolor="white"
                        padding="20px"
                        boxShadow="rgb(0 0 0 / 12%) 0px 4px 16px"
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb="12px"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Image
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1662372000&x-signature=Ea3ptkEAJZ7nVqrRuYTTysT%2FmbU%3D"
                                alt="avatar"
                                width="44px"
                                height="44px"
                                objectFit="cover"
                                className="avatar"
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    minWidth: '106px',
                                    height: '36px',
                                    textTransform: 'none',

                                    '&:hover': {
                                        background:
                                            'linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)),#FE2C55',
                                    },
                                }}
                                size="medium"
                            >
                                Follow
                            </Button>
                        </Stack>
                        <Stack direction="row" alignItems="center" pb="4px" sx={{ cursor: 'pointer' }}>
                            <Typography
                                component="h4"
                                variant="body1"
                                fontWeight="bold"
                                color="#161823"
                                fontSize="18px"
                                lineHeight="22px"
                            >
                                QuocNguyenPhu
                            </Typography>
                            <CheckCircleIcon
                                fontSize="small"
                                sx={{ ml: '6px', color: 'rgb(32, 213, 236)', width: '17px' }}
                            />
                        </Stack>
                        <Typography
                            fontSize="14px"
                            fontWeight="600"
                            color="#161823"
                            lineHeight="20px"
                            sx={{ cursor: 'pointer' }}
                        >
                            theanh28entertainment
                        </Typography>

                        <Stack direction="row" pt="10px" spacing="6px" fontSize="17px">
                            <Typography fontWeight="bold">9.3M</Typography>
                            <Typography color="#161823bf" paddingRight="6px">
                                Follower
                            </Typography>
                            <Typography fontWeight="bold">151.6M</Typography>
                            <Typography color="#161823bf">Likes</Typography>
                        </Stack>
                    </Box>
                )}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        cursor: 'pointer',
                        padding: '8px',
                        height: '48px',
                        '&:hover': {
                            background: 'rgba(22, 24, 35, 0.03)',
                        },
                    }}
                >
                    <Box width="32px" height="32px">
                        <Image
                            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1662372000&x-signature=Ea3ptkEAJZ7nVqrRuYTTysT%2FmbU%3D"
                            alt="avatar"
                            width="32px"
                            height="32px"
                            objectFit="cover"
                            className="avatar"
                        />
                    </Box>
                    <Box flex="1" ml="12px">
                        <Stack direction="row" alignItems="center">
                            <Typography component="h4" variant="body1" fontWeight="bold" color="#161823" lineHeight="1">
                                QuocNguyenPhu
                            </Typography>
                            <CheckCircleIcon
                                fontSize="small"
                                sx={{ ml: '6px', color: 'rgb(32, 213, 236)', width: '17px' }}
                            />
                        </Stack>
                        <Typography variant="body2" fontSize="12px" color="#161823bf">
                            Nguyễn Phú Quốc
                        </Typography>
                    </Box>
                </Stack>
            </Tippy>
        </Box>
    );
}
