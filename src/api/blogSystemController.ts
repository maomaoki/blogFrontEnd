// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** getBannerInfo GET /api/blogSystem/bannerInfo */
export async function getBannerInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultBannerInfoVo_>("/api/blogSystem/bannerInfo", {
    method: "GET",
    ...(options || {}),
  });
}

/** getBlogSystemInfo GET /api/blogSystem/getBlogSystemInfo */
export async function getBlogSystemInfoUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.ResultBlogSystem_>("/api/blogSystem/getBlogSystemInfo", {
    method: "GET",
    ...(options || {}),
  });
}
