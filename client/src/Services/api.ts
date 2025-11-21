import axios from "axios";
import type {
  LoginForm,
  RegisterForm,
  AuthResponse,
  User,
} from "../Types/types";

const strapi = axios.create({
  baseURL: "http://localhost:1337",
  timeout: 10000,
});

export const getApi = (endpoint: string) => {
  return strapi.get(endpoint);
};

export const postApi = (endpoint: string, payload: Record<string, unknown>) => {
  return strapi.post(endpoint, payload);
};
// Add request interceptor for debugging
strapi.interceptors.request.use(
  (config) => {
    console.log(
      "Making API request:",
      config.method?.toUpperCase(),
      config.url
    );
    console.log("Request data:", config.data);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
strapi.interceptors.response.use(
  (response) => {
    console.log("API response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const authService = {
  // Try different endpoint variations
  register: async (userData: RegisterForm): Promise<AuthResponse> => {
    try {
      // Try without /api prefix first
      const response = await strapi.post("/auth/local/register", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      return response.data;
    } catch (error: any) {
      // If that fails, try with /api prefix
      try {
        const response = await strapi.post("/api/auth/local/register", {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        });
        return response.data;
      } catch (secondError: any) {
        console.error("Both registration endpoints failed");
        throw secondError;
      }
    }
  },

  login: async (credentials: LoginForm): Promise<AuthResponse> => {
    try {
      // Try without /api prefix first
      const response = await strapi.post("/auth/local", {
        identifier: credentials.identifier,
        password: credentials.password,
      });
      return response.data;
    } catch (error: any) {
      // If that fails, try with /api prefix
      try {
        const response = await strapi.post("/api/auth/local", {
          identifier: credentials.identifier,
          password: credentials.password,
        });
        return response.data;
      } catch (secondError: any) {
        console.error("Both login endpoints failed");
        throw secondError;
      }
    }
  },

  getCurrentUser: async (token: string): Promise<User> => {
    try {
      const response = await strapi.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      // Try with /api prefix
      try {
        const response = await strapi.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (secondError: any) {
        console.error("Both user endpoints failed");
        throw secondError;
      }
    }
  },
};

export default strapi;
