import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/admin'
    : '/aladdin/admin';

const Service = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: '*/*',
  },
});

Service.interceptors.request.use(config => {
  const token = "hello";
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

Service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const err = error.response;
    console.log("Error: ", err);
    // if (err.status >= 400 && err.status <= 404
    //   || err.status >= 500 && err.status <= 505) {
    //   window.location.href = '/home';
    // }
    return Promise.reject({
      status: err.status,
      message: err.message || '',
    });
  }
);

export default Service;
