import { MainLayout } from '@/layouts';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';
import styles from '../styles/Home.module.css';

const Home: NextPageWithLayout = () => {
    return <Box>Home</Box>;
};

Home.Layout = MainLayout;

export default Home;
