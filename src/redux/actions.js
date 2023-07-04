import { api } from "../Api/Api";

export const addArticles = (data) => ({ type: 'addArticles', data });


export const loadArticles = () => async (dispatch) => {
  /* if (api.searchId === '') {
       await api.getId();
   }*/

   const articles  = await api.getArticles();
   dispatch(addArticles(articles));

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
