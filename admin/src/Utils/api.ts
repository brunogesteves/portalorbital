import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  // baseURL: "/api/",
  withCredentials: true,
});

export const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/images`;
