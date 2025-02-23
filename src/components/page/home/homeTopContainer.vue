<template>
  <div id="home-top-container">

    <div class="banner-group">

      <div class="random-banner">

        <div class="banner-title">
          <div class="banner-title-big">生活明朗</div>
          <div class="banner-title-big">万物可爱。</div>
          <div class="banner-title-small">ANHEYU.COM</div>
        </div>

        <div class="skills-tags-group-all">

          <div class="tags-group-wrapper">

            <div class="tags-group-icon-pair" v-for="item in 10">

              <div class="tags-group-icon" style="background: #2e3a41">
                <img src="../assets/images/6330ff27e5c9b.png" alt="">
              </div>
              <div class="tags-group-icon" style="background: #fff">
                <img src="../assets/images/pinia-logo.svg" alt="">
              </div>

            </div>
          </div>
        </div>

        <div class="random-hover">

          <i class="iconfont icon-feiji"></i>

          <div class="bannerText">
            随便逛逛
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </div>
      </div>

      <div class="categoryGroup">

        <div class="categoryItem">

          <div class="c-button blue">

            <span>前端</span>
            <i class="iconfont icon-a-30"></i>
          </div>

        </div>
        <div class="categoryItem">

          <div class="c-button red">
            <span>大学日常</span>
            <i class="iconfont icon-kapianrehuo"></i>
          </div>

        </div>
        <div class="categoryItem">

          <div class="c-button green">
            <span>生活</span>
            <i class="iconfont icon-tushu"></i>
          </div>

        </div>
      </div>
    </div>

    <div class="top-group">

      <div class="recent-post-item">

        <div class="image-info">
          <span>推荐</span>
          <img src="../assets/images/recent-image-1.jpg" alt="">
        </div>

        <div class="text-info">
          <span>为你的博客安装上便携小空调</span>
        </div>

      </div>
      <div class="recent-post-item">

        <div class="image-info">
          <span>推荐</span>
          <img src="../assets/images/recent-image-2.jpg" alt="">
        </div>

        <div class="text-info">
          <span>为你的博客安装上便携小空调</span>
        </div>

      </div>
      <div class="recent-post-item">

        <div class="image-info">
          <span>推荐</span>
          <img src="../assets/images/recent-image-3.jpg" alt="">
        </div>

        <div class="text-info">
          <span>为你的博客安装上便携小空调</span>
        </div>

      </div>
      <div class="recent-post-item">

        <div class="image-info">
          <span>推荐</span>
          <img src="../assets/images/recent-image-4.jpg" alt="">
        </div>

        <div class="text-info">
          <span>为你的博客安装上便携小空调</span>
        </div>

      </div>
      <div class="recent-post-item">

        <div class="image-info">
          <span>推荐</span>
          <img src="../assets/images/recent-image-1.jpg" alt="">
        </div>

        <div class="text-info">
          <span>为你的博客安装上便携小空调</span>
        </div>

      </div>
      <div class="recent-post-item">

        <div class="image-info">
          <span>推荐</span>
          <img src="../assets/images/recent-image-2.jpg" alt="">
        </div>

        <div class="text-info">
          <span>为你的博客安装上便携小空调</span>
        </div>

      </div>

      <div class="todayCard hide">
        <div class="todayCard-info">
          <span>测试</span>
          <span>YunMao-Test</span>
        </div>
        <img src="../assets/images/banner-right.jpg" alt="">

        <div class="banner-group-button">

          <div class="banner-button">

            <i class="iconfont icon-xieyou"></i>
            <span>查看更多</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

</script>


<style lang="less">
#home-top-container {
  height: auto;
  width: 100%;
  margin: 1rem auto 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  user-select: none;

  .banner-group {
    width: calc(100% - 600px - 2rem);
    height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .random-banner {
      display: flex;
      width: 100%;
      height: 76%;
      background: #fff;
      margin-bottom: .5rem;
      border: 1px solid #e3e8f7;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      -webkit-box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
      -o-box-orient: vertical;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      overflow: hidden;
      -webkit-transition: .3s;
      -moz-transition: .3s;
      -o-transition: .3s;
      -ms-transition: .3s;
      transition: .3s;
      cursor: pointer;
      will-change: transform;

      .banner-title {
        animation: slide-in .6s .3s backwards;
        top: 2.9rem;
        left: 3rem;
        position: absolute;
        display: flex;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -o-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;

        .banner-title-big {
          font-size: 36px;
          line-height: 1;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .banner-title-small {
          font-size: 12px;
          line-height: 1;
          color: rgba(60, 60, 67, 0.8);
          margin-top: 8px;
          margin-bottom: .5rem;
        }
      }

      .skills-tags-group-all {
        display: flex;
        transition: .3s;
        -webkit-transform: rotate(-30deg);
        -moz-transform: rotate(-30deg);
        -o-transform: rotate(-30deg);
        -ms-transform: rotate(-30deg);
        transform: rotate(-30deg);

        .tags-group-wrapper {
          margin-top: 7rem;
          display: flex;
          flex-wrap: nowrap;
          animation: rowup 60s linear infinite;

          .tags-group-icon-pair {
            margin-left: 1rem;

            .tags-group-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              font-size: 66px;
              font-weight: 700;
              box-shadow: 0 2px 16px -3px rgba(0, 0, 0, 0.15);
              width: 120px;
              height: 120px;
              border-radius: 30px;

              img {
                border-style: none;
                border-radius: 8px;
                max-width: 100%;
                transition: all .2s ease 0s;
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -ms-user-drag: none;
                user-drag: none;
                width: 60px;
                margin: 0 auto !important;
              }

              &:nth-child(even) {
                margin-top: 1rem;
                transform: translate(-60px);
              }
            }
          }

          @keyframes rowup {
            0% {
              transform: translateX(0)
            }

            100% {
              transform: translateX(-50%)
            }
          }
        }
      }

      .random-hover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #425aef;
        color: #fff;
        padding-left: .5rem;
        display: flex;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -o-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -o-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        -webkit-transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
        -moz-transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
        -o-transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
        -ms-transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
        transition: cubic-bezier(.71, .15, .16, 1.15) .6s;
        font-size: 60px;

        i {
          font-size: 80px;
          margin-left: 10px;
          line-height: 1;
        }

        .bannerText {
          display: flex;
          align-items: center;

        }

      }

      &:hover {
        -webkit-box-shadow: 0 8px 12px -3px #425aef23;
        box-shadow: 0 8px 12px -3px #425aef23;

      }

      &:hover .random-hover {
        opacity: 1;
        -ms-filter: none;
        filter: none;
        padding-left: 2rem;
        background: #425aefdd;
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -o-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -o-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        -ms-transition: .3s;
        transition: .3s;
        background-size: 200%;
        cursor: pointer;
      }


    }


    .categoryGroup {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      min-width: 200px;
      height: 24%;
      width: 100%;
      animation: slide-in .6s .2s backwards;

      .categoryItem {
        overflow: hidden;
        transform: scale(1);
        transition: all .8s cubic-bezier(.65, .15, .37, 1.19);
        height: 100%;
        border-radius: 12px;
        width: calc(100% / 3 - .33rem);
        margin-right: .5rem;


        &:hover {
          width: 50%;
        }

        &:hover .c-button i {
          opacity: .8;
          transition: .8s;
          transition-delay: .15s;
          transform: scale(1.03);
          font-size: 2.5rem;
          filter: blur(0);
          top: 15%;
        }


        .c-button {
          height: 100%;
          width: 100%;
          background: #fff;
          border-radius: 12px;
          display: inline-block;
          text-align: left;
          line-height: 4em;
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
          transition: all .8s cubic-bezier(.39, .575, .565, 1);
          transform: scale(1);
          overflow: hidden;
          font-family: inherit;
          cursor: pointer;

          span {
            padding-left: 21px;
          }

          i {
            font-size: 5rem;
            opacity: .2;
            position: absolute;
            right: 0;
            top: 20%;
            transition: .3s;
            width: 100px;
            text-align: center;
            filter: blur(2px);
            transform: scale(1) rotate(15deg);
          }

          &:after {
            top: 47px;
            width: 1rem;
            left: 21px;
            height: 2px;
            background: #fff;
            content: "";
            border-radius: 1px;
            position: absolute;
          }
        }

        .blue {
          background: linear-gradient(to right, #358bff, #15c6ff);
          background-size: 200%;
        }

        .red {
          background: linear-gradient(to right, #f65, #ffbf37);
          background-size: 200%;
        }

        .green {
          background: linear-gradient(to right, #18e7ae, #1eebeb);
          background-size: 200%;
        }

        &:nth-child(1) {
          box-shadow: 0 8px 12px -3px rgba(40, 109, 234, 0.2);
        }

        &:nth-child(2) {
          box-shadow: 0 8px 12px -3px rgba(238, 125, 121, 0.212);
        }

        &:nth-child(3) {
          box-shadow: 0 8px 12px -3px rgba(135, 238, 121, 0.212);
        }
      }


    }
  }

  .top-group {
    height: 340px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: calc(600px + 1.5rem);
    position: relative;
    align-content: space-between;

    .recent-post-item {
      display: flex;
      width: 200px;
      flex-direction: column;
      align-items: flex-start;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      min-width: 200px;
      height: 164px !important;
      max-height: 164px;
      border: 1px solid #e3e8f7;
      transition: .3s;
      position: relative;
      box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
      margin-left: .5rem;
      margin-right: 0;
      margin-bottom: .5rem;
      cursor: pointer;

      .image-info {
        width: 100%;

        span {
          position: absolute;
          top: 0;
          left: -40px;
          display: flex;
          z-index: 1;
          background: #425aef;
          color: #fff;
          padding: 2px 8px;
          font-size: 12px;
          border-radius: 12px 0 12px 0;
          transition: .3s;
          cursor: pointer;
        }

        img {
          height: 100px;
          overflow: hidden;
          display: flex;
          object-fit: cover;
          width: 100%;
          background: #f7f7f9;
          border-radius: 12px 12px 0 0;
        }
      }

      .text-info {
        padding: .3rem .5rem .3rem .5rem;
        transition: .3s;

        span {
          -webkit-line-clamp: 2;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          line-height: 1.5;
          justify-content: center;
          align-items: flex-end;
          align-content: center;
          padding-top: .5rem;
          font-weight: 700;
          font-size: 1rem !important;
          padding: 0 !important;
          color: #363636;
        }
      }

      &:hover {

        .image-info span {
          left: 0;
        }

        .text-info span {
          color: #425aef;
        }
      }
    }


    .todayCard {
      position: absolute;
      width: calc(600px + 1rem);
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      background: #fff;
      border-radius: 12px;
      margin-left: .5rem;
      overflow: hidden;
      transition: .3s;
      display: flex;
      cursor: pointer;
      pointer-events: all;


      .todayCard-info {
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        z-index: 2;
        color: #fff;
        max-width: 60%;
        transition: .3s;
        display: flex;
        flex-direction: column;


        span:nth-child(1) {
          opacity: .8;
          font-size: 14px;
          margin-bottom: 5px;
        }

        span:nth-child(2) {
          font-size: 28px;
          font-weight: 700;
          line-height: 36px;
        }
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 80px;
        background: #f7f7f9;
        border-radius: 12px 12px 0 0;
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        top: 0;
        left: 0;
        background-size: cover;
        z-index: -1;
        transition: .3s;
      }

      .banner-group-button {
        position: absolute;
        right: 2rem;
        bottom: 2rem;
        display: flex;
        transition: .3s;

        .banner-button {
          padding: 8px 12px;
          box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.05);
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          color: #fff;
          display: flex;
          align-items: center;
          z-index: 1;
          transition: .3s;
          cursor: pointer;
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transform: translateZ(0);
          height: 40px;
          width: 125px;
          justify-content: center;

          i {
            margin-right: 8px;
            font-size: 18px;
          }

          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &:hover {
            background: #425aef;
            color: #fff;
          }
        }
      }
    }

    .todayCard.hide {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>