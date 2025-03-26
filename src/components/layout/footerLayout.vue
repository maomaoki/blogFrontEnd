<template>

  <footer id="footerBox" ref="footerBoxRef">
    <div id="footer-wrap">

      <div class="footer-icon-list">
        <a class="icon_link" title="邮件">
          <i class="iconfont icon-youjian"></i>
        </a>
        <a class="icon_link" title="微博">
          <i class="iconfont icon-weibo"></i>
        </a>
        <a class="icon_link" title="facebook">
          <i class="iconfont icon-facebook"></i>
        </a>
        <a class="icon_link" title="抖音">
          <i class="iconfont icon-douyin"></i>
        </a>
        <a class="image_link" title="返回顶部" @click="goToArriveTop()">
          <img :src="getBlogSystemInfo().businessCardAvatarUrl" alt="返回顶部">
        </a>
        <a class="icon_link" title="bili">
          <i class="iconfont icon-bilibili"></i>
        </a>
        <a class="icon_link" title="github">
          <i class="iconfont icon-github"></i>
        </a>
        <a class="icon_link" title="版权">
          <i class="iconfont icon-banquan"></i>
        </a>
        <a class="icon_link" title="建站信息">
          <i class="iconfont icon-jianzhan"></i>
        </a>
      </div>

      <div class="footer-info-list">
        <div class="footer-group">
          <div class="footer-group-title">
            测试
          </div>
          <div class="footer-group-link">
            <span>服务连接1</span>
            <span>服务连接24</span>
            <span>服务</span>
          </div>
        </div>
        <div class="footer-group">
          <div class="footer-group-title">
            测试
          </div>
          <div class="footer-group-link">
            <span>服务连接1</span>
            <span>服务连接24</span>
            <span>服务</span>
          </div>
        </div>
        <div class="footer-group">
          <div class="footer-group-title">
            测试
          </div>
          <div class="footer-group-link">
            <span>服务连接1</span>
            <span>服务连接24</span>
            <span>服务</span>
          </div>
        </div>
        <div class="footer-group">
          <div class="footer-group-title">
            测试
          </div>
          <div class="footer-group-link">
            <span>服务连接1</span>
            <span>服务连接24</span>
            <span>服务</span>
          </div>
        </div>
      </div>
    </div>
    <div id="footer-bar">

      <div class="footer-bar-link">
        <div class="footer-bar-left">
          <span>©2024 - 2024 By</span>
          <a href="" title="云猫">云猫</a>
        </div>
        <div class="footer-bar-right">
          <div class="footer-bar-item">
            主题
          </div>
          <div class="footer-bar-item">
            图床
          </div>
          <a :href="getBlogSystemInfo().blogRegistrationNumberUrl" target="_blank" class="footer-bar-item">
            {{ getBlogSystemInfo().blogRegistrationNumber }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {useComponentStores} from "@/stores/useComponentStores.ts";
import {useLayoutStores} from "@/stores/useLayoutStores.ts";
import {goToArriveTop} from "@/utils/componentsUtils.ts";

const footerBoxRef = ref()

const {setIsArrive} = useComponentStores();
const {getBlogSystemInfo} = useLayoutStores();

/**
 *  使用 监听器
 */
const ob = new IntersectionObserver((entries) => {
  const entry = entries[0]
  setIsArrive(entry.isIntersecting)
}, {
  // root:null,
  threshold: 0.3, // 阈值
})

onMounted(() => {
  ob.observe(footerBoxRef.value)
})


</script>


<style lang="less">
#footerBox {
  position: relative;
  background: linear-gradient(rgba(255, 255, 255, 0) 0, #FFFFFF 20%);
  background-size: cover;
}

#footerBox #footer-wrap {
  color: #4c4948;
  position: relative;
  padding: 40px 20px 0;
  text-align: center;

  .footer-icon-list {
    display: flex;
    align-items: center;
    justify-content: center;

    .icon_link {
      margin: 1rem 27px;
      border-radius: 3rem;
      width: 32px;
      height: 32px;

      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      color: #fff;
      background: #363636;
      transition: .3s;
      cursor: pointer;

      i {
        font-size: 1rem;
        line-height: 1rem;
        height: 1rem;
      }

      &:hover {
        color: #fff;
        background: #425aef;
        transform: scale(1.1);
      }
    }

    .image_link {
      width: 50px;
      height: 50px;
      margin: 0 1rem;
      cursor: pointer;
      transition: 0.3s;

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        object-position: 0 0;
      }

      &:hover {
        transform: scale(1.2);
      }

    }
  }

  .footer-info-list {

    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1200px;
    margin: 1rem auto;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 2rem;

    .footer-group {
      min-width: 120px;

      .footer-group-title {
        color: rgba(60, 60, 67, 0.8);
        font-size: 1rem;
        text-align: left;
        font-weight: 600;
        margin: 1rem 0;
      }

      .footer-group-link {

        display: flex;
        flex-direction: column;

        span {
          font-size: 1rem;
          line-height: 1rem;
          color: #363636;
          margin: 8px auto 8px 0;
          overflow: hidden;
          white-space: nowrap;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          max-width: 120px;
          cursor: pointer;
          padding: 2px 0;
          text-decoration: none;
          transition: 0.3s;

          &:hover {
            color: #425aef;
          }
        }
      }
    }
  }

}


#footerBox #footer-bar {
  padding: 1rem;
  color: #363636;
  margin-top: 1rem;
  background: #f7f7f9;
  display: flex;
  overflow: hidden;
  z-index: 1002;
  transition: .3s;

  .footer-bar-link {
    display: flex;
    justify-content: space-between;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    flex-wrap: wrap;
    align-items: center;
    line-height: 1;

    .footer-bar-left {
      letter-spacing: 2px;

      a {
        margin-top: 8px;
        margin-bottom: 8px;
        margin-left: 5px;
        margin-right: 1rem;
        color: #363636;
        font-size: 1rem;
        font-weight: 700;
        white-space: nowrap;
        text-decoration: none;
        transition: all .2s ease 0s;

        &:hover {
          color: #425aef;
        }
      }
    }

    .footer-bar-right {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      .footer-bar-item {
        margin-top: 8px;
        margin-bottom: 8px;
        margin-right: 1rem;
        color: #363636;
        font-size: 1rem;
        font-weight: 700;
        white-space: nowrap;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
          color: #425aef;
        }
      }
    }
  }
}
</style>