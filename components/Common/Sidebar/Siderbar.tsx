import { Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';
import {
    HomeIcon,
    HomeIconActive,
    UserGroupIcon,
    UserGroupIconActive,
    LiveIcon,
    LiveIconActive,
} from '@/components/Icons';
import routes from '@/config/routes';
import SuggestedAccounts from '@/components/SuggestedAccounts/SuggestedAccounts';
import Discover from './Discover/Discover';
import FooterSidebar from './FooterSidebar/FooterSidebar';
import { Account } from '@/models/Account';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { GetFollowingsList, GetSuggestedUsers } from '@/services';

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
    const [page, setPage] = useState<number>(1);
    const [per_page, setPer_page] = useState<number>(20);
    const [listUserNumber, setListUserNumber] = useState<number>(1);
    const [suggestedAccounts, setSuggestedAccount] = useState<Account[]>([]);
    const [listUserFollowing, setListUserFollowing] = useState<Account[]>([]);

    const isLoggedIn = useAppSelector<boolean>((state: RootState) => state.user.isLoggedIn);
    const token = useAppSelector<string>((state: RootState) => state.user.token);

    useEffect(() => {
        let getSuggestedAccout = async () => {
            let res = await GetSuggestedUsers(page, per_page, token);
            setSuggestedAccount(res);
        };
        getSuggestedAccout();
    }, [page, per_page, token]);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        } else {
            let getFollowingsList = async () => {
                let res = await GetFollowingsList(listUserNumber, token);
                setListUserFollowing(res);
            };

            getFollowingsList();
        }
    }, [isLoggedIn, listUserNumber, token]);

    return (
        <Box
            component="aside"
            padding="20px 0 26px"
            position="fixed"
            top="60px"
            bottom="0"
            width="356px"
            bgcolor="white"
            pr="8px"
            sx={{
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '0px',
                },
                '&:hover::-webkit-scrollbar': {
                    width: '6px',
                },
            }}
        >
            <Menu>
                <MenuItem title="For You" to={routes.home} icon={<HomeIcon />} iconActive={<HomeIconActive />} />
                <MenuItem
                    title="Following"
                    to={routes.following}
                    icon={<UserGroupIcon />}
                    iconActive={<UserGroupIconActive />}
                />
                <MenuItem title="LIVE" to={routes.live} icon={<LiveIcon />} iconActive={<LiveIconActive />} />
            </Menu>
            <Divider sx={{ paddingTop: '12px' }} />
            <SuggestedAccounts label="Suggested Accounts" list={suggestedAccounts} pageNumber={page} />
            <Divider sx={{ paddingTop: '12px' }} />

            {isLoggedIn && listUserFollowing.length > 0 && (
                <>
                    <SuggestedAccounts
                        label="Following accounts"
                        list={listUserFollowing}
                        pageNumber={listUserNumber}
                    />
                    <Divider sx={{ paddingTop: '12px' }} />
                </>
            )}

            <Discover />
            <Divider sx={{ paddingTop: '12px' }} />
            <FooterSidebar />
        </Box>
    );
}
