<template>
  <div id="sticky_layout">

    <div class="card-widget">

      <div class="card-tags">

        <div class="item-headers-line"></div>

        <div class="card-tags-content">
          <div class="tag-item"
               v-for="item in tagsList"
               :class="item.isActive?'active':''"
               :key="item.id">
            {{ item.name }}
            <sup>{{ item.count }}</sup>
          </div>
        </div>

        <hr/>

        <div class="article-count-content">

          <div v-for="item in 8" class="article-count-item">

            <a href="">
              <span class="article-date">八月 2023</span>

              <span class="article-num-group">

                      <span class="article-num">
                          4
                      </span>
                      <span class="article-num-text">
                          篇
                      </span>
                    </span>
            </a>
          </div>
        </div>

        <hr/>

        <div class="web-info-content">

          <div v-for="item in 3" class="web-info-item">
            <div class="info-item-left">
              <i class="iconfont icon-tushu"></i>
              <div class="item-name">
                文章总数
              </div>
            </div>
            <div class="info-item-right">
              70
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts" setup="">
const tagsList = [
  {
    id: 1,
    name: "AI",
    count: 3,
    isActive: false
  },
  {
    id: 2,
    name: "HTML",
    count: 2,
    isActive: true
  },
  {
    id: 3,
    name: "JavaScript",
    count: 3,
    isActive: false
  },
  {
    id: 4,
    name: "Java",
    count: 3,
    isActive: true
  },
  {
    id: 5,
    name: "React",
    count: 8,
    isActive: false
  },
  {
    id: 6,
    name: "Vue",
    count: 10,
    isActive: true
  },
  {
    id: 7,
    name: "MySQL",
    count: 6,
    isActive: false
  }
]
</script>


<style lang="less">
#sticky_layout {
  display: flex;
  flex-direction: column;
  position: sticky;
  transition: top .3s;
  top: 60px;

  .card-widget {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
    padding: 20px 24px;
    border-radius: 12px;
    -webkit-box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.047);
    background: #fff;
    border: 1px solid #e3e8f7;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -o-transition: .3s;
    -ms-transition: .3s;
    transition: .3s;

    .card-tags {

      .item-headers-line {
        padding-bottom: 0;
        margin-left: 8px;
        font-size: 1em;
        font-weight: 700;
        display: flex;
        align-items: center;

      }

      .card-tags-content {
        display: flex;
        flex-wrap: wrap;


        .tag-item {
          line-height: 2;
          font-size: 1.05rem;
          border-radius: 8px;
          margin-right: 4px;
          padding: 1px 8px;
          color: #363636;
          width: max-content;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s ease 0s;
          cursor: pointer;

          &:hover {
            background: #425aef;
            color: #fff !important;
            -webkit-box-shadow: 0 8px 12px -3px #425aef23;
            box-shadow: 0 8px 12px -3px #425aef23;
          }

          sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
            top: -0.5em;
            right: -2px;
            opacity: .4;
            margin-left: 2px;
          }
        }

        .tag-item.active {
          font-size: 1.05rem;
          font-weight: 500;
          color: #425aef;
        }

      }

      hr {
        width: calc(100% - 4px);
        display: flex;
        position: relative;
        margin: 1rem 0;
        border: 1px dashed #425aef23;

      }

      .article-count-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;

        .article-count-item {
          width: 100%;
          flex: 0 0 48%;
          line-height: 2;


          a {
            padding: 3px 10px;
            overflow-wrap: break-word;
            text-decoration: none;
            color: #4c4948;
            transition: all .2s;
            border-radius: 8px;
            margin: 4px 0;
            display: flex;
            flex-direction: column;
            align-content: space-between;
            border: 1px solid #e3e8f7;

            &:hover {
              color: #fff;
              background-color: #425aef;
              border-radius: 8px;
              border: 1px solid transparent;
            }


            .article-date {
              font-size: 13px;
              opacity: .6;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: auto;
              flex: inherit;
            }

            .article-num-group {
              display: flex;
              flex-direction: row;
              align-items: baseline;

              .article-num {
                text-align: left;
                font-size: 1.1rem;
                line-height: .9;
                font-weight: 700;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: auto;
                flex: inherit;
              }

              .article-num-text {
                width: fit-content;
                margin-left: 4px;
                font-size: 0.95rem;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }

      }

      .web-info-content {
        .web-info-item {
          display: flex;
          align-items: center;
          padding: 2px 10px 0;
          justify-content: space-between;
          color: #4c4948;

          .info-item-left {
            display: flex;
            box-flex: 1;
            align-items: center;
            padding-right: 20px;

            i {
              line-height: 2;
              margin-right: 6px;
              width: 16px;
              text-align: center;
            }

          }

          .info-item-right {

            opacity: .8;
          }
        }
      }
    }
  }
}
</style>