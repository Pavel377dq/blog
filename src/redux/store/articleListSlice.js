import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import {api} from '../../Api/Api';


export const fetchArticles = createAsyncThunk(
   'articleList/fetchArticles',
   async (page, { rejectWithValue }) => {
     try {
       const data = await api.getArticles((page-1)*20);
       return data;
     } catch (error) {
       return rejectWithValue(`${error}`);
     }
   }
 );

 export const articlesAdapter = createEntityAdapter({
   selectId: (article) => article.slug,
 });
 
 const initialState = articlesAdapter.getInitialState({
   articlesCount: 0,
   currentPage: 1,
   status: null,
   error: null
 });




 export const articleListSlice = createSlice({
   name: 'articleList',
   initialState,
   reducers: {

     setCurrentPage: (state, action) => {
       state.currentPage = action.payload;
     },
   },
   extraReducers: (builder) => {
     builder.addCase(fetchArticles.pending, (state) => {
      console.log(state,'STATE');
       state.status = 'pending';
     });
     builder.addCase(fetchArticles.fulfilled, (state, action) => {
      console.log(action.payload.articles,'action.payload.articles');
       articlesAdapter.setAll(state, action.payload.articles);
       console.log(state,'STATE');
       state.articlesCount = action.payload.articlesCount;
       state.status = 'fulfilled';
     });
     builder.addCase(fetchArticles.rejected, (state, action) => {
       state.error = `${action.payload}`;
       state.status = 'rejected';
     });
   },
 });

 
export const { selectAll: selectAllArticles } = articlesAdapter.getSelectors((state) => state.articleList);
//export const selectAllArticles = (state) => state.articleList.entities.articles
export const selectArticlesCount = (state) => state.articleList.articlesCount;
export const selectStatus = (state) => state.articleList.status;
export const selectError = (state) => state.articleList.error;
export const selectCurrentPage = (state) => state.articleList.currentPage;

export const { setCurrentPage } = articleListSlice.actions;

export default articleListSlice.reducer;