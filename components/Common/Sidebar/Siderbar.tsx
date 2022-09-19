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
import { GetSuggestedUsers } from '@/services/Users';
import { Account } from '@/models/Account';

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
    const [page, setPage] = useState<number>(1);
    const [per_page, setPer_page] = useState<number>(20);
    const [suggestedAccounts, setSuggestedAccount] = useState<Account[]>([]);

    useEffect(() => {
        let getSuggestedAccout = async () => {
            let res = await GetSuggestedUsers(page, per_page);
            setSuggestedAccount(res);
        };

        getSuggestedAccout();
    }, [page, per_page]);

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
            <SuggestedAccounts label="Suggested Accounts" list={suggestedAccounts} />
            <Divider sx={{ paddingTop: '12px' }} />
            <Discover />
            <Divider sx={{ paddingTop: '12px' }} />
            <FooterSidebar />
        </Box>
    );
}
