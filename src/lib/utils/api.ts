import { IComment } from "@models/comments";
import { IEvent } from "@models/events";
import axios, { AxiosRequestConfig } from "axios";
import { WithId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const isProd = process.env.NODE_ENV === "production";
const baseURL = isProd ? process.env.PROD_API_URL : process.env.DEV_API_URL;

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  baseURL,
});

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.request<T>(config);
  return response.data;
};

export const http = {
  get: <T>(
    url: string,
    config: AxiosRequestConfig & RequestInit = {}
  ): Promise<T> => {
    return request<T>({
      url,
      method: "GET",
      ...config,
    });
  },
  post: <T, D>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> & RequestInit = {}
  ): Promise<T> => {
    return request<T>({
      url,
      method: "POST",
      ...config,
      data,
    });
  },
  put: <T, D>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> & RequestInit = {}
  ): Promise<T> => {
    return request<T>({
      url,
      method: "PUT",
      ...config,
      data,
    });
  },
  patch: <T, D>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> & RequestInit = {}
  ): Promise<T> => {
    return request<T>({
      url,
      method: "PATCH",
      ...config,
      data,
    });
  },
  delete: <T, D>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> & RequestInit = {}
  ): Promise<T> => {
    return request<T>({
      url,
      method: "DELETE",
      ...config,
      data,
    });
  },
};

export const getFormattedEvent = (event: WithId<IEvent>) => ({
  ...event,
  id: event._id.toString(),
});

export const getEventYears = (event: WithId<IEvent>) => {
  return [
    new Date(event.startDate).getFullYear(),
    new Date(event.endDate).getFullYear(),
  ];
};

export const getFormattedComment = (comment: WithId<IComment>) => ({
  ...comment,
  id: comment._id.toString(),
});

export const allowCors =
  (fn: (req: NextRequest, route?: unknown) => Promise<NextResponse<unknown>>) =>
  async (req: NextRequest) => {
    const headers = new Headers(req.headers as HeadersInit);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Origin", "*");
    const origin = req.headers.get("origin");
    if (origin) headers.set("Access-Control-Allow-Origin", origin);
    headers.set(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    NextResponse.next({
      request: {
        headers,
      },
    });

    if (req.method === "OPTIONS") {
      NextResponse.json({}, { status: 200 });
      return;
    }

    return await fn(req);
  };
