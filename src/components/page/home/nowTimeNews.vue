<template>
  <div class="now-time-news">

    <span title="即刻时刻">即刻</span>
    <div class="news-list">
      <div class="swiper-wrapper" aria-live="off">
        <a role="group" class="swiper-item">
          支持了Accesskey快捷键，可以直接按下shift + ?组合键以查看快捷键选项。 [图片]
        </a>
        <a role="group" class="swiper-item">
          React中不能直接修改state的一个重要原因是在性能优化时的prueComponment会进行浅层比较会认为是用一个对象且不能进入队列中批量更新
        </a>
        <a role="group" class="swiper-item">
          由于日本不顾我方严正声明与国际抗议，一意孤行，于 2023 年 8 月 24
          日将核废水排入大海，本着国际环保主义的内心，拥有国际环保意识的我只能单方面制裁，禁止日本地区访问旗下所有业务，希望日方能够尽快悔过自新，明白事情的严重性！😤
        </a>
        <a role="group" class="swiper-item">
          特斯拉试驾，体验感很不错，有被辅助驾驶惊艳到，后面还去看了看比亚迪汉，直观感受是类似油车的按钮很多，内饰比特斯拉的高级很多，犹如毛坯房见到了精装一般，但是车机系统比特斯拉的差很多，应该相当于15-16年的ipad，滑动掉帧且手指不舒服。
          [图片]
        </a>
        <a role="group" class="swiper-item">
          音乐支持了参数设置自定义歌单
        </a>
      </div>
    </div>
    <a class="look-item" href="" title="查看全文">
      <i class="iconfont icon-xiangyou2"></i>
    </a>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.now-time-news {
  background: #fff;
  color: #363636;
  padding: .5rem 1rem;
  border-radius: 12px;
  box-shadow: 0 5px 12px -5px rgba(102, 68, 68, 0);
  display: flex;
  transition: all .3s ease 0s;
  margin: 1rem auto 0;
  border: 1px solid #e3e8f7;
  align-items: center;
  height: 50px;
  width: 100%;
  max-width: calc(1400px - 3rem);
  animation: slide-in .6s 0s backwards;

  &:hover {
    border: 1px solid #425aef;
    box-shadow: 0 8px 12px -3px #425aef23;
  }

  span {
    display: block;
    width: 5%;
    font-size: 1.2rem;
    line-height: 22px;
    margin-right: 1rem;
    transition: all .3s ease 0s;
    cursor: pointer !important;

    &:hover {
      color: #425aef;
    }
  }

  .news-list {
    width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 99;

    .swiper-wrapper {
      width: 100%;
      height: 30px;
      line-height: 30px;
      display: flex;
      flex-direction: column;

      a {
        color: #363636;
        text-decoration: none;
        word-wrap: break-word;
        -webkit-transition: all .2s ease 0s;
        -moz-transition: all .2s ease 0s;
        -o-transition: all .2s ease 0s;
        -ms-transition: all .2s ease 0s;
        transition: all .2s ease 0s;
        overflow-wrap: break-word;
        font-size: 1.1rem;
      }

      .swiper-item {
        height: 30px;
        width: 100%;
        max-width: 100%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: .3s;
        font-weight: 700;
        margin: auto;
        cursor: pointer;
        white-space: nowrap;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        position: relative;
        -webkit-transition-property: -webkit-transform;
        transition-property: -webkit-transform;
        -o-transition-property: transform;
        transition-property: transform;
        transition-property: transform, -webkit-transform;

        &:hover {
          color: #425aef;
        }
      }
    }
  }

  .look-item {

    color: #363636;
    text-decoration: none;
    word-wrap: break-word;
    -webkit-transition: all .2s ease 0s;
    -moz-transition: all .2s ease 0s;
    -o-transition: all .2s ease 0s;
    -ms-transition: all .2s ease 0s;
    transition: all .2s ease 0s;
    overflow-wrap: break-word;
    display: flex;
    align-items: center;

    i {
      font-size: 1.2rem;
      font-weight: 600;
    }

    &:hover {
      color: #425aef;
    }
  }

}
</style>