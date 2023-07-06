import axios from "axios"

export const api = {
   baseUrl: 'https://blog.kata.academy/api',
   async getArticles(count = 0){
      const  {data}  = await axios.get(`${this.baseUrl}/articles?offset=${count}`);
      const {articles} = data;
      //console.log(articles);
      return articles;

   }
}