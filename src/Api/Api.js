import axios from "axios"

export const api = {
   baseUrl: 'https://blog.kata.academy/api',
   async getArticles(){
      const  {data}  = await axios.get(`${this.baseUrl}/articles`);
      const {articles} = data;
      //console.log(articles);
      return articles;

   }
}