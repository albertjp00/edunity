import axios from "axios";


const api = axios.create({
    baseURL :  'http://localhost:4000',
    withCredentials : true
})



api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=> Promise.reject(error)
)




// to Handle global response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized — redirecting to login...');
      // Optional: handle redirect here
    }
    return Promise.reject(error);
  }
);


export default api