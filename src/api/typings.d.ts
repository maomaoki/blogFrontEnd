declare namespace API {
  type AdminAddArticleDto = {
    articleBgImage?: string;
    articleCategory?: string;
    articleContent?: string;
    articleIntroduction?: string;
    articleSize?: number;
    articleStatus?: number;
    articleTags?: string;
    articleTitle?: string;
    encryptPassword?: string;
    imageId?: number;
    isEncrypt?: number;
    isHot?: number;
    isRecommend?: number;
  };

  type AdminAddBlogSystemDto = {
    blogCreateTime?: string;
    blogRegistrationNumber?: string;
    blogRegistrationNumberUrl?: string;
    blogSystemUserName?: string;
    businessCardAvatarUrl?: string;
    businessCardBiliUrl?: string;
    businessCardGitHubUrl?: string;
    businessCardName?: string;
    businessCardText?: string;
    businessCardTitle?: string;
    businessCardTop?: string;
    homeBannerBgImageUrl?: string;
    homeBannerPrintText?: string;
    homeBannerTitle?: string;
    loginImageUrl?: string;
    moreContent?: string;
    moreImageUrl?: string;
    moreTitle?: string;
    newsBannerBgImageUrl?: string;
    newsBannerPrintText?: string;
    newsBannerTitle?: string;
    shareBiliUrl?: string;
    shareDyUrl?: string;
    shareEmailUrl?: string;
    shareGitHubUrl?: string;
    shareGiteeUrl?: string;
    shareQQUrl?: string;
    shareWxUrl?: string;
    slideWrapTitle?: string;
    slideWrapUrl?: string;
  };

  type AdminAddUserDto = {
    userAccount?: string;
    userName?: string;
    userRole?: string;
  };

  type AdminDeleteArticleDto = {
    id?: number;
  };

  type AdminDeleteUserDto = {
    id?: number;
  };

  type AdminEditArticleDto = {
    articleBgImage?: string;
    articleCategory?: string;
    articleContent?: string;
    articleIntroduction?: string;
    articleSize?: number;
    articleStatus?: number;
    articleTags?: string;
    articleTitle?: string;
    encryptPassword?: string;
    id?: number;
    imageId?: number;
    isEncrypt?: number;
    isHot?: number;
    isRecommend?: number;
  };

  type adminGetEditArticleByIdUsingGETParams = {
    /** id */
    id: string;
  };

  type AdminPageArticleDto = {
    articleAuthor?: string;
    articleCategory?: string;
    articleCondition?: string;
    articleSize?: number;
    articleStatus?: number;
    articleTags?: string;
    articleTitle?: string;
    createEndTime?: string;
    createStartTime?: string;
    id?: number;
    isHot?: number;
    isRecommend?: number;
    pageNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    timeSortField?: string;
    timeSortOrder?: string;
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
    timeSortField?: string;
    timeSortOrder?: string;
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
    timeSortField?: string;
    timeSortOrder?: string;
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
    avatarId?: number;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
    userStatus?: number;
  };

  type Article = {
    articleAuthor?: string;
    articleBgImage?: string;
    articleCategory?: string;
    articleCollectNumber?: number;
    articleCommentNumber?: number;
    articleContent?: string;
    articleIntroduction?: string;
    articleLikeNumber?: number;
    articleLookNumber?: number;
    articleSize?: number;
    articleStatus?: number;
    articleTags?: string;
    articleTitle?: string;
    createTime?: string;
    editTime?: string;
    encryptPassword?: string;
    id?: number;
    isDelete?: number;
    isEncrypt?: number;
    isHot?: number;
    isRecommend?: number;
    updateTime?: string;
  };

  type ArticleInfoCountVo = {
    articleCount?: number;
    articleWordCount?: string;
  };

  type ArticlePageVo = {
    articleAuthor?: string;
    articleBgImage?: string;
    articleCategory?: string;
    articleCollectNumber?: number;
    articleCommentNumber?: number;
    articleIntroduction?: string;
    articleLikeNumber?: number;
    articleLookNumber?: number;
    articleSize?: number;
    articleStatus?: number;
    articleTags?: string;
    articleTitle?: string;
    createTime?: string;
    editTime?: string;
    id?: number;
    isEncrypt?: number;
    isHot?: number;
    isRecommend?: number;
    updateTime?: string;
  };

  type ArticleTagsCountVo = {
    count?: number;
    name?: string;
  };

  type ArticleTimeCountVo = {
    count?: number;
    time?: string;
  };

  type ArticleVo = {
    articleAuthor?: string;
    articleBgImage?: string;
    articleCategory?: string;
    articleCollectNumber?: number;
    articleCommentNumber?: number;
    articleContent?: string;
    articleIntroduction?: string;
    articleLikeNumber?: number;
    articleLookNumber?: number;
    articleSize?: number;
    articleStatus?: number;
    articleTags?: string;
    articleTitle?: string;
    createTime?: string;
    editTime?: string;
    id?: number;
    isEncrypt?: number;
    isHot?: number;
    isRecommend?: number;
    updateTime?: string;
  };

  type BlogSystem = {
    blogCreateTime?: string;
    blogRegistrationNumber?: string;
    blogRegistrationNumberUrl?: string;
    blogSystemUserName?: string;
    businessCardAvatarUrl?: string;
    businessCardBiliUrl?: string;
    businessCardGitHubUrl?: string;
    businessCardName?: string;
    businessCardText?: string;
    businessCardTitle?: string;
    businessCardTop?: string;
    createTime?: string;
    editTime?: string;
    homeBannerBgImageUrl?: string;
    homeBannerPrintText?: string;
    homeBannerTitle?: string;
    id?: number;
    isDelete?: number;
    loginImageUrl?: string;
    moreContent?: string;
    moreImageUrl?: string;
    moreTitle?: string;
    newsBannerBgImageUrl?: string;
    newsBannerPrintText?: string;
    newsBannerTitle?: string;
    shareBiliUrl?: string;
    shareDyUrl?: string;
    shareEmailUrl?: string;
    shareGitHubUrl?: string;
    shareGiteeUrl?: string;
    shareQQUrl?: string;
    shareWxUrl?: string;
    slideWrapTitle?: string;
    slideWrapUrl?: string;
    updateTime?: string;
  };

  type BlogSystemInfoVo = {
    blogCreateTime?: string;
    blogRegistrationNumber?: string;
    blogRegistrationNumberUrl?: string;
    blogSystemUserName?: string;
    businessCardAvatarUrl?: string;
    businessCardBiliUrl?: string;
    businessCardGitHubUrl?: string;
    businessCardName?: string;
    businessCardText?: string;
    businessCardTitle?: string;
    businessCardTop?: string;
    homeBannerBgImageUrl?: string;
    homeBannerPrintText?: string;
    homeBannerTitle?: string;
    id?: number;
    loginImageUrl?: string;
    moreContent?: string;
    moreImageUrl?: string;
    moreTitle?: string;
    newsBannerBgImageUrl?: string;
    newsBannerPrintText?: string;
    newsBannerTitle?: string;
    shareBiliUrl?: string;
    shareDyUrl?: string;
    shareEmailUrl?: string;
    shareGitHubUrl?: string;
    shareGiteeUrl?: string;
    shareQQUrl?: string;
    shareWxUrl?: string;
    slideWrapTitle?: string;
    slideWrapUrl?: string;
  };

  type getArticleByIdUsingGETParams = {
    /** id */
    id: string;
  };

  type GetArticleByPasswordDto = {
    id?: number;
    password?: string;
  };

  type NewsDto = {
    id?: string;
    size?: number;
  };

  type NewsVo = {
    hotValue?: string;
    index?: number;
    link?: string;
    title?: string;
  };

  type PageArticlePageVo_ = {
    current?: number;
    pages?: number;
    records?: ArticlePageVo[];
    size?: number;
    total?: number;
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

  type ResultArticle_ = {
    code?: number;
    data?: Article;
    msg?: string;
  };

  type ResultArticleInfoCountVo_ = {
    code?: number;
    data?: ArticleInfoCountVo;
    msg?: string;
  };

  type ResultArticleVo_ = {
    code?: number;
    data?: ArticleVo;
    msg?: string;
  };

  type ResultBlogSystemInfoVo_ = {
    code?: number;
    data?: BlogSystemInfoVo;
    msg?: string;
  };

  type ResultBoolean_ = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type ResultListArticleTagsCountVo_ = {
    code?: number;
    data?: ArticleTagsCountVo[];
    msg?: string;
  };

  type ResultListArticleTimeCountVo_ = {
    code?: number;
    data?: ArticleTimeCountVo[];
    msg?: string;
  };

  type ResultListNewsVo_ = {
    code?: number;
    data?: NewsVo[];
    msg?: string;
  };

  type ResultLong_ = {
    code?: number;
    data?: number;
    msg?: string;
  };

  type ResultPageArticlePageVo_ = {
    code?: number;
    data?: PageArticlePageVo_;
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
