import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const imageUrl = `${API_BASE}/images`;
