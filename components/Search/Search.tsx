import { ModelSearch } from '@/models';
import { SearchAccount } from '@/services';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, Input, Stack, Typography } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import AccountItem from '../AccountItem/AccountItem';
import PopperWrapper from '../Popper/Wrapper';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDebounce } from '@/hooks';

export interface SearchProps {}

export default function Search(props: SearchProps) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResult, setSearchResult] = useState<ModelSearch[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        let searchAccount = async (): Promise<void> => {
            let res = await SearchAccount(debounced);
            setSearchResult(res);
            setLoading(false);
        };
        searchAccount();
    }, [debounced]);

    let handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    let handleClearSearchValue = (): void => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current?.focus();
    };

    return (
        <Tippy
            placement="bottom"
            interactive={true}
            visible={searchResult.length > 0 && showResult}
            onClickOutside={(): void => setShowResult(false)}
            render={(attrs) => (
                <Box component="div" {...attrs} tabIndex={-1} width="361px">
                    <PopperWrapper>
                        <Typography
                            color="rgba(22, 24, 35, 0.5)"
                            sx={{
                                fontWeight: '600',
                                padding: '5px 12px',
                            }}
                        >
                            Accounts
                        </Typography>
                        {searchResult.map((result: ModelSearch) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </Box>
            )}
        >
            <Stack
                width="361px"
                height="46px"
                direction="row"
                bgcolor="rgba(22, 24, 35, 0.06)"
                borderRadius="var(--search-border-radius)"
                pl="16px"
                alignItems="center"
                border="1.5px solid transparent"
                sx={{
                    '&:focus-within': {
                        borderColor: 'rgba(22, 24, 35, 0.2)',
                    },
                }}
            >
                <Input
                    placeholder="Search accounts and video"
                    spellCheck="false"
                    disableUnderline
                    sx={{
                        color: 'var(--black)',
                        fontSize: '16px',
                        backgroundColor: 'transparent',
                        outline: 'none',
                        height: '100%',
                        flex: 1,
                    }}
                    inputRef={inputRef}
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                    onFocus={() => setShowResult(true)}
                />
                {loading && (
                    <RefreshIcon
                        sx={{
                            marginRight: '8px',
                            color: 'rgba(22, 24, 35, 0.34)',
                            width: '20px',
                            animation: 'spinner 0.8s linear infinite',
                        }}
                    />
                )}
                {searchValue && !loading && (
                    <CancelIcon
                        sx={{
                            marginRight: '8px',
                            color: 'rgba(22, 24, 35, 0.34)',
                            width: '20px',
                            cursor: 'pointer',
                        }}
                        onClick={handleClearSearchValue}
                    />
                )}
                <Divider orientation="vertical" flexItem variant="middle" />
                <Box
                    width="52px"
                    height="100%"
                    textAlign="center"
                    sx={{
                        borderTopRightRadius: 'var(--search-border-radius)',
                        borderBottomRightRadius: 'var(--search-border-radius)',
                        '&:hover': {
                            backgroundColor: 'rgba(22, 24, 35, 0.03)',
                            cursor: 'pointer',
                        },
                    }}
                >
                    <SearchIcon
                        sx={{
                            height: '100%',
                            width: '28px',
                            color: `${searchValue ? 'rgba(22, 24, 35, 0.75)' : 'rgba(22, 24, 35, 0.34)'}`,
                        }}
                    />
                </Box>
            </Stack>
        </Tippy>
    );
}
