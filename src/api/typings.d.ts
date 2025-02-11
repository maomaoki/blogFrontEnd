declare namespace API {
  type AdminAddUserDto = {
    userAccount?: string;
    userName?: string;
    userRole?: string;
  };

  type AdminDeleteUserDto = {
    id?: number;
  };

  type AdminPagePictureDto = {
    createEndTime?: string;
    createStartTime?: string;
    createUserId?: number;
    id?: number;
    pageNum?: number;
    pageSize?: number;
    pictureCategory?: string;
    pictureFormat?: string;
    pictureName?: string;
    pictureSize?: number;
    pictureTags?: string;
    pictureUpload?: string;
    reviewEndTime?: string;
    reviewStartTime?: string;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type AdminPageUserDto = {
    endTime?: string;
    id?: number;
    pageNum?: number;
    pageSize?: number;
    registeredSource?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    userAccount?: string;
    userAge?: number;
    userFGender?: number;
    userIntroduction?: string;
    userName?: string;
    userRole?: string;
    userStatus?: number;
    userTags?: string;
  };

  type AdminUpdateUserDto = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
    userStatus?: number;
  };

  type PagePictureVo_ = {
    current?: number;
    pages?: number;
    records?: PictureVo[];
    size?: number;
    total?: number;
  };

  type PageUserVo_ = {
    current?: number;
    pages?: number;
    records?: UserVo[];
    size?: number;
    total?: number;
  };

  type PictureVo = {
    createTime?: string;
    createUserId?: number;
    editTime?: string;
    id?: number;
    pictureCategory?: string;
    pictureFormat?: string;
    pictureHeight?: number;
    pictureIntroduction?: string;
    pictureName?: string;
    picturePath?: string;
    pictureScale?: number;
    pictureSize?: number;
    pictureTags?: string;
    pictureUpload?: string;
    pictureUrl?: string;
    pictureWidth?: number;
    reviewReason?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewUserId?: number;
    updateTime?: string;
    usedUserId?: number;
  };

  type ResultBoolean_ = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type ResultLong_ = {
    code?: number;
    data?: number;
    msg?: string;
  };

  type ResultPagePictureVo_ = {
    code?: number;
    data?: PagePictureVo_;
    msg?: string;
  };

  type ResultPageUserVo_ = {
    code?: number;
    data?: PageUserVo_;
    msg?: string;
  };

  type ResultUploadPictureVo_ = {
    code?: number;
    data?: UploadPictureVo;
    msg?: string;
  };

  type ResultUserVo_ = {
    code?: number;
    data?: UserVo;
    msg?: string;
  };

  type uploadPictureUsingPOSTParams = {
    pictureCategory?: string;
  };

  type UploadPictureVo = {
    id?: number;
    pictureName?: string;
    pictureUrl?: string;
  };

  type UserEditDto = {
    avatarId?: number;
    userAge?: number;
    userAvatar?: string;
    userFGender?: number;
    userIntroduction?: string;
    userName?: string;
    userTags?: string;
  };

  type UserLoginDto = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterDto = {
    checkPassword?: string;
    userAccount?: string;
    userEmail?: string;
    userEmailCode?: string;
    userPassword?: string;
  };

  type UserSendEmailCodeDto = {
    emailCodeType?: number;
    userAccount?: string;
    userEmail?: string;
  };

  type UserVo = {
    createTime?: string;
    id?: number;
    registeredSource?: string;
    userAccount?: string;
    userAge?: number;
    userAvatar?: string;
    userEmail?: string;
    userFGender?: number;
    userIntroduction?: string;
    userName?: string;
    userPhone?: string;
    userRole?: string;
    userStatus?: number;
    userTags?: string;
  };
}
