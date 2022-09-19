import { Action, configureStore } from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist';
import userReducer, { user } from '@/features/Authen/AuthSlice';
import pageReducer, { Page } from '@/features/Page/PageSlice';
import persistReducer from 'redux-persist/lib/persistReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistConfig,
    key: 'user',
    whitelist: ['data', 'token', 'isLoggedIn'],
};

export const store = configureStore({
    reducer: {
        user: persistReducer<user>(userPersistConfig, userReducer),
        page: persistReducer<Page>(persistConfig, pageReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(thunk),
});

export const persisitor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
