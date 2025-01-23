// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** adminAddUser POST /api/user/admin/add */
export async function adminAddUserUsingPost(
  body: API.AdminUserAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/user/admin/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminDeleteUser POST /api/user/admin/delete */
export async function adminDeleteUserUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/admin/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminGetUserById POST /api/user/admin/get/user */
export async function adminGetUserByIdUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUser_>("/api/user/admin/get/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminGetUserVoById POST /api/user/admin/get/userVo */
export async function adminGetUserVoByIdUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVo_>("/api/user/admin/get/userVo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminUserQuery POST /api/user/admin/list/page */
export async function adminUserQueryUsingPost(
  body: API.AdminUserQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserPageVo_>("/api/user/admin/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminUpdateUser POST /api/user/admin/update */
export async function adminUpdateUserUsingPost(
  body: API.AdminUserUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/admin/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userEmailCodeSend POST /api/user/emailCode/send */
export async function userEmailCodeSendUsingPost(
  body: API.UserEmailCodeDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/emailCode/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userEmailRegister POST /api/user/emailRegister */
export async function userEmailRegisterUsingPost(
  body: API.UserRegisterEmailDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/user/emailRegister", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVo_>("/api/user/get/login", {
    method: "GET",
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVo_>("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>("/api/user/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userUpdate POST /api/user/update */
export async function userUpdateUsingPost(
  body: API.UserUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseString_>("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
