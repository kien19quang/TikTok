import images from '@/assets/images';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Menu from '../Popper/Menu/Menu';

import { MenuItems, ModelMenuItem } from '@/models';
import Link from 'next/link';
import Search from '../Search/Search';

export function Header() {
    let handleMenuChange = (item: ModelMenuItem) => {};

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

                    <Box width="50%">
                        <Search />
                    </Box>

                    <Stack width="22%" direction="row" spacing={2}>
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
                                    background:
                                        'linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)),#FE2C55',
                                },
                            }}
                            size="medium"
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
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
