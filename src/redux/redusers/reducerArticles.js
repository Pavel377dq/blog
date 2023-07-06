
export const reducerArticles = (state = { articles: [], page: 1 }, action) => {

   switch (action.type) {
       case 'getArticles': {
           const newState = { ...state };
           newState.articles = [ ...action.data];

           return newState;
       }
       case 'changePage': {

        const newState = { ...state };
        newState.page = action.page;
        return newState;
        
       }
       default: {
           return {
               ...state,
           };
       }
   }
};
