import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { setIsReloadPage } from '@/features/Page/PageSlice';
import { ModelVideo } from '@/models/Video';
import { GetVideosList } from '@/services/GetVideoService';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HeroItem from './HeroItem';

export interface HeroSectionProps {}

export function HeroSection(props: HeroSectionProps) {
    const pageNumber = useAppSelector<number>((state) => state.page.pageNumber);
    const isReloadPage = useAppSelector<boolean>((state: RootState) => state.page.isReloadPage);
    const [dataVideos, setDataVideos] = useState<ModelVideo[]>([]);

    const token = useAppSelector<string>((state) => state.user.token);

    const dispatch = useAppDispatch();

    useEffect(() => {
        let getVideosList = async () => {
            let res = await GetVideosList(pageNumber, token);
            setDataVideos(res);
        };

        getVideosList();
    }, [pageNumber, token]);

    return (
        <Box>
            {dataVideos.map((dataVideo: any) => {
                return <HeroItem data={dataVideo} key={dataVideo.id} />;
            })}
        </Box>
    );
}
