// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** adminEditBlogSystemInfo POST /api/blogSystem/admin/editBlogSystemInfo */
export async function adminEditBlogSystemInfoUsingPost(
  body: API.BlogSystem,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>(
    "/api/blogSystem/admin/editBlogSystemInfo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** adminSaveBlogSystemInfo POST /api/blogSystem/admin/saveBlogSystemInfo */
export async function adminSaveBlogSystemInfoUsingPost(
  body: API.AdminAddBlogSystemDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>(
    "/api/blogSystem/admin/saveBlogSystemInfo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** getBlogSystemInfo GET /api/blogSystem/getBlogSystemInfo */
export async function getBlogSystemInfoUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.ResultBlogSystemInfoVo_>(
    "/api/blogSystem/getBlogSystemInfo",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** getNewsList POST /api/blogSystem/news */
export async function getNewsListUsingPost(
  body: API.NewsDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultListNewsVo_>("/api/blogSystem/news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
