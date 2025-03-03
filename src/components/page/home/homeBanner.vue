<template>
  <div id="home-banner">

    <div class="banner-box">

      <img :src="bannerInfo?.bannerImageUrl"
           alt="背景">
    </div>

    <div class="banner-info">
      <h1>
        <span>{{ bannerInfo?.bannerTitle }}</span>
      </h1>
      <div class="printer" @click="refreshPrint">
        <div class="printer-item">
          {{ printStr }}
        </div>
        <h3><span class="cursor">|</span></h3>
      </div>
      <div id="bannerWave1"></div>
      <div id="bannerWave2"></div>
      <i class="iconfont icon-xiangxia down" @click="gotoContent">
      </i>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {getBannerInfoUsingGet} from "@/api/systemController.ts";
import {message} from "ant-design-vue";


const bannerInfo = ref<API.BannerInfoVo>({})


/**
 *  目前选中 的 文字
 */
let selectStr = ref<string>("");

/**
 * 随机 选取 一个 打印
 */
function randomChangeStrPrint() {
  // @ts-ignore
  const randomIndex = Math.floor(Math.random() * bannerInfo.value.printList.length);
  // @ts-ignore
  selectStr.value = bannerInfo.value.printList[randomIndex];

}

/**
 * 目前打印
 */
let printStr = ref<string>("");

/**
 * 打印 文字
 */
function printText() {
  randomChangeStrPrint()
  forthPrint()
}

/**
 * 时间 -1说明没有计数器 其它数值都说明存在计数器
 */
let timer = -1


/**
 * 往前打印 (慢慢增加字数)
 */
function forthPrint() {
  timer = setInterval(() => {
    if (printStr.value.length < selectStr.value.length) {
      // 从 我目前长度 , 1
      printStr.value += selectStr.value.substr(printStr.value.length, 1);
    } else {
      clearInterval(timer)
      // 延迟开启
      setTimeout(() => {
        futurePrint()
      }, 2000)
    }
  }, 1000)


}

/**
 * 往后 打印 (慢慢减少字)
 */
function futurePrint() {
  timer = setInterval(() => {
    if (printStr.value.length > 0) {
      printStr.value = printStr.value.substr(0, printStr.value.length - 1);
      return
    } else {
      clearInterval(timer)
      // 延迟开启
      setTimeout(() => {
        forthPrint()
      }, 2000)
    }
  }, 1000)

}


/**
 * 点击后 刷新 打印 文字
 */
function refreshPrint(): void {
  printStr.value = ""
  if (timer != -1) {
    clearInterval(timer)
  }
  printText()
}


/**
 *  点击 去往内容
 */
function gotoContent(){
  window.scrollTo({
    top: 800,
    behavior: 'smooth'
  });
}


onMounted(async () => {

  /**
   *  获取 bannerInfo
   */
  const result = await getBannerInfoUsingGet()
  if (result.data.code != 0) {
    message.error("获取banner信息错误: " + result.data.msg)
    return
  }
  // @ts-ignore
  bannerInfo.value = result.data.data

  printText()
})

onUnmounted(() => {
  if (timer != -1) {
    clearInterval(timer)
  }
})


</script>

<style lang="less">
#home-banner {
  width: 100vw;
  height: 800px;
  position: relative;

  .banner-box {
    animation: 2s ease 0s 1 normal none running header-effect;
    width: 100vw;
    height: 800px;
    position: relative;

    &:before {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .2);
      content: "";
    }

    img {
      vertical-align: top;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

  }

  .banner-info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    animation-name: hideToShow;

    h1 {
      color: var(--white);
      font-size: 40px;
    }

    .printer {
      cursor: pointer;
      color: var(--white);
      background: var(--translucent);
      border-radius: 10px;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      align-items: center;

      .printer-item {
        font-size: 1.17em;
        font-weight: bold;
        letter-spacing: 3px;
      }

      h3 {
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        unicode-bidi: isolate;
      }

      .cursor {
        margin-left: 1px;
        -webkit-animation: hideToShow .7s infinite;
        animation: hideToShow .7s infinite;
        font-weight: 200;
      }

    }

    .down {
      font-size: 40px;
      font-weight: 700;
      color: var(--white);
      position: absolute;
      bottom: 60px;
      -webkit-animation: my-shake 1.5s ease-out infinite;
      animation: my-shake 1.5s ease-out infinite;
      z-index: 15;
      cursor: pointer;
    }

    #bannerWave1 {
      position: absolute;
      bottom: 0;
      -webkit-animation: gradientBG 120s linear infinite;
      animation: gradientBG 120s linear infinite;
      height: 84px;
      background: var(--bannerWave1);
      width: 200%;
      z-index: 10;
    }

    #bannerWave2 {
      height: 100px;
      background: var(--bannerWave2);
      width: 400%;
      z-index: 5;
      position: absolute;
      bottom: 0;
      -webkit-animation: gradientBG 120s linear infinite;
      animation: gradientBG 120s linear infinite;
    }

  }


  @keyframes header-effect {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gradientBG {
    0% {
      background-position: 0 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }

  @keyframes hideToShow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes my-shake {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    30% {
      opacity: .5;
      transform: translateY(25px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>