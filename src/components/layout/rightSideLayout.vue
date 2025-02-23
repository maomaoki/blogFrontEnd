<template>
  <div id="right-side" class="isShow">

    <div class="config-btn-hidden isShow">
      <button title="繁体">
        <i class="iconfont icon-fanti"></i>
      </button>
      <button title="夜晚白天切换">
        <i class="iconfont icon-shense"></i>
      </button>
      <button title="单栏多栏切换">
        <i class="iconfont icon-fangda"></i>
      </button>
    </div>

    <div class="config-btn-show">
      <button title="设置">
        <i class="iconfont icon-shezhi"></i>
      </button>
      <button title="弹幕">
        <i class="iconfont icon-danmu"></i>
      </button>
      <button title="顶部">
        <i class="iconfont icon-wangshang"></i>
      </button>
    </div>


  </div>
</template>

<script lang="ts" setup>

</script>


<style lang="less">
#right-side {
  position: fixed;
  right: -48px;
  bottom: 100px;
  z-index: 100;
  opacity: 0;
  transition: all .5s;


  .config-btn-hidden {
    height: 0;
    opacity: 0;
    transition: transform .4s;
    transform: translate(45px, 0);

    button {

      border-radius: 5px;
      display: block;
      margin-bottom: 5px;
      width: 35px;
      height: 35px;
      background-color: #425aef;
      color: #fff;
      text-align: center;
      font-size: 16px;
      line-height: 35px;
      padding: 0;
      outline: 0;
      border: none;
      cursor: pointer;
      touch-action: manipulation;
      transition: all .5s;

      &:hover {
        background-color: aqua;
      }

    }
  }

  .config-btn-hidden.isShow {
    height: auto;
    opacity: 1;
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
  }

  .config-btn-show {

    button {

      border-radius: 5px;
      display: block;
      margin-bottom: 5px;
      width: 35px;
      height: 35px;
      background-color: #425aef;
      color: #fff;
      text-align: center;
      font-size: 16px;
      line-height: 35px;
      padding: 0;
      outline: 0;
      border: none;
      cursor: pointer;
      touch-action: manipulation;
      transition: all .5s;

      &:hover {
        background-color: aqua;
      }

    }

  }

}

#right-side.isShow {
  opacity: 0.8;
  transform: translateX(-58px);
}
</style>