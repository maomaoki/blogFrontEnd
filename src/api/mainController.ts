// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** email GET /api/email */
export async function emailUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>("/api/email", {
    method: "GET",
    ...(options || {}),
  });
}

/** health GET /api/health */
export async function healthUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>("/api/health", {
    method: "GET",
    ...(options || {}),
  });
}

/** redisDelete GET /api/redis/delete */
export async function redisDeleteUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>("/api/redis/delete", {
    method: "GET",
    ...(options || {}),
  });
}

/** redisGet GET /api/redis/get */
export async function redisGetUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseObject_>("/api/redis/get", {
    method: "GET",
    ...(options || {}),
  });
}

/** redisHas GET /api/redis/has */
export async function redisHasUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>("/api/redis/has", {
    method: "GET",
    ...(options || {}),
  });
}

/** redisSet GET /api/redis/set */
export async function redisSetUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>("/api/redis/set", {
    method: "GET",
    ...(options || {}),
  });
}
