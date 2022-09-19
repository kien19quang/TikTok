import images from '@/assets/images';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Menu from '../Popper/Menu/Menu';
import { useAppSelector } from '@/app/hooks';
import { MenuItems, ModelMenuItem } from '@/models';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import { useState } from 'react';
import { Authen } from '../Auth';
import { MessagesIcon, NotificationsIcon } from '../Icons';
import Search from '../Search/Search';
import 'tippy.js/dist/tippy.css';
export function Header() {
    let handleMenuChange = (item: ModelMenuItem) => {};
    let [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

    let handleLogin = () => {
        setIsOpenModal(true);
    };

    let handleClose = () => {
        setIsOpenModal(false);
    };

    let renderByIsLoggedIn = () => {
        if (isLoggedIn) {
            return (
                <Stack direction="row" alignItems="center" fontWeight="bold">
                    <Tippy content="Messages" placement="bottom" interactive>
                        <Stack height="32px" padding="3px 3px 0" sx={{ cursor: 'pointer' }} alignItems="center">
                            <MessagesIcon />
                        </Stack>
                    </Tippy>
                    <Tippy content="Notifications" placement="bottom" interactive>
                        <Stack sx={{ cursor: 'pointer', ml: '16px' }} alignItems="center">
                            <NotificationsIcon />
                        </Stack>
                    </Tippy>

                    <Box>
                        <Menu items={MenuItems} onChange={handleMenuChange}>
                            <Box width="32px" height="32px" ml="24px">
                                <Image
                                    src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/083ab11e001e50d028ef865b2f0eb91b~c5_720x720.jpeg?x-expires=1663326000&x-signature=BtBYwX1XLpW%2B0R5mabrDE6kNArs%3D"
                                    width="32px"
                                    height="32px"
                                    className="avatar"
                                />
                            </Box>
                        </Menu>
                    </Box>
                </Stack>
            );
        } else {
            return (
                <>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            minWidth: '100px',
                            height: '36px',
                            textTransform: 'none',

                            '&:hover': {
                                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)),#FE2C55',
                            },
                        }}
                        size="medium"
                        onClick={handleLogin}
                    >
                        Log in
                    </Button>

                    <Box>
                        <Menu items={MenuItems} onChange={handleMenuChange}>
                            <MoreVertIcon
                                sx={{
                                    height: '36px',
                                    cursor: 'pointer',
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }}
                            />
                        </Menu>
                    </Box>
                </>
            );
        }
    };
    return (
        <Box
            boxShadow="0px 1px 1px rgb(0 0 0 / 12%)"
            position="fixed"
            left="0"
            right="0"
            top="0"
            bgcolor="white"
            zIndex="10"
        >
            <Container component="header">
                <Stack direction="row" alignItems="center" height="60px" width="100%" paddingX="12px">
                    <Link href="/" passHref>
                        <Box minWidth="118px" width="28%" sx={{ cursor: 'pointer' }}>
                            <Image src={images.logo} alt="Logo Tiktok" />
                        </Box>
                    </Link>

                    <Box width="49%">
                        <Search />
                    </Box>

                    <Stack width="23%" direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                minWidth: '110px',
                                border: '1px solid rgba(22, 24, 35, 0.12)',
                                textTransform: 'none',
                                height: '37px',

                                '&:hover': {
                                    backgroundColor: 'rgba(22, 24, 35, 0.03)',
                                    border: '1px solid rgba(22, 24, 35, 0.12)',
                                },
                            }}
                            size="medium"
                        >
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <AddIcon />
                                <Typography fontSize="16px" fontWeight="medium">
                                    Upload
                                </Typography>
                            </Stack>
                        </Button>

                        {renderByIsLoggedIn()}
                    </Stack>
                </Stack>
            </Container>

            <Authen isOpen={isOpenModal} close={handleClose} />
        </Box>
    );
}
