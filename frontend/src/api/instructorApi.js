import axios from "axios";


const instructorApi = axios.create({
    baseURL :  'http://localhost:4000',
    withCredentials : true
})



instructorApi.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('instructor');
        if(token){
            config.headers.Authorization = `Bearer ${token}`    
        }
        return config
    },
    (error)=> Promise.reject(error)
)




// to Handle global response errors
instructorApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized — redirecting to login...');
      // Optional: handle redirect here
      console.log('redirect to login');
      
    }
    return Promise.reject(error);
  }
);


export default instructorApi