// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** adminAddArticle POST /api/article/admin/add */
export async function adminAddArticleUsingPost(
  body: API.AdminAddArticleDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultLong_>("/api/article/admin/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminDeleteArticle POST /api/article/admin/delete */
export async function adminDeleteArticleUsingPost(
  body: API.AdminDeleteArticleDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>("/api/article/admin/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminEditArticle POST /api/article/admin/edit */
export async function adminEditArticleUsingPost(
  body: API.AdminEditArticleDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultLong_>("/api/article/admin/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminGetEditArticleById GET /api/article/admin/edit/${param0} */
export async function adminGetEditArticleByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.adminGetEditArticleByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultArticle_>(`/api/article/admin/edit/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** adminPageArticle POST /api/article/admin/page */
export async function adminPageArticleUsingPost(
  body: API.AdminPageArticleDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultPageArticleVo_>("/api/article/admin/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getArticleById GET /api/article/get/${param0} */
export async function getArticleByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultArticleVo_>(`/api/article/get/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getArticleByIdAndPassword POST /api/article/get/encrypt */
export async function getArticleByIdAndPasswordUsingPost(
  body: API.GetArticleByPasswordDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultArticleVo_>("/api/article/get/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
