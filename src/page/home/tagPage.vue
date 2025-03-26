<template>
  <div id="tagPage" class="top-150">

    <div id="tagsContentContent">

      <div class="tagsContent-title">
        <h1>标签</h1>
      </div>
      <div class="tagsContent-content">
        <div v-for="item in 10" class="tagsContent-content-item">
          <span class="tags-punctuation">
            #
          </span>
          前端开发
          <span class="tagsPageCount">
            26
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

</script>


<style lang="less">
#tagPage {
  max-width: 1400px;
  display: flex;
  flex: 1 auto;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  width: 100%;
  justify-content: center;

  #tagsContentContent {
    width: 100% !important;
    transition: all .3s ease 0s;
    border-radius: 12px;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    padding: 2rem 2.5rem;
    border: 1px solid #e3e8f7;
    align-self: flex-start;
    animation: slide-in .6s .1s backwards;

    .tagsContent-title {
      margin: 8px 0 20px;

      h1 {
        position: relative;
        color: #1f2d3d;
        font-weight: 700;
      }
    }

    .tagsContent-content {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      > div {
        font-size: 22px;
        margin: 5px 10px;
      }

      .tagsContent-content-item {
        line-height: 1.6;
        display: flex;
        align-items: center;
        color: #363636 !important;
        padding: 3px 12px;
        margin: 10px;
        border-radius: 8px;
        border: 1px solid #e3e8f7;
        cursor: pointer;
        transition: all 0.3s ease 0s;

        .tags-punctuation {
          margin-right: 4px;
        }

        .tagsPageCount {
          padding: 4px 6px;
          background: #f7f7f9;
          border: 1px solid #e3e8f7;
          min-width: 22.5px;
          display: inline-block;
          border-radius: 4px;
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          color: #363636;
          margin-left: 6px;
        }
      }

      .tagsContent-content-item:hover {
        box-shadow: 0 8px 12px -3px #425aef23;
        color: #fff !important;
        background: #425aef;
        border: 1px solid transparent;
      }
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>