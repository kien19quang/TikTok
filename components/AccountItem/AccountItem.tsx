import { ModelSearch } from '@/models';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

export interface AccountItemProps {
    data: ModelSearch;
    close: () => void;
}

export default function AccountItem({ data, close }: AccountItemProps) {
    const router = useRouter();

    let handleArriveProfile = () => {
        router.push(`/@${data.nickname}`);
        close();
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                cursor: 'pointer',
                padding: '6px 16px',
                '&:hover': {
                    background: 'rgba(22, 24, 35, 0.03)',
                },
            }}
            component="div"
            onClick={handleArriveProfile}
        >
            <Box width="40px" height="40px" borderRadius="50%" overflow="hidden">
                <Image src={data.avatar} alt="Avatar" objectFit="cover" width="40px" height="40px" />
            </Box>

            <Box flex="1" ml="12px">
                <Stack direction="row" alignItems="center">
                    <Typography fontWeight="500"> {data.full_name} </Typography>
                    {data.tick && <CheckCircleIcon fontSize="small" sx={{ ml: '6px', color: 'rgb(32, 213, 236)' }} />}
                </Stack>

                <Typography variant="body2" color="rgba(22, 24, 35, 0.5)">
                    {data.nickname}
                </Typography>
            </Box>
        </Stack>
    );
}
