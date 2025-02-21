// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** getSystemInfo GET /api/system/info */
export async function getSystemInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultSystemInfoVo_>("/api/system/info", {
    method: "GET",
    ...(options || {}),
  });
}
