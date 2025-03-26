<template>
  <div id="card-info">

    <div class="card-content">
      <div class="card-prompt">吃饱了才能睡着</div>
      <div class="author-info-avatar">
        <img class="avatar-image" :src="layoutStores.getBlogSystemInfo().businessCardAvatarUrl" alt="">
        <div class="dog">
          <i class="ymIcon ym-goutou"></i>

        </div>
      </div>
      <div class="author-info-description">
        <div v-for="item in descriptionList" v-html="item" />
      </div>
      <div class="author-bottom-group">

        <div class="author-bottom-group_left">

          <h1 class="author-info-name">
            {{ layoutStores.getBlogSystemInfo().businessCardName }}
          </h1>

          <span class="author-info-desc">
                  {{ layoutStores.getBlogSystemInfo().businessCardTitle }}
                </span>

        </div>

        <div class="author-bottom-group_right">

          <a :href="layoutStores.getBlogSystemInfo().businessCardGitHubUrl" target="_blank">
            <i class="iconfont icon-github"></i>
          </a>

          <a :href="layoutStores.getBlogSystemInfo().businessCardBiliUrl" target="_blank">
            <i class="iconfont icon-bilibili"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup="">

import {useLayoutStores} from "@/stores/useLayoutStores.ts";
import {onMounted, ref} from "vue";

const layoutStores = useLayoutStores()

/**
 * 描述 字符串 数组 以 。 隔开
 */
const descriptionList = ref<string[]>([])

onMounted(() => {

  const text = layoutStores.getBlogSystemInfo().businessCardText
  if (text != undefined) {
    // @ts-ignore
    descriptionList.value = layoutStores.getBlogSystemInfo().businessCardText.split("。").slice(0, -1)
    if (descriptionList.value.length > 0) {
      descriptionList.value = descriptionList.value.map((item) => item + "。")
    }
  }

  layoutStores.$subscribe((_, state) => {
    if (descriptionList.value.length > 0 || state.blogSystemInfo.businessCardText == undefined) return
    descriptionList.value = state.blogSystemInfo.businessCardText.split("。").slice(0, -1)
    descriptionList.value = descriptionList.value.map((item) => item + "。")
  })


})

</script>

<style lang="less">
#card-info {
  -webkit-transition: .3s;
  -moz-transition: .3s;
  -o-transition: .3s;
  -ms-transition: .3s;
  transition: .3s;
  border: 1px solid #e3e8f7;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  padding: 0;
  background: #fff;
  overflow: hidden;
  border-radius: 12px;
  margin-top: 0;

  &:before {
    background: -webkit-linear-gradient(115deg, #425aef, #425aefdd, #425aef, #425aefdd);
    background: -moz-linear-gradient(115deg, #425aef, #425aefdd, #425aef, #425aefdd);
    background: -o-linear-gradient(115deg, #425aef, #425aefdd, #425aef, #425aefdd);
    background: -ms-linear-gradient(115deg, #425aef, #425aefdd, #425aef, #425aefdd);
    background: linear-gradient(-25deg, #425aef, #425aefdd, #425aef, #425aefdd);
    background-size: 400%;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    content: '';
  }


  .card-content {
    padding: 1rem 1.2rem;
    min-height: 320px;
    position: relative;

    .card-prompt {
      text-align: left;
      line-height: 2;
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
      font-size: 12px;
      margin: auto;
      padding: 2px 8px;
      border-radius: 12px;
      width: fit-content;
      cursor: pointer;
      transition: .3s;
      user-select: none;

      &:hover {
        background: #fff;
        color: #363636;
        transform: scale(1.1);
      }
    }

    .author-info-avatar {
      user-select: none;
      margin: 45px auto;
      display: flex;
      justify-content: center;
      width: 118px;
      height: 118px;
      transition: cubic-bezier(.69, .39, 0, 1.21) .3s;
      transform-origin: bottom;
      position: relative;

      .avatar-image {
        max-width: 100%;
        width: 118px;
        height: 118px;
        right: 0;
        top: 0;
        border-radius: 500px;
        object-fit: cover;
        position: absolute;
        object-position: 0 0;
        opacity: 1;
        -ms-filter: none;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        -ms-transition: .3s;
        transition: .3s;
        border: 5px solid #fff;
        filter: blur(0) brightness(1);
      }

      .dog {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 33px;
        height: 33px;
        border-radius: 2em;
        background-color: #fff;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .3s .2s;
        transform: scale(1);

        i {
          font-size: 23px;
        }

      }
    }

    .author-info-description {
      position: absolute;
      top: 50px;
      width: 100%;
      left: 0;
      padding: 1rem 1.2rem;
      opacity: 0;
      transition: .3s;
      color: #fff;

      div {
        line-height: 1.38;
        margin: .6rem 0;
        text-align: justify;
        color: rgba(255, 255, 255, .8);

        b {
          color: #fff;
          font-weight: bolder;

        }
      }
    }

    .author-bottom-group {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;

      .author-bottom-group_left {
        color: #363636;
        text-decoration: none;
        word-wrap: break-word;
        -webkit-transition: all .2s ease 0s;
        -moz-transition: all .2s ease 0s;
        -o-transition: all .2s ease 0s;
        -ms-transition: all .2s ease 0s;
        transition: all .2s ease 0s;
        overflow-wrap: break-word;
        cursor: pointer;

        .author-info-name {
          text-align: left;
          font-weight: 700;
          color: #fff;
          font-size: 20px;
          line-height: 1;
          position: relative;
          margin: 0 0 5px;
        }

        .author-info-desc {
          font-size: 12px;
          color: #fff;
          opacity: .6;
          line-height: 1;
        }
      }

      .author-bottom-group_right {
        margin: 0;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        cursor: pointer;
        text-align: center;

        a {
          text-decoration: none;
          transition: all .2s ease 0s;
          overflow-wrap: break-word;
          margin: 0 0 0 10px;
          color: #363636;
          font-size: 1.4em;
          cursor: pointer;
          display: flex;

          i {
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
            font-size: 1rem;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .3s ease 0s;
            padding: 8px;
            border-radius: 32px;

            &:hover {
              background: #f7f7f9;
              transform: scale(1.1);
              color: #425aef;
              -webkit-box-shadow: none;
              box-shadow: none;
            }
          }
        }
      }

    }

    &:hover {
      .author-info-avatar {
        opacity: 0;
        transform: scale(0);
      }

      .author-info-description {
        opacity: 1;
        -ms-filter: none;
        filter: none;
      }

    }

  }
}
</style>