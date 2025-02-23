<template>
  <nav id="navBox">

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

      <div class="nav-right">
        <div class="nav-button">
          <span title="搜索🔍">
             <i class="iconfont icon-sousuo1"></i>
          </span>
        </div>
        <div class="widget" title="中控台">
          <i class="widget-left"></i>
          <i class="widget-content"></i>
          <i class="widget-right"></i>
        </div>
      </div>

    </div>

  </nav>
</template>

<script lang="ts" setup>

</script>


<style lang="less">
#navBox {

  width: 100%;
  height: 60px;
  padding: 0 calc((100% - 1400px + 3rem) / 2);

  i {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .nav-group {
    display: flex;
    align-items: center;
    position: relative;

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
      z-index: 999;

      .menu-list {
        position: relative;
        width: fit-content;
        text-align: center;
        left: 0;
        right: 0;
        top: 0;
        display: -webkit-box;
        display: -moz-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: box;
        display: flex;
        -webkit-box-orient: horizontal;
        -moz-box-orient: horizontal;
        -o-box-orient: horizontal;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -o-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;

        .menu-item {
          padding: 0 .4rem;
          display: -webkit-box;
          display: -moz-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: box;
          display: flex;
          -webkit-box-orient: vertical;
          -moz-box-orient: vertical;
          -o-box-orient: vertical;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: center;
          -moz-box-align: center;
          -o-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
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
            border-radius: 5px;
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
            -webkit-box-sizing: content-box;
            -moz-box-sizing: content-box;
            box-sizing: content-box;
            line-height: 35px;
            -webkit-transform: translateY(-10px) scale(0);
            -moz-transform: translateY(-10px) scale(0);
            -o-transform: translateY(-10px) scale(0);
            -ms-transform: translateY(-10px) scale(0);
            transform: translateY(-10px) scale(0);
            -webkit-transform-origin: top;
            -moz-transform-origin: top;
            -o-transform-origin: top;
            -ms-transform-origin: top;
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
            -webkit-transform: translateY(0) scale(1);
            -moz-transform: translateY(0) scale(1);
            -o-transform: translateY(0) scale(1);
            -ms-transform: translateY(0) scale(1);
            transform: translateY(0) scale(1);
          }
        }
      }
    }

    .nav-right {
      z-index: 102;
      position: absolute;
      right: 0;
      display: -webkit-box;
      display: -moz-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: box;
      display: flex;
      -webkit-box-orient: horizontal;
      -moz-box-orient: horizontal;
      -o-box-orient: horizontal;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      height: 100%;
      -webkit-box-align: center;
      -moz-box-align: center;
      -o-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
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

          i {

          }
        }
      }

      .widget {
        --icon-size: 1.375rem;
        position: relative;
        right: 0;
        top: 0;
        bottom: 0;
        height: 1.375rem;
        width: 1.375rem;
        cursor: pointer;
        -webkit-transition: 1s;
        -moz-transition: 1s;
        -o-transition: 1s;
        -ms-transition: 1s;
        transition: 1s;
        margin-left: 1rem;

        i {
          background: #4c4948;
          position: absolute;
          border-radius: calc(1.375rem * .15);
          -webkit-transition: .5s cubic-bezier(0.6, 0.1, 0, 1);
          -moz-transition: .5s cubic-bezier(0.6, 0.1, 0, 1);
          -o-transition: .5s cubic-bezier(0.6, 0.1, 0, 1);
          -ms-transition: .5s cubic-bezier(0.6, 0.1, 0, 1);
          transition: .5s cubic-bezier(0.6, 0.1, 0, 1);
          inset: 0;
          margin: auto;
          right: auto;
          width: calc(1.375rem / 3);
          height: calc(1.375rem / 3);
          -webkit-transform: translateY(calc(1.375rem / 4));
          -moz-transform: translateY(calc(1.375rem / 4));
          -o-transform: translateY(calc(1.375rem / 4));
          -ms-transform: translateY(calc(1.375rem / 4));
          transform: translateY(calc(1.375rem / 4));
        }

        i.widget-left {
          width: 100%;
          -webkit-transform: translateY(calc(1.375rem / -4));
          -moz-transform: translateY(calc(1.375rem / -4));
          -o-transform: translateY(calc(1.375rem / -4));
          -ms-transform: translateY(calc(1.375rem / -4));
          transform: translateY(calc(1.375rem / -4));
        }

        i.widget-content {
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
            -webkit-transform: none;
            -moz-transform: none;
            -o-transform: none;
            -ms-transform: none;
            transform: none;
          }
        }
      }
    }
  }
}
</style>