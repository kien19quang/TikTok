import { Box, Link as MuiLink, Stack, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Tippy from '@tippyjs/react/headless';
import Image from 'next/image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface HeroPreviewProps {
    nickname: string;
    bio: string;
}

export default function HeroPreview({ nickname, bio }: HeroPreviewProps) {
    return (
        <Box>
            <Tippy
                interactive
                delay={[800, 0]}
                placement="bottom-start"
                offset={[-70, 35]}
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
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/20fd837c82944e9cf55c9f37f9281f19~c5_100x100.jpeg?x-expires=1662458400&x-signature=PFwF5vWF5KIehubo6eNntHCYMLI%3D"
                                alt="avatar"
                                width="44px"
                                height="44px"
                                objectFit="cover"
                                className="avatar"
                            />
                            <Button
                                variant="outlined"
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    minWidth: '106px',
                                    height: '36px',
                                    textTransform: 'none',
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
                                {nickname}
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
                            {bio}
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
                <Stack direction="row" alignItems="center">
                    <Link href="/@lonelyzedlol">
                        <MuiLink
                            sx={{
                                marginRight: '4px',
                            }}
                        >
                            <Typography
                                component="h3"
                                variant="body1"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    lineHeight: '25px',
                                }}
                            >
                                {nickname}
                            </Typography>
                        </MuiLink>
                    </Link>
                    <Typography
                        fontSize="14px"
                        lineHeight="25px"
                        component="h4"
                        variant="body1"
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                        {bio}
                    </Typography>
                </Stack>
            </Tippy>
        </Box>
    );
}
