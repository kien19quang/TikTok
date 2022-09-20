import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Page {
    pageNumber: number;
    isReloadPage: boolean;
}

let initialState: Page = {
    pageNumber: 1,
    isReloadPage: false,
};

export const PageSlice = createSlice({
    name: 'Page',
    initialState,
    reducers: {
        setPageNumber: (state: Page, action: PayloadAction<number>) => {
            return { ...state, pageNumber: action.payload };
        },

        setIsReloadPage: (state: Page, action: PayloadAction<boolean>) => {
            return { ...state, isReloadPage: action.payload };
        },
    },
});

export const { setPageNumber, setIsReloadPage } = PageSlice.actions;

export default PageSlice.reducer;
