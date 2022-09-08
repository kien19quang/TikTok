import { ModelVideo } from '@/models/Video';
import { GetVideosList } from '@/services/GetVideoService';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HeroItem from './HeroItem';

export interface HeroSectionProps {}

export function HeroSection(props: HeroSectionProps) {
    const [pageNumber, setPageNubmer] = useState<number>(1);
    const [dataVideos, setDataVideos] = useState<ModelVideo[]>([]);

    useEffect(() => {
        let getVideosList = async () => {
            let res = await GetVideosList(pageNumber);
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
