import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export interface AuthenProps {
    isOpen: boolean;
    close: () => void;
}

export function Authen({ isOpen, close }: AuthenProps) {
    const [type, setType] = useState<string>('login');

    let changeType = (type: string) => {
        setType(type);
    };

    return (
        <Box>
            <Modal
                disableEnforceFocus
                open={isOpen}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                {type === 'login' ? (
                    <Login close={close} onChange={changeType} />
                ) : (
                    <Register close={close} onChange={changeType} />
                )}
            </Modal>
        </Box>
    );
}
