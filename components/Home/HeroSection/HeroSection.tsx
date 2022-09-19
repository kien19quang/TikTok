import { useAppSelector } from '@/app/hooks';
import { User } from '@/models';
import { ModelVideo } from '@/models/Video';
import { GetVideosList } from '@/services/GetVideoService';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HeroItem from './HeroItem';

export interface HeroSectionProps {}

export function HeroSection(props: HeroSectionProps) {
    const pageNumber = useAppSelector<number>((state) => state.page.pageNumber);
    const [dataVideos, setDataVideos] = useState<ModelVideo[]>([]);

    const token = useAppSelector<string>((state) => state.user.token);

    useEffect(() => {
        let getVideosList = async () => {
            let res = await GetVideosList(pageNumber, token);
            setDataVideos(res);
        };

        getVideosList();
    }, [pageNumber]);

    return (
        <Box>
            {dataVideos.map((dataVideo: any) => {
                return <HeroItem data={dataVideo} key={dataVideo.id} />;
            })}
        </Box>
    );
}
