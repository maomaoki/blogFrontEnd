// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** commentListByLatest GET /api/comment/latest/${param0} */
export async function commentListByLatestUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.commentListByLatestUsingGETParams,
  options?: { [key: string]: any }
) {
  const { size: param0, ...queryParams } = params;
  return request<API.ResultListCommentVo_>(`/api/comment/latest/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** commentPageByArticleId POST /api/comment/page */
export async function commentPageByArticleIdUsingPost(
  body: API.CommentByArticlePageDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultPageCommentVo_>("/api/comment/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** saveComment POST /api/comment/save */
export async function saveCommentUsingPost(
  body: API.CommentSaveDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>("/api/comment/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
