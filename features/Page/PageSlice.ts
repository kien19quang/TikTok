import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Page {
    pageNumber: number;
}

let initialState: Page = {
    pageNumber: 1,
};

export const PageSlice = createSlice({
    name: 'Page',
    initialState,
    reducers: {
        setPageNumber: (state: Page, action: PayloadAction<number>) => {
            return { ...state, pageNumber: action.payload };
        },
    },
});

export const { setPageNumber } = PageSlice.actions;

export default PageSlice.reducer;
