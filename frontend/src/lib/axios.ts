import axios from "axios";

let accessToken: string | null = localStorage.getItem("accessToken");

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // response না থাকলে crash আটকাবে
    if (!error.response) {
      return Promise.reject(error);
    }

    // refresh-token request এ আবার refresh call আটকাবে
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

        // optional
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
