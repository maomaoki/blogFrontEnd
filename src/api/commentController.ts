// @ts-ignore
/* eslint-disable */
import request from "@/axios";

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
