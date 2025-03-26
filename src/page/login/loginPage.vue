<template>

  <div id="loginPage">

    <div class="bg-img" @click.stop="gotoBack">
      <img src="../../assets/images/bg/login-bg.jpg" alt="">
    </div>

    <div class="login-content" :class="isRegisteredStatus?'is-registered':''">

      <!--	注册框 -->
      <div class="default-box registered-box">

        <div class="title">
          注册
        </div>

        <div class="form-data">
          <a-form
              :model="registeredState"
              name="normal_registered"
              class="registered-form"
              :rules="registeredRules"
          >
            <a-form-item name="userAccount">
              <a-input
                  v-model:value="registeredState.userAccount"
                  placeholder="请输入账号/邮箱/手机号"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon"/>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="userPassword">
              <a-input-password
                  v-model:value="registeredState.userPassword"
                  placeholder="请输入密码"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon"/>
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item name="checkPassword">
              <a-input-password
                  v-model:value="registeredState.checkPassword"
                  placeholder="请再次输入密码"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon"/>
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item name="userEmail">
              <a-input
                  v-model:value="registeredState.userEmail"
                  placeholder="请输入邮箱"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon"/>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="userEmailCode" class="emailCodeBox">
              <a-input
                  v-model:value="registeredState.userEmailCode"
                  placeholder="请输入验证码"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon"/>
                </template>
              </a-input>
              <a-button type="primary"
                        html-type="submit"
                        @click="getEmailCode"
                        :loading="getEmailCodeBtnLoading"
              > 获取验证码
              </a-button>
            </a-form-item>


            <a-form-item class="login-form-button">
              <a-button
                  type="primary"
                  html-type="submit"
                  @click="registeredFinish"
              >
                注册
              </a-button>
            </a-form-item>
          </a-form>
        </div>

      </div>

      <!--	登录框 -->
      <div class="default-box login-box">

        <div class="title">
          登录
        </div>

        <div class="form-data">
          <a-form
              :model="loginState"
              name="normal_login"
              :rules="loginRules"
              @finish="loginFinish"
              class="login-form">
            <a-form-item name="userAccount">
              <a-input
                  v-model:value="loginState.userAccount"
                  placeholder="请输入账号/邮箱/手机号"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon"/>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="userPassword">
              <a-input-password
                  v-model:value="loginState.userPassword"
                  placeholder="请输入密码"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon"/>
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item style="text-align: right">
              <a class="login-form-forgot"
                 @click="message.error('功能未开发,请联系管理员!')"
              >忘记密码?请联系猫猫</a>
            </a-form-item>

            <a-form-item class="login-form-button">
              <a-button
                  type="primary"
                  html-type="submit"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>

      </div>


      <!--	旁边的覆盖盒 -->
      <div class="overlay-box">
        <div class="overlay-content">
          <div class="overlay-all overlay-left"><h1>已有账号?</h1>
            <p>请登录🚀</p>
            <button @click="isRegisteredStatus = false">登录</button>
          </div>
          <div class="overlay-all overlay-right"><h1>没有帐号?</h1>
            <p>立即注册吧😃</p>
            <button @click="isRegisteredStatus = true">注册</button>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script setup lang="ts">
import {onUnmounted, reactive, ref} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";
import type {Rule} from "ant-design-vue/es/form";
import {userLoginUsingPost, userRegisterUsingPost, userSendEmailCodeUsingPost} from "@/api/userController.ts";
import emailCodeConstant from "@/constants/emailCodeConstant.ts";
import {useRouter} from "vue-router";
import {useUserStores} from "@/stores/useUserStores.ts";


/**
 *  (不登陆） 点击 返回 主页
 */
function gotoBack() {
  router.push({
    path: "/home"
  })
}

/**
 * 是否 为 注册
 */
let isRegisteredStatus = ref<boolean>(false);

/**
 *  登录数据
 */

const loginState = reactive<API.UserLoginDto>({
  userAccount: "",
  userPassword: ""
});

/**
 * 注册 数据
 */
const registeredState = reactive<API.UserRegisterDto>({
  userAccount: "",
  userPassword: "",
  userEmail: "",
  checkPassword: "",
  userEmailCode: ""
})


/**
 * 校验 账号
 * @param _rule
 * @param value
 */
const checkAccount = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('账号不能为空');
  }
  if (value.length < 8) {
    return Promise.reject('账号长度不能小于8');
  }
  return Promise.resolve();
};


/**
 * 校验 密码
 * @param _rule
 * @param value
 */
const checkPassword = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('密码不能为空');
  }
  if (value.length < 8) {
    return Promise.reject('密码长度不能小于8');
  }
  return Promise.resolve();
};


/**
 * 校验 重复密码
 * @param _rule
 * @param value
 */
const checkConfirmPassword = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('密码不能为空');
  }
  if (value.length < 9) {
    return Promise.reject('密码长度不能小于9');
  }
  if (value !== registeredState.checkPassword) {
    return Promise.reject('两次密码不一致');
  }
  return Promise.resolve();
};

/**
 * 校验 邮箱
 * @param _rule
 * @param value
 */
const checkEmail = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('邮箱不能为空');
  }
  // 正则表达式校验邮箱
  if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
    return Promise.reject('邮箱格式不正确');
  }
  return Promise.resolve();
};


/**
 * 校验 验证码
 * @param _rule
 * @param value
 */
const checkCode = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('验证码不能为空');
  }

  return Promise.resolve();
};


/**
 *  登录 的 自定义校验
 */
const loginRules: Record<string, Rule[]> = {
  userAccount: [{required: true, validator: checkAccount, trigger: 'change'}],
  userPassword: [{required: true, validator: checkPassword, trigger: 'change'}]
};


/**
 *  注册 的 自定义校验
 */
const registeredRules: Record<string, Rule[]> = {
  userAccount: [{required: true, validator: checkAccount, trigger: 'change'}],
  userPassword: [{required: true, validator: checkPassword, trigger: 'change'}],
  checkPassword: [{required: true, validator: checkConfirmPassword, trigger: 'change'}],
  userEmail: [{required: true, validator: checkEmail, trigger: 'change'}],
  userEmailCode: [{required: true, validator: checkCode, trigger: 'change'}],
};

const router = useRouter();

const userStore = useUserStores()

/**
 *  登录提交事件
 */
async function loginFinish() {

  // 发送请求
  const result = await userLoginUsingPost(loginState);
  const userLoginVo = result.data;

  // 请求结果判断
  if (userLoginVo.code !== 0) {
    // 说明有错误
    message.error(userLoginVo.msg);
    return
  }

  message.success("登陆成功")
  await userStore.setUserInfo();
  // 清空输入框
  // 跳回登录前的页面
  if (router.currentRoute.value.query.redirect) {
    await router.push(router.currentRoute.value.query.redirect as string);
  } else {
    await router.go(-1)
  }

}


/**
 *  获取验证码按钮 loading
 */
let getEmailCodeBtnLoading = ref<boolean>(false)

/**
 * 用于 定时 修改 验证码按钮
 */
let timer: number;


/**
 *  获取 邮箱注册验证码
 */
async function getEmailCode() {

  if (registeredState?.userAccount?.length === 0 || registeredState?.userEmail?.length === 0) {
    message.error("账号或者邮箱不能为空");
    return
  }


  // 发送 验证码
  const result = await userSendEmailCodeUsingPost({
    userAccount: registeredState.userAccount,
    userEmail: registeredState.userEmail,
    emailCodeType: emailCodeConstant.REGISTER
  });

  const emailCodeVo = result.data;
  if (emailCodeVo.code !== 0) {
    message.error("发送失败:" + emailCodeVo.msg);
    return
  }
  getEmailCodeBtnLoading.value = true
  message.success("发送成功");
  // 三分钟再取消
  timer = setTimeout(() => {
    getEmailCodeBtnLoading.value = false
  }, 1000 * 60 * 3)
}

/**
 * 清除 定时器
 */
onUnmounted(() => {
  if (timer != 0) {
    clearTimeout(timer)
  }
  getEmailCodeBtnLoading.value = false
})


/**
 *  注册提交事件
 */
async function registeredFinish() {

  const result = await userRegisterUsingPost(registeredState);
  const userRegisterVo = result.data;
  if (userRegisterVo.code !== 0) {
    message.error("注册失败:" + userRegisterVo.msg);
    return
  }

  // 提示注册成功
  message.success("注册成功,请登录吧");

  // 切换到登录页面
  isRegisteredStatus.value = false;

  // 并且输入账号和密码
  loginState.userAccount = registeredState.userAccount;
  loginState.userPassword = registeredState.userPassword;

  // 清空注册输入框
  registeredState.userAccount = "";
  registeredState.userEmail = "";
  registeredState.userPassword = "";
  registeredState.checkPassword = "";
  registeredState.userEmailCode = "";


}


</script>


<style lang="less">
#loginPage {

  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // 透明度暗一点
      filter: brightness(0.8);
    }
  }

  .login-content {
    width: 800px;
    max-width: 100%;
    min-height: 500px;
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;

    .default-box {
      position: absolute;
      height: 100%;
      transition: all 0.5s ease-in-out;
      left: 0;
      width: 50%;
      background-color: #FFFFFF;
      padding: 50px 60px;

      .title {
        text-align: center;
        font-size: 35px;
        margin-bottom: 25px;

      }

      .form-data {

        .ant-input-affix-wrapper {
          height: 40px;
        }

        .login-form-button {
          display: flex;
          align-items: center;
          justify-content: center;

          button {
            width: 95px;
            height: 42px;
          }

        }
      }

    }

    .registered-box {
      opacity: 0;

      .emailCodeBox {

        .ant-form-item-control-input-content {
          display: flex;
          align-items: center;

          button {
            height: 40px;
            margin-left: 20px;
          }
        }

      }


    }

    .overlay-box {
      position: absolute;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: all 0.5s ease-in-out;

      .overlay-content {
        background: linear-gradient(90deg, #ff4b2b, #ff416c);
        color: #FFFFFF;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;

        .overlay-all {
          transition: all 0.5s ease-in-out;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 50%;
          position: absolute;
          top: 0;
          flex-direction: column;

          h1 {
            font-size: 2.5rem;
          }

          p {
            font-size: 14px;
            letter-spacing: 1px;
            margin: 20px 0 30px 0;
          }


          button {
            background: transparent;
            border: 1px solid #FFFFFF;
            border-radius: 2rem;
            color: #FFFFFF;
            font-size: 16px;
            font-weight: 700;
            padding: 12px 45px;
            letter-spacing: 2px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            &:hover {
              animation: scale 0.8s ease-in-out;
            }
          }

        }


        .overlay-all.overlay-left {
          transform: translateY(-20%);
        }

        .overlay-all.overlay-right {
          right: 0;
          transform: translateY(0);
        }

      }


    }
  }


  .login-content.is-registered {

    .login-box {
      transform: translateY(100%);
    }

    .registered-box {
      transform: translateX(100%);
      opacity: 1;
    }

    .overlay-box {
      transform: translateX(-100%);

      .overlay-content {
        transform: translateX(50%);

        .overlay-all.overlay-left {
          transform: translateY(0);
        }

        .overlay-all.overlay-right {
          transform: translateY(20%);
        }
      }

    }

  }

}
</style>