import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { Feedback, MenuComment, User } from '@/models';
import { deleteAComment, likeAComment, unlikeAComment } from '@/services/Feedback';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UpdateIcon from '@mui/icons-material/Update';
import { Box, Button, Link as MuiLink, Stack, Typography } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import HeroPreview from '../Home/HeroSection/HeroPreview';
import { MoreIcon, TymIconActive, TymIconOutLine } from '../Icons';
export interface CommentProps {
    data: Feedback;
    removeComment: (id: number) => void;
}

const menuForMe: MenuComment[] = [
    { icon: DeleteIcon, title: 'Delete', type: 'delete' },
    { icon: UpdateIcon, title: 'Update', type: 'update' },
];

const menuForUser: MenuComment[] = [{ icon: FlagOutlinedIcon, title: 'Report', type: 'report' }];

export default function Comment({ data, removeComment }: CommentProps) {
    const userData = useAppSelector<User>((state: RootState) => state.user.data);
    const token = useAppSelector<string>((state: RootState) => state.user.token);
    const pageNumber = useAppSelector<number>((state: RootState) => state.page.pageNumber);

    const [isLiked, setIsLiked] = useState<boolean>(data.is_liked);
    const [dataComment, setDataComment] = useState<Feedback>(data);

    const forMe = data.user.id === userData.id;

    let handleNumberFarorites = (number: number): string => {
        let n = number / 1000;
        if (n < 1) {
            return number.toString();
        }
        let view = n.toFixed(1);
        return view + 'K';
    };

    let handleLikeComment = async () => {
        if (isLiked) {
            setIsLiked(false);
            console.log(dataComment.id);
            let res = await unlikeAComment(dataComment.id, pageNumber, token);
            setDataComment(res);
        } else {
            setIsLiked(true);
            let res = await likeAComment(dataComment.id, pageNumber, token);
            setDataComment(res);
        }
    };

    let handleComment = async (type: string) => {
        if (type === 'delete') {
            removeComment(data.id);
            await deleteAComment(data.id, pageNumber, token);
        }
    };

    let handleRenderMenu = (): React.ReactNode => {
        if (forMe) {
            return (
                <Box
                    sx={{
                        width: '100%',
                        background: 'rgb(255, 255, 255)',
                        boxShadow: 'rgb(0 0 0 / 12%) 0px 2px 12px',
                        borderRadius: '8px',
                    }}
                >
                    {menuForMe.map((item, index) => {
                        let Icon = item.icon;

                        return (
                            <Button
                                variant="text"
                                key={index}
                                onClick={() => handleComment(item.type)}
                                sx={{
                                    color: 'black',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    height: '64px',

                                    '&:hover': {
                                        color: '#fe2c55',
                                    },
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1} padding="8px 16px">
                                    <Icon />
                                    <Typography fontWeight="500" textTransform="none">
                                        {item.title}
                                    </Typography>
                                </Stack>
                            </Button>
                        );
                    })}
                </Box>
            );
        } else {
            return (
                <Box
                    sx={{
                        width: '100%',
                        background: 'rgb(255, 255, 255)',
                        boxShadow: 'rgb(0 0 0 / 12%) 0px 2px 12px',
                        borderRadius: '8px',
                    }}
                >
                    {menuForUser.map((item, index) => {
                        let Icon = item.icon ?? 'div';

                        return (
                            <Button
                                variant="text"
                                key={index}
                                sx={{
                                    color: 'black',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    height: '64px',

                                    '&:hover': {
                                        color: '#fe2c55',
                                    },
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1} padding="8px 16px">
                                    <Icon />
                                    <Typography fontWeight="500" textTransform="none">
                                        {item.title}
                                    </Typography>
                                </Stack>
                            </Button>
                        );
                    })}
                </Box>
            );
        }
    };

    return (
        <Box mb="16px">
            <Stack direction="row" mb="16px" alignItems="flex-start">
                <Box mr="12px" width="40px" height="40px" sx={{ cursor: 'pointer' }}>
                    <Image
                        src={dataComment.user.avatar}
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
                            <HeroPreview
                                nickname={dataComment.user.nickname}
                                bio={dataComment.user.bio}
                                user={dataComment.user}
                            >
                                <Typography
                                    fontSize="18px"
                                    fontWeight="bold"
                                    lineHeight="25px"
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {dataComment.user.nickname}
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
                        {dataComment.comment}
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
                    ml="18px"
                    height="74px"
                    pr="2px"
                    width="40px"
                    color="rgba(22, 24, 35, 0.5)"
                >
                    <Tippy
                        interactive
                        hideOnClick={false}
                        placement="bottom-start"
                        render={(attrs) => {
                            return (
                                <Box component="div" {...attrs} tabIndex={-1} width="200px">
                                    {handleRenderMenu()}
                                </Box>
                            );
                        }}
                    >
                        <Stack alignItems="center" justifyContent="center">
                            <MoreIcon className="more-icon" />
                        </Stack>
                    </Tippy>

                    <Stack alignItems="center" justifyContent="center" component="div" onClick={handleLikeComment}>
                        {isLiked ? <TymIconActive width="20px" height="20px" /> : <TymIconOutLine />}
                        <Typography
                            fontSize="12px"
                            lineHeight="18px"
                            color="rgba(22, 24, 35, 0.5)"
                            fontWeight="600"
                            mt="6px"
                        >
                            {handleNumberFarorites(dataComment.likes_count)}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            {/*<Stack direction="row" pl="52px" alignItems="center">
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
            </Stack>*/}
        </Box>
    );
}
