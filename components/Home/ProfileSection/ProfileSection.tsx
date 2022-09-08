import VideoPreview from '@/components/VideoPreview/VideoPreview';
import { Stack } from '@mui/material';
import HeaderProfile from './HeaderProfile';

export interface ProfileSectionProps {}

export function ProfileSection(props: ProfileSectionProps) {
    return (
        <Stack>
            <HeaderProfile />
            <VideoPreview />
        </Stack>
    );
}
