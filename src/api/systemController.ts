// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** getBannerPicture GET /api/system/banner */
export async function getBannerPictureUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.ResultString_>("/api/system/banner", {
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
