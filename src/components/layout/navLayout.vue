<template>
  <nav id="navBox" :class="isFixed?'isFixed':''">

    <div class="nav-group">
      <div class="blog-name">
        <div class="_ym_box">
          <i class="iconfont icon-caidan"></i>
        </div>
        <div class="back_button_box">
          <span class="title">云猫</span>
          <i class="iconfont icon-shouye"></i>
        </div>
      </div>

      <div class="menus">
        <div class="menu-list">
          <div class="menu-item">
            <span>文章</span>
            <ul class="menu-item-children">
              <li>
                <span>
                  <i class="iconfont icon-fenlei"></i>
                  分类
                </span>
              </li>
              <li>
                <span>
                  <i class="iconfont icon-24gf-tags3"></i>
                  标签
                </span>
              </li>
              <li>
                <span>
                  <i class="iconfont icon-wendang"></i>
                  文档
                </span>
              </li>
            </ul>
          </div>
          <div class="menu-item">
            <span>文章</span>
          </div>
          <div class="menu-item">
            <span>文章</span>
          </div>
          <div class="menu-item">
            <span>文章</span>
          </div>
        </div>
      </div>

      <div class="mask-name-container">
        <div class="name-container">
          <a @click="goToArriveTop">
            云猫 - 生活明朗 万物可爱
          </a>
        </div>
      </div>

      <div class="nav-right">
        <div class="nav-button">
          <span title="搜索🔍">
             <i class="iconfont icon-sousuo1"></i>
          </span>
        </div>
        <div @click="setIsShowCentralControl(true)" class="widget" title="中控台">
          <i class="widget-left"></i>
          <i class="widget-content"></i>
          <i class="widget-right"></i>
        </div>

        <div class="top-button" :class="isArriveFooter?'isArriveFooter':''">
          <a @click="goToArriveTop">
            <i class="iconfont icon-wangshang"></i>
            <span>{{ isArriveFooter ? '返回顶部' : topScrollNumber }}</span>
          </a>
        </div>
      </div>

    </div>

    <!-- 中控 遮罩-->
    <central-control-mask />
  </nav>
</template>

<script lang="ts" setup>

import {onMounted, onUnmounted, ref} from "vue";
import {componentStores} from "@/stores/componentStores.ts";
import {goToArriveTop} from "@/utils/componentsUtils.ts";
import CentralControlMask from "@/mask/centralControlMask.vue";

/**
 * 打开 中控 遮罩
 */
const {setIsShowCentralControl} = componentStores();



/**
 * 是否固定
 */
const isFixed = ref<boolean>(false)

/**
 * 滚动数
 */
let topScrollNumber = ref<number>(0);

/**
 * 是否 到达 底部了
 */
let isArriveFooter = ref<boolean>(false);


/**
 * 组件 全局 仓库
 */
const {getIsArrive} = componentStores();


/**
 *  改变 nav 状态
 */
function changeNavbar() {

  const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;


  if (scrollY >= 800) {
    // 需要 切换
    isFixed.value = true
    topScrollNumber.value = Math.floor(scrollY / 50);

    isArriveFooter.value = getIsArrive()
    return
  }
  isFixed.value = false
}


onMounted(() => {


  /**
   * 监听滚动事件
   */
  window.addEventListener('scroll', changeNavbar);


})

onUnmounted(() => {
  /**
   * 取消滚动事件
   */
  window.removeEventListener('scroll', changeNavbar);

})


</script>


<style lang="less">
#navBox {

  width: 100%;
  height: 60px;
  padding: 0 calc((100% - 1400px + 3rem) / 2);
  position: fixed;
  z-index: 999;
  transition: background 0.3s;

  i {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .nav-group {
    display: flex;
    align-items: center;
    position: relative;
    color: #fff;

    .blog-name {
      display: flex;
      align-items: center;
      transition: .3s;
      z-index: 102;
      height: 60px;

      ._ym_box {
        cursor: pointer;
        position: relative;
        width: 35px;
        height: 35px;
        transition: .3s;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
        z-index: 999;

        &:hover {
          color: #fff;
          background: #425aef;
          -webkit-box-shadow: 0 8px 12px -3px #425aef23;
          box-shadow: 0 8px 12px -3px #425aef23;
        }
      }

      .back_button_box {
        border-radius: 50px;
        padding: 0 12px;
        height: 35px;
        line-height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;


        .title {
          font-size: 1.2rem;
          padding: 0 5px;
          letter-spacing: 2px;
        }

        i {
          position: absolute;
          transition: .3s;
          font-size: 1rem;
          opacity: 0;
        }

        &:hover {
          color: #fff;
          background: #425aef;
          -webkit-box-shadow: 0 8px 12px -3px #425aef23;
          box-shadow: 0 8px 12px -3px #425aef23;

          .title {
            opacity: 0;
          }

          i {
            color: #fff;
            opacity: 1;
            -ms-filter: none;
            filter: none;
          }
        }

      }
    }

    .mask-name-container {
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;
      left: 0;

      .name-container {
        align-items: center;
        display: flex;
        border-radius: 12px;
        height: 40px;
        position: absolute;
        top: 62px;
        left: 0;
        right: 0;
        margin: auto;
        justify-content: center;
        animation-timing-function: ease-out;

        a {
          color: #333;
          text-shadow: none;
          display: inline;
          font-weight: 700;
          padding: 4px 8px;
          opacity: 0;
          transition: .1s;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          text-align: center;
          cursor: pointer;
          top: 0;
          font-size: 1.1rem;
          animation-timing-function: ease-in;
          text-decoration: none;
          letter-spacing: 3px;

          &:after {
            opacity: 0;
            content: "回到顶部";
            transition: .2s;
            position: absolute;
            transform: translateY(-50%);
            left: 0;
            right: 0;
            top: 50%;
            margin: auto;
            color: #fff !important;
            font-weight: 700;
            line-height: 2;
          }
        }


      }

    }

    .menus {
      padding: 0 calc((100% - 1400px + 3rem) / 2);
      display: flex;
      justify-content: center;
      width: 100%;
      position: absolute;
      height: 60px;
      left: 0;
      margin: 0;
      transform: translateZ(0);
      will-change: auto;
      z-index: 9;


      .menu-list {
        position: relative;
        width: fit-content;
        text-align: center;
        left: 0;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        transition: transform .3s;

        .menu-item {
          padding: 0 .4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto;
          position: relative;
          border-radius: 30px;
          transition: .3s;


          span {
            height: 35px;
            padding: 0 15px;
            border-radius: 50px;
            text-align: center;
            line-height: 35px;
            letter-spacing: .3rem;
            font-weight: 700;
            cursor: pointer;

            &:hover {
              color: #fff;
              background: #425aef;
              -webkit-box-shadow: 0 8px 12px -3px #425aef23;
              box-shadow: 0 8px 12px -3px #425aef23;

            }
          }


          .menu-item-children {
            position: absolute;
            opacity: 0;
            width: max-content;
            top: 35px;
            -webkit-box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.05);
            box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.05);
            border: 1px solid #e3e8f7;
            -webkit-transition: .2s;
            -moz-transition: .2s;
            -o-transition: .2s;
            -ms-transition: .2s;
            transition: .2s;
            background-color: #fff;
            border-radius: 50px;
            right: auto;
            left: auto;
            padding: 6px 4px;
            box-sizing: content-box;
            line-height: 35px;
            transform: translateY(-10px) scale(0);
            transform-origin: top;
            pointer-events: none;
            margin-top: 8px;

            &:before {
              position: absolute;
              top: -12px;
              left: 0;
              width: 100%;
              height: 16px;
              content: '';
            }

            li {
              border-radius: 50px;
              -webkit-transition: all .3s;
              -moz-transition: all .3s;
              -o-transition: all .3s;
              -ms-transition: all .3s;
              transition: all .3s;
              display: inline-block;
              margin: 0 3px;
              list-style: none;

              span {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50px;
                padding: 2px 16px;
                transition: .3s;
                width: 100%;
                color: #4c4948;
                font-size: 15px;

                &:hover {
                  color: #fff;
                  background: #425aef;
                  -webkit-box-shadow: 0 8px 12px -3px #425aef23;
                  box-shadow: 0 8px 12px -3px #425aef23;
                  transform: scale(1) !important;
                  padding: .125rem 1.25rem;
                }

              }
            }
          }

          &:hover .menu-item-children {
            border: 1px solid #425aef;
            -webkit-box-shadow: 0 8px 12px -3px #425aef23;
            box-shadow: 0 8px 12px -3px #425aef23;
            opacity: 1;
            -ms-filter: none;
            filter: none;
            pointer-events: all;
            transform: translateY(0) scale(1);
          }
        }
      }
    }

    .nav-right {
      z-index: 102;
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: row;
      height: 100%;
      align-items: center;

      .nav-button {
        margin-left: 1rem;
        padding: 0;
        cursor: pointer;

        span {
          width: 35px;
          height: 35px;
          border-radius: 50px;
          transition: .3s;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            color: #fff;
            background: #425aef;
            -webkit-box-shadow: 0 8px 12px -3px #425aef23;
            box-shadow: 0 8px 12px -3px #425aef23;

          }
        }
      }

      .widget {
        position: relative;
        right: 0;
        top: 0;
        bottom: 0;
        height: 1.375rem;
        width: 1.375rem;
        cursor: pointer;
        transition: 1s;
        margin-left: 1rem;

        i {
          background: #fff;
          position: absolute;
          border-radius: calc(1.375rem * .15);
          transition: .5s cubic-bezier(0.6, 0.1, 0, 1);
          inset: 0;
          margin: auto;
          right: auto;
          width: calc(1.375rem / 3);
          height: calc(1.375rem / 3);
          transform: translateY(calc(1.375rem / 4));
        }

        i.widget-left {
          width: 100%;
          transform: translateY(calc(1.375rem / -4));
        }


        i.widget-right {
          left: auto;
          right: 0;
          width: calc(1.375rem / 2);
        }


        &:hover {
          i.widget-left {
            width: calc(1.375rem / 2.5);
          }

          i.widget-content {
            opacity: .5;
            width: calc(1.375rem / 2.5);
          }

          i.widget-right {
            width: calc(1.375rem / 2.5);
            height: calc(1.375rem / 1.15);
            transform: none;
          }
        }
      }

      .top-button {
        cursor: pointer;
        padding: 0;
        width: 0;
        margin-left: 0;
        overflow: hidden;
        transition: .3s ease-in;
        height: 35px;
        display: flex;
        border-radius: 50px;
        align-items: center;
        justify-content: space-around;

        a {
          width: 25px;
          height: 25px;
          border-radius: 40px;
          background: #4c4948;
          color: #fff;
          transition: all .3s ease-in-out;
          text-shadow: none;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            font-size: 1rem;
            font-weight: 700;
            opacity: 0;
            transition: .3s;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
          }

          span {
            font-weight: 700;
            transition: .3s;
            font-size: 13px;
            border-radius: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            color: #fff;
            width: 25px;
            height: 25px;

          }

        }
      }

    }
  }


  &.isFixed {
    background: #fff;
    outline: 1px solid #e3e8f7;

    .nav-group {
      color: #333;

      .mask-name-container {
        .name-container {
          z-index: 101;
          transition: .3s;
          top: 10px;

          a {
            background: 0 0;
            text-shadow: none;
            box-shadow: none;
            font-weight: 700;
            border-radius: 100px;
            min-width: 100px;
            line-height: 1.5rem;
            transition: .3s;
            opacity: 1;
            display: inline;

            &:hover {
              color: #425aef;
              background: #425aef;
            }

            &:hover::after {
              opacity: 1;
            }
          }
        }


      }

      .menus {
        z-index: 100;

        .menu-list {

          height: 40px;
          margin: auto 0;
          transform: translateY(-60px);
          will-change: transform;

        }
      }

      .nav-right {

        .widget {
          i {
            background: #333;
          }
        }


        .top-button {
          width: 35px;
          height: 35px;
          margin-left: 1rem;
          padding: 0;


          &:not(&.isArriveFooter):hover a {
            height: 35px;
          }

          &:hover a {
            width: 35px;
            background: #425aef;
          }

          &:hover a i {
            opacity: 1;
            color: #fff;
            transition: .3s;
            line-height: 1;
          }

          &:hover a span {
            opacity: 0;
            transform: scale(1.5);
            font-weight: 700;
          }
        }

        .top-button.isArriveFooter {
          width: 70px;

          a {
            width: 70px;

            i {
              font-size: 0.8rem;
              top: 52%;
            }
          }


        }
      }
    }

  }
}
</style>