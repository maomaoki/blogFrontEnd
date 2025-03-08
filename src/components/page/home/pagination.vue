<template>
  <div id="pagination">

    <div class="pagination-content">

      <div class="extend prev"
           v-if="currentPage != 1"
           @click="prevPage">
        <i class="iconfont icon-zuobian"></i>
        <div class="extend-font">上一页</div>
      </div>

      <!-- 显示第一页 -->
      <div @click="toPage(1)" class="page-number"
           v-if="startEnd.start > 1"
           :class="[currentPage == 1  ? 'is-active':'']">
        1
      </div>
      <!-- 当第一页和连续页码起始页之间有间隔时显示省略号 -->
      <div class="page-number is-leave" v-if="startEnd.start > 2">
        ...
      </div>
      <!-- 显示中间连续的页码 -->
      <div class="page-number"
           v-for="page in range(startEnd.start, startEnd.end)"
           :key="page"
           @click="toPage(page)"
           :class="[currentPage == page  ? 'is-active':'']"
      >
        {{ page }}
      </div>
      <!-- 当连续页码结束页和最后一页之间有间隔时显示省略号 -->
      <div class="page-number is-leave" v-if="startEnd.end < totalPage - 1">...</div>
      <!-- 显示最后一页 -->
      <div @click="toPage(totalPage)" class="page-number" v-if="startEnd.end < totalPage">{{ totalPage }}</div>

      <div class="toPageGroup">
        <input
            v-model="searchPageModel"
            class="toPageText"
            type="text"
            oninput="value=value.replace(/[^0-9]/g,'')"
            maxlength="3"
            onkeyup="value=value.replace(/[^0-9]/g,'')"
        >
        <div class="toPageButton" @click="searchPage">
          <i class="iconfont icon-shaixuanyoubian"></i>
        </div>
      </div>
      <div class="extend next"
           v-if="currentPage < totalPage"
           @click="nextPage">
        <div class="extend-font">下一页</div>
        <i class="iconfont icon-youbian"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {computed, ref, toRef} from "vue";

type propsType = {
  changePage: (currentPage: number) => void,
  total: number,
  pageSize: number,
  space?: number
}

const props = defineProps<propsType>()


/**
 *  总条数
 */
const total = toRef(props, "total")


/**
 *  一页 多少条
 */
const pageSize = toRef(props, "pageSize")

/**
 * 间隔 多少 出现 省略号 默认 5
 */
const space = toRef(props, "space")


/**
 *  当前 第几页
 */
const currentPage = ref<number>(1)

/**
 * 总页数
 */
const totalPage = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})


/**
 * 搜索 页面 数据
 */
const searchPageModel = ref<number>()

// 计算中间连续页码的开始、结束位置
const startEnd = computed(() => {
  let start = 0, end = 0;
  // 总页数不够，那么就不存在中间连续页码的问题了
  if (totalPage.value < (space.value ?? 5)) {
    start = 1;
    end = totalPage.value;
  } else {
    // 连续页码数量的一半
    const dx = Math.floor((space.value ?? 5) / 2);
    start = Number.parseInt(currentPage.value + '') - dx;
    end = Number.parseInt(currentPage.value + '') + dx;
    // 判断边界（假如有20页）
    if (start < 1) {
      start = 1;
      // 1 2 3  ... 20
      end = (space.value ?? 5);
    }
    if (end > totalPage.value) {
      end = totalPage.value;
      // 1 ... 16 17 18 19 20
      start = totalPage.value - (space.value ?? 5) + 1;
    }
  }

  return {start, end};
});

// 生成指定范围的数组
const range = (start: number, end: number) => {
  return Array.from({length: end - start + 1}, (_, i) => start + i);
};

/**
 * 上一页 操作
 */
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    // 触发 选项 修改 方法
    props.changePage(currentPage.value)
  }
}


/**
 *
 * 下一页 操作
 */
function nextPage() {
  if (currentPage.value < totalPage.value) {
    currentPage.value++
    // 触发 选项 修改 方法
    props.changePage(currentPage.value)
  }
}

/**
 *  点击 跳转 页 操作
 */
function toPage(page: number) {
  currentPage.value = page
  // 触发 选项 修改 方法
  props.changePage(currentPage.value)
}


/**
 * 搜索页码 操作
 */
function searchPage() {

  if (searchPageModel.value && searchPageModel.value == currentPage.value) {
    return
  }

  if (searchPageModel.value && searchPageModel.value > totalPage.value) {
    searchPageModel.value = 1
    return
  }

  if (searchPageModel.value) {
    currentPage.value = Number.parseInt(searchPageModel.value + '')
    // 触发 选项 修改 方法
    props.changePage(currentPage.value)
    return
  }
}
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