import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (token) {
    localStorage.setItem("accessToken", token);
    console.log("Access Token Set:", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};

export const getAccessToken = () => {
  if (!accessToken) {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken;
};

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Initialize token from localStorage on app start
const storedToken = localStorage.getItem("accessToken");
if (storedToken) {
  accessToken = storedToken;
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Bearer Token Added to Request");
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    
    if (!error.response) {
      return Promise.reject(error);
    }

    
    const isRefreshCall = originalRequest.url?.includes("/auth/refresh-token");

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshCall
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh-token");

        const newAccessToken = response.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh Token Expired", refreshError);

        setAccessToken(null);

       
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
