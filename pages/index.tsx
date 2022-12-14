import { HeroSection } from '@/components/Home/HeroSection';
import { MainLayout } from '@/layouts';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';

const Home: NextPageWithLayout = () => {
    return (
        <Box>
            <HeroSection />
        </Box>
    );
};

Home.Layout = MainLayout;

export default Home;
