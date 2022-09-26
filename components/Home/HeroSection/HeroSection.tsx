import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { setIsReloadPage, setPageNumber } from '@/features/Page/PageSlice';
import { ModelVideo } from '@/models/Video';
import { GetVideosList } from '@/services/GetVideoService';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HeroItem from './HeroItem';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface HeroSectionProps {}

export function HeroSection(props: HeroSectionProps) {
    const pageNumber = useAppSelector<number>((state) => state.page.pageNumber);
    const [dataVideos, setDataVideos] = useState<ModelVideo[]>([]);

    const token = useAppSelector<string>((state) => state.user.token);

    const dispatch = useAppDispatch();

    useEffect(() => {
        let getVideosList = async () => {
            let res = await GetVideosList(pageNumber, token);
            setDataVideos((prev) => [...prev, ...res]);
        };

        getVideosList();
    }, [pageNumber, token]);

    let increasePageNumber = () => {
        dispatch(setPageNumber(pageNumber + 1));
    };

    return (
        <Box>
            <InfiniteScroll
                dataLength={dataVideos.length}
                next={increasePageNumber}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollThreshold={0.9}
            >
                {dataVideos.map((dataVideo: any) => {
                    return <HeroItem data={dataVideo} key={dataVideo.id} />;
                })}
            </InfiniteScroll>
        </Box>
    );
}
