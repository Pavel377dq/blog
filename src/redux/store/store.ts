import { configureStore } from '@reduxjs/toolkit';

import articleListReducer from './articleListSlice.ts';
import articleSliceReducer from './articleSlice.ts';
import userSliceReducer from './userSlice.ts';

export const store = configureStore({
    reducer: {
        articleList: articleListReducer,
        article: articleSliceReducer,
        account: userSliceReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;


