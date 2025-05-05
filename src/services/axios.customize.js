import axios from "axios";
import { getRefreshToken } from "./api.service";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        if (response.data && response.data.data) return response.data;
        return response;
    },
    async function (error) {
        // Handle 401 errors and refresh token
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true; // Prevent infinite retry loop

            const res = await getRefreshToken();
            if (res.data) {
                localStorage.setItem("access_token", res.data.access_token)
                originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                return instance(originalRequest); // Retry the original request
            } else {
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            }
        }

        // If refresh token fails or other errors occur
        return error.response.data;
    }
);

export default instance;