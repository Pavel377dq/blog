
export const reducerArticles = (state = { articles: [] }, action) => {

   switch (action.type) {
       case 'addArticles': {
           const newState = { ...state };

           newState.articles = [...newState.articles, ...action.data];

           return newState;
       }
       default: {
           return {
               ...state,
           };
       }
   }
};
