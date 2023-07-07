import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../Api/Api';


export const fetchArticle = createAsyncThunk('article/fetchArticle', async (slug, { rejectWithValue }) => {
   try {
     const data = await api.getArticle(slug);
     return data;
   } catch (error) {
     return rejectWithValue(`${error}`);
   }
 });


 

 
const initialState = {
   article: {
     slug: '',
     title: '',
     description: '',
     body: '',
     tagList: [''],
     createdAt: '2023-06-18T16:07:31.212Z',
     updatedAt: '2023-06-18T16:07:31.212Z',
     favorited: true,
     favoritesCount: 0,
     author: {
       username: '',
       bio: '',
       image: '',
       following: false,
     },
   },
   status: null,
   error: null
 };


export const articleSlice = createSlice({
   name: 'article',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder.addCase(fetchArticle.pending, (state) => {
       state.status = 'pending';
     });
     builder.addCase(fetchArticle.fulfilled, (state, action) => {
       state.article = action.payload.article;
       state.status = 'fulfilled';
     });
     builder.addCase(fetchArticle.rejected, (state, action) => {
       state.error = `${action.payload}`;
       state.status = 'rejected';
     });
   },
 });
 
 export const selectArticle = (state) => state.article.article;
 export const selectStatus = (state) => state.article.status;
 export const selectError = (state) => state.article.error;
 
 export default articleSlice.reducer;