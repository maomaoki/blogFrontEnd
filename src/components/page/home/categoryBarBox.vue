<template>
  <div id="category-bar-box">

    <div class="category-bar">

      <div class="catalog-bar">

        <div class="catalog-list">

          <div class="catalog-list-item">
            <span class="select">首页</span>
          </div>
          <div class="catalog-list-item">
            <span>前端开发</span>
          </div>
          <div class="catalog-list-item">
            <span>后端开发</span>
          </div>
        </div>

        <div class="category-bar-next">

          <i class="iconfont icon-shaixuanyoubian"></i>
        </div>

        <a href="" class="catalog-more">
          更多
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>


<style lang="less">
#category-bar-box {
  width: 100%;
  display: flex;

  .category-bar {
    padding: .5rem 10px;
    background: #fff;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    border: 1px solid #e3e8f7;
    width: 100%;
    height: 50px;
    border-radius: 12px;
    transition: all .3s ease 0s;
    animation: slide-in .6s .3s backwards;

    .catalog-bar {
      overflow-y: hidden;
      margin: -.2rem 0;
      border-radius: 8px;
      display: flex;
      border: 8px;
      justify-content: flex-start;
      align-items: center;

      .catalog-list {
        display: flex;
        white-space: nowrap;
        overflow-x: hidden;

        .catalog-list-item {
          display: flex;
          align-items: center;
          cursor: pointer;

          span {
            color: #4c4948;
            margin-right: .3rem;
            font-weight: 700;
            transition: all .3s ease-in-out;
            display: flex;
            align-items: center;
            padding: .1rem .5rem;
            height: 30px;
            line-height: 30px;
            border-radius: 8px;
          }

          span.select {
            background: #425aef;
            color: #fff;
            border-radius: 8px;
          }

          &:hover span {
            background: #425aef;
            color: #fff;
            border-radius: 8px;
          }
        }

      }

      .category-bar-next {
        margin-left: 16px;
        cursor: pointer;
        display: flex;

        i {
          line-height: inherit;
          transition: all .3s ease 0s;
        }

        &:hover i {
          color: #425aef;
        }
      }

      .catalog-more {
        min-width: fit-content;
        font-weight: 700;
        color: #363636;
        margin-left: 16px;
        text-decoration: none;
        word-wrap: break-word;
        -webkit-transition: all .2s ease 0s;
        -moz-transition: all .2s ease 0s;
        -o-transition: all .2s ease 0s;
        -ms-transition: all .2s ease 0s;
        transition: all .2s ease 0s;
        overflow-wrap: break-word;

        &:hover {
          color: #425aef;
        }
      }
    }

  }

}
</style>