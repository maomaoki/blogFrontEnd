declare namespace API {
  type AdminPictureQueryDto = {
    category?: string;
    current?: number;
    endTime?: string;
    introduction?: string;
    name?: string;
    pageSize?: number;
    picFormat?: string;
    picSize?: number;
    saveWay?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    tags?: string;
    useUserId?: number;
    userId?: number;
  };

  type AdminUserAddDto = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type AdminUserQueryDto = {
    current?: number;
    endTime?: string;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRegistrationSource?: string;
    userRole?: string;
    userTags?: string;
  };

  type AdminUserUpdateDto = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
    userStatus?: number;
    userTags?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseObject_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePagePictureVo_ = {
    code?: number;
    data?: PagePictureVo_;
    message?: string;
  };

  type BaseResponsePageUserPageVo_ = {
    code?: number;
    data?: PageUserPageVo_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVo_ = {
    code?: number;
    data?: UserVo;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type PagePictureVo_ = {
    current?: number;
    pages?: number;
    records?: PictureVo[];
    size?: number;
    total?: number;
  };

  type PageUserPageVo_ = {
    current?: number;
    pages?: number;
    records?: UserPageVo[];
    size?: number;
    total?: number;
  };

  type pictureUploadUsingPOSTParams = {
    category?: string;
    introduction?: string;
    tags?: string;
  };

  type PictureVo = {
    category?: string;
    createTime?: string;
    id?: number;
    introduction?: string;
    name?: string;
    picFormat?: string;
    picHeight?: number;
    picScale?: number;
    picSize?: number;
    picWidth?: number;
    saveUrl?: string;
    saveWay?: string;
    tags?: string;
    url?: string;
    useUserId?: number;
    userId?: number;
  };

  type User = {
    createTime?: string;
    editTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userEmail?: string;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
    userRegistrationSource?: string;
    userRole?: string;
    userStatus?: number;
    userTags?: string;
  };

  type UserEmailCodeDto = {
    account?: string;
    email?: string;
    type?: number;
  };

  type UserLoginDto = {
    account?: string;
    password?: string;
  };

  type UserPageVo = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userEmail?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRegistrationSource?: string;
    userRole?: string;
    userStatus?: number;
    userTags?: string;
  };

  type UserRegisterDto = {
    account?: string;
    confirmPassword?: string;
    password?: string;
  };

  type UserRegisterEmailDto = {
    account?: string;
    code?: string;
    confirmPassword?: string;
    email?: string;
    password?: string;
  };

  type UserUpdateDto = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userTags?: string;
  };

  type UserVo = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userEmail?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRegistrationSource?: string;
    userRole?: string;
    userTags?: string;
  };
}
