import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { TymIconOutLine } from '../Icons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Feedback } from '@/models';
import HeroPreview from '../Home/HeroSection/HeroPreview';

export interface CommentProps {
    data: Feedback;
}

export default function Comment({ data }: CommentProps) {
    let handleNumberFarorites = (number: number): string => {
        let n = number / 1000;
        if (n < 1) {
            return number.toString();
        }
        let view = n.toFixed(1);
        return view + 'K';
    };

    return (
        <Box mb="16px">
            <Stack direction="row" mb="16px" alignItems="flex-start">
                <Box mr="12px" width="40px" height="40px" sx={{ cursor: 'pointer' }}>
                    <Image
                        src={data.user.avatar}
                        alt="avatar"
                        width="40px"
                        height="40px"
                        className="avatar"
                        objectFit="cover"
                    />
                </Box>

                <Box flexGrow={1}>
                    <Link href="/@profile">
                        <MuiLink>
                            <HeroPreview nickname={data.user.nickname} bio={data.user.bio} user={data.user}>
                                <Typography
                                    fontSize="18px"
                                    fontWeight="bold"
                                    lineHeight="25px"
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {data.user.nickname}
                                </Typography>
                            </HeroPreview>
                        </MuiLink>
                    </Link>
                    <Typography
                        lineHeight="22px"
                        whiteSpace="pre-line"
                        sx={{
                            wordBreak: 'break-word',
                            mb: '6px',
                        }}
                    >
                        {data.comment}
                    </Typography>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography color="rgba(22, 24, 35, 0.5)" fontSize="14px">
                            {`${new Date(data.created_at).getDate()} - ${new Date(data.created_at).getMonth()}`}
                        </Typography>
                        <Typography sx={{ cursor: 'pointer', color: 'rgba(22, 24, 35, 0.5)', fontSize: '14px' }}>
                            Reply
                        </Typography>
                    </Stack>
                </Box>

                <Stack
                    alignItems="center"
                    justifyContent="center"
                    height="74px"
                    width="24px"
                    ml="18px"
                    pr="2px"
                    spacing={1}
                    color="rgba(22, 24, 35, 0.5)"
                >
                    <TymIconOutLine width="20px" height="20px" />
                    <Typography fontSize="12px" lineHeight="18px" color="rgba(22, 24, 35, 0.5)" fontWeight="600">
                        {handleNumberFarorites(data.likes_count)}
                    </Typography>
                </Stack>
            </Stack>

            <Stack direction="row" pl="52px" alignItems="center">
                <Typography
                    sx={{
                        fontWeight: '600',
                        fontSize: '14px',
                        color: 'rgba(22, 24, 35, 0.5)',
                        lineHeight: '20px',
                        cursor: 'pointer',

                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    View more replies (35)
                </Typography>
                <KeyboardArrowDownIcon sx={{ color: 'rgba(22, 24, 35, 0.5)' }} />
            </Stack>
        </Box>
    );
}
