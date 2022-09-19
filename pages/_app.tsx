import '../styles/globals.css';
import { AppPropsWithLayout } from '@/models';
import { EmptyLayout } from '@/layouts';
import { SWRConfig } from 'swr';
import axiosClient from '@/ApiClient/axiosClient';
import { createEmotionCache } from '@/utils';
import theme from '@/utils/theme';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persisitor, store } from '@/app/store';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persisitor}>
                <CacheProvider value={clientSideEmotionCache}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />

                        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
                            <Layout>
                                <Component {...pageProps} />
                                <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                            </Layout>
                        </SWRConfig>
                    </ThemeProvider>
                </CacheProvider>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
