import axios from 'axios';

const httpCaller = axios.create({
  baseURL: process.env.baseUrl
});

export default (ctx, inject) => {
  inject('axios', httpCaller);
};
