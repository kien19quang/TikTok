import { ModelMenuItem } from '@/models';
import { Box, Typography } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import React, { useState } from 'react';
import PopperWrapper from '../Wrapper';
import HeaderMenu from './HeaderMenu';
import MenuItem from './MenuItem';

export interface MenuProps {
    children: React.ReactElement;
    items: ModelMenuItem[];
    onChange: (item: ModelMenuItem) => void;
}

export interface HistoryProps {
    title?: string;
    data: ModelMenuItem[];
}

export default function Menu({ children, items, onChange }: MenuProps) {
    const [history, setHistory] = useState<HistoryProps[]>([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    data={item}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            let children: HistoryProps = {
                                title: item.children?.title,
                                data: item.children?.data ?? [],
                            };
                            setHistory((prev) => [...prev, children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    let handleBackMenu = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    let handleResetMenu = (): void => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Box>
            <Tippy
                interactive
                delay={[0, 700]}
                hideOnClick={false}
                placement="bottom-end"
                onHide={handleResetMenu}
                render={(attrs) => (
                    <Box component="div" {...attrs} tabIndex={-1} width="224px">
                        <PopperWrapper>
                            {history.length > 1 && <HeaderMenu title="Language" onBack={handleBackMenu} />}
                            <Box sx={{ overflowY: 'auto' }}>{renderItems()}</Box>
                        </PopperWrapper>
                    </Box>
                )}
            >
                {children}
            </Tippy>
        </Box>
    );
}
