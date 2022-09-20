import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export interface subMenu {
    title: string;
    data: ModelMenuItem[];
}

export interface ModelMenuItem {
    code?: string;
    icon?: OverridableComponent<SvgIconTypeMap> & { muiName: string };
    title: string;
    children?: subMenu;
}

export type MenuComment = ModelMenuItem & {
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
    type: string;
};

export const MenuItems: ModelMenuItem[] = [
    {
        icon: LanguageIcon,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: HelpOutlineIcon,
        title: 'Feedback and help',
    },
    {
        icon: KeyboardIcon,
        title: 'Keyboard shortcuts',
    },
];
