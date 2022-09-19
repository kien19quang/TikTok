import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormLogin } from './FormLogin';
import { FormSignUp } from './FormSignup';
import { Login } from './Login';
import { Register } from './Register';

export interface AuthenProps {
    isOpen: boolean;
    close: () => void;
}

const style = {
    position: 'relative',
    width: 483,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: '10px',
};

const animationShow = 'fade-in 0.5s, grow-up 0.5s';
const animationHide = 'fade-out 0.5s forwards, grow-down 0.5s forwards';

export function Authen({ isOpen, close }: AuthenProps) {
    const [type, setType] = useState<string>('login');
    const [closing, setClosing] = useState<boolean>(true);

    let modalRef = useRef<HTMLElement>();

    let changeType = (type: string) => {
        setType(type);
    };

    let handleClosing = useCallback(() => {
        setClosing(false);
        setType('login');

        modalRef.current?.addEventListener(
            'animationend',
            () => {
                setClosing(true);
                close();
            },
            { once: true },
        );
    }, [close]);

    let renderComponent = () => {
        switch (type) {
            case 'login':
                return <Login onChange={changeType} />;
            case 'register':
                return <Register onChange={changeType} />;
            case 'Form Login':
                return <FormLogin onChange={changeType} close={handleClosing} />;
            case 'Form Signup':
                return <FormSignUp onChange={changeType} />;

            default:
                return <Login onChange={changeType} />;
        }
    };

    useEffect(() => {
        let handleKeydown = (e: KeyboardEvent) => {
            if (e.code === 'Escape' && isOpen) {
                handleClosing();
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [handleClosing, isOpen]);

    let handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.code === 'Escape' && isOpen) {
            handleClosing();
        }
    };

    return (
        <Box>
            <Modal
                disableAutoFocus
                hideBackdrop={!closing}
                open={isOpen}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    sx={{ ...style, animation: `${closing ? animationShow : animationHide}` }}
                    ref={modalRef}
                    component="div"
                    onKeyDown={handleKeyDown}
                >
                    {renderComponent()}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '24px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            right: '24px',
                            width: '24px',
                            height: '24px',
                            background: 'rgba(22, 24, 35, 0.03)',
                            transform: 'scale(1.7)',
                        }}
                        onClick={handleClosing}
                    >
                        <CloseIcon sx={{ width: '15px', height: '15px' }} />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
