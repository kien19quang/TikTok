import { Box, Divider } from '@mui/material';
import * as React from 'react';
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

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
    return (
        <Box component="aside" padding="20px 0 26px" overflow="auto">
            <Menu>
                <MenuItem title="For Your" to={routes.home} icon={<HomeIcon />} iconActive={<HomeIconActive />} />
                <MenuItem
                    title="Following"
                    to={routes.following}
                    icon={<UserGroupIcon />}
                    iconActive={<UserGroupIconActive />}
                />
                <MenuItem title="LIVE" to={routes.live} icon={<LiveIcon />} iconActive={<LiveIconActive />} />
            </Menu>
            <Divider sx={{ paddingTop: '12px' }} />
            <SuggestedAccounts label="Suggested Accounts" />
            <Divider sx={{ paddingTop: '12px' }} />
            <Discover />
            <Divider sx={{ paddingTop: '12px' }} />
            <FooterSidebar />
        </Box>
    );
}
