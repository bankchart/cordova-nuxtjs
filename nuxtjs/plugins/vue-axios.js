import axios from 'axios';

const httpCaller = axios.create({
  baseURL: process.env.BASE_URL
});

export default (ctx, inject) => {
  inject('axios', httpCaller);
};
