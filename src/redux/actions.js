import { api } from "../Api/Api";

export const getArticles = (data) => ({ type: 'getArticles', data });

export const setPage = (page) => ({type: 'changePage', page});
export const loadArticles = (page) => async (dispatch) => {
  /* if (api.searchId === '') {
       await api.getId();
   }*/

   const articles  = await api.getArticles((page-1)*20);
   dispatch(getArticles(articles));

  /* try {
       const { tickets, dataLoadStop } = await api.getTickets();

       if (tickets.length && !dataLoadStop) {
           dispatch(initData(tickets));
       }
   } catch (error) {
       if(error.message !== 'Network Error'){
           dispatch(initData([]));
       }
   }*/
};
