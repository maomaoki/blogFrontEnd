<template>
  <div id="pagination">

    <div class="pagination-content">

      <div class="extend prev">
        <i class="iconfont icon-zuobian"></i>
        <div class="extend-font">上一页</div>
      </div>
      <div class="page-number"
           v-for="(item,index) in 5"
           :class="[
                     (index +1) == 3 ? 'is-leave':'',
                     (index +1) == 1 ? 'is-active':''
                     ]"

      >
        {{ (index + 1) == 3 ? '...' : (index + 1) }}

      </div>
      <div class="toPageGroup">
        <input
            class="toPageText"
            type="text"
            oninput="value=value.replace(/[^0-9]/g,'')"
            maxlength="3"
            onkeyup="value=value.replace(/[^0-9]/g,'')"
        >
        <div class="toPageButton">
          <i class="iconfont icon-shaixuanyoubian"></i>
        </div>
      </div>

      <div class="extend next">
        <div class="extend-font">下一页</div>
        <i class="iconfont icon-youbian"></i>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

</script>


<style lang="less">
#pagination {
  overflow: hidden;
  margin-top: 1rem;
  width: 100%;

  .pagination-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .extend {
      width: 5rem !important;
      height: 2.5em;
      line-height: 1.9rem !important;
      border-radius: 8px !important;
      background: #fff;
      -webkit-box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      border: 1px solid #e3e8f7;
      display: flex !important;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: absolute;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        color: #425aef;
        border: 1px solid #425aef;
        -webkit-transform: scale(1.03);
        -moz-transform: scale(1.03);
        -o-transform: scale(1.03);
        -ms-transform: scale(1.03);
        transform: scale(1.03);

      }

      i {
        font-weight: 600;
        font-size: 1.2rem;

      }
    }

    .extend.prev {
      left: 0;

      .extend-font {
        font-weight: 600;
        margin-right: -32px;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        -ms-transition: .3s;
        transition: .3s;
        opacity: 0;
      }


      &:hover {
        .extend-font {

          margin-right: 2px;
          opacity: 1;
          -ms-filter: none;
          filter: none;
          white-space: nowrap;
        }
      }
    }

    .extend.next {
      right: 0;

      .extend-font {
        font-weight: 600;
        margin-left: -32px;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        -ms-transition: .3s;
        transition: .3s;
        opacity: 0;
      }

      &:hover {
        .extend-font {
          margin-left: 2px;
          opacity: 1;
          -ms-filter: none;
          filter: none;
          white-space: nowrap;
        }
      }
    }

    .page-number {
      width: 2.5em;
      height: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .page-number:not(.page-number.is-leave) {
      border-radius: 8px !important;
      margin: 0 .3rem;
      background: #fff;
      box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      border: 1px solid #e3e8f7;
      transition: .3s;
      cursor: pointer;

      &.is-active {
        color: #fff;
        background: #425aef;
        border: 1px solid #425aef;
        -webkit-box-shadow: 0 8px 12px -3px #425aef23;
        box-shadow: 0 8px 12px -3px #425aef23;
        cursor: auto;
      }

      &:not(.is-active):hover {
        color: #425aef;
        border: 1px solid #425aef;
        -webkit-box-shadow: 0 8px 12px -3px #425aef23;
        box-shadow: 0 8px 12px -3px #425aef23;
      }

    }

    .toPageGroup {
      display: flex;
      position: relative;
      margin: 0;
      box-shadow: none;
      width: auto;
      height: 2.5em;
      transition: 0s;

      .toPageText {
        width: 2.5em;
        height: 2.5em;
        border-radius: 8px;
        border: 1px solid #e3e8f7;
        line-height: 1.15;
        margin: 0;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        -ms-transition: .3s;
        transition: .3s;
        outline-style: none;
        font-size: 16px;
        padding-left: 12px;
      }

      .toPageButton {
        display: flex;
        position: absolute;
        width: 2.5em;
        height: 2.5em;
        right: 0;
        top: 0;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
        transition: .3s;
        background: #fff;
        border: 1px solid #e3e8f7;
        cursor: pointer;

        &:hover i {
          color: #425aef;
        }
      }

      &:hover .toPageText {
        border: 1px solid #425aef;
        outline-style: none;
        width: 100px;
      }

      &:hover .toPageButton {
        width: 30px;
        height: 30px;
        right: 4px;
        top: 5px;
        background: #f7f7f9;
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 4px;
      }
    }

  }
}

@media screen and (min-width: 768px) {
  .pagination {
    overflow: visible;
  }
}
</style>