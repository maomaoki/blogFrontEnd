// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** getBannerInfo GET /api/system/bannerInfo */
export async function getBannerInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultBannerInfoVo_>("/api/system/bannerInfo", {
    method: "GET",
    ...(options || {}),
  });
}

/** getSystemInfo GET /api/system/info */
export async function getSystemInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultSystemInfoVo_>("/api/system/info", {
    method: "GET",
    ...(options || {}),
  });
}
