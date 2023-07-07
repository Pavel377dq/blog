//import axios from "axios"

export const api = {
   baseUrl: 'https://blog.kata.academy/api',
   async getArticles(count = 0){
      const  response  = await fetch(`${this.baseUrl}/articles?offset=${count}`);
      //const {articles} = data;

      if (!response.ok) {
         throw new Error('Server Error!');
       }
       const data = await response.json();
   
       return data;
      //console.log(articles);
      //return articles;

   },

   async getArticle(slug){
      const response = await fetch(`${this.baseUrl}/articles/${slug}`);
   
       if (!response.ok) {
         throw new Error('Server Error!');
       }
       const data = await response.json();
   
       return data;
   }
}