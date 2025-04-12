// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** collectArticle POST /api/articleCollect/collectArticle */
export async function collectArticleUsingPost(
  body: API.CollectArticleDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>("/api/articleCollect/collectArticle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCollectArticle POST /api/articleCollect/delete */
export async function deleteCollectArticleUsingPost(
  body: API.CollectArticleDeleteDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>("/api/articleCollect/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getIsCollectArticleByArticleIdAndUserId GET /api/articleCollect/get/${param0} */
export async function getIsCollectArticleByArticleIdAndUserIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIsCollectArticleByArticleIdAndUserIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { articleId: param0, ...queryParams } = params;
  return request<API.ResultBoolean_>(`/api/articleCollect/get/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** collectArticlePage POST /api/articleCollect/page */
export async function collectArticlePageUsingPost(
  body: API.CollectArticlePageDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultPageCollectArticleVo_>("/api/articleCollect/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
