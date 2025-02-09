// @ts-ignore
/* eslint-disable */
import request from "@/axios";

/** adminAddUser POST /api/user/admin/add */
export async function adminAddUserUsingPost(
  body: API.AdminAddUserDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultLong_>("/api/user/admin/add", {
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
  body: API.AdminDeleteUserDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultLong_>("/api/user/admin/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminGetUserInfoById POST /api/user/admin/info */
export async function adminGetUserInfoByIdUsingPost(
  body: API.AdminDeleteUserDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultUserVo_>("/api/user/admin/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminPageUser POST /api/user/admin/page */
export async function adminPageUserUsingPost(
  body: API.AdminPageUserDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultPageUserVo_>("/api/user/admin/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** adminEditUser POST /api/user/admin/update */
export async function adminEditUserUsingPost(
  body: API.AdminUpdateUserDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>("/api/user/admin/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userEdit POST /api/user/edit */
export async function userEditUsingPost(
  body: API.UserEditDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>("/api/user/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultUserVo_>("/api/user/login", {
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
  return request<API.ResultBoolean_>("/api/user/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultLong_>("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userSendEmailCode POST /api/user/sendEmailCode */
export async function userSendEmailCodeUsingPost(
  body: API.UserSendEmailCodeDto,
  options?: { [key: string]: any }
) {
  return request<API.ResultBoolean_>("/api/user/sendEmailCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userGetLoginInfo GET /api/user/userGetLoginInfo */
export async function userGetLoginInfoUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.ResultUserVo_>("/api/user/userGetLoginInfo", {
    method: "GET",
    ...(options || {}),
  });
}
