<template>
  <div id="adminPage" :class="collapsed?'collapsed':''">


    <!--左边-->
    <div class="left">
      <!--上面是头像显示显示-->
      <div class="ym-logo">
        <img src="../assets/images/avatar/400x400.png" alt="">
        <div class="ym-logo-text">
          <div>云猫</div>
          <div>YunMao</div>
        </div>
      </div>


      <!--侧边栏-->
      <div class="ym-menu">
        <a-menu
            id="ym-a-menu"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            @click="onClick"
            :items="items"
            :inline-collapsed="collapsed"
        >
        </a-menu>

        <div class="btn">
          <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="collapsed"/>
            <MenuFoldOutlined v-else/>
          </a-button>
        </div>
      </div>
    </div>

    <!--右边-->
    <div class="right">
      <!--面包屑-->
      <div class="ym-breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="(item,index) in route.matched">
            <a :href="item.path"
               v-if="index !== route.matched.length - 1">
              {{ item.name }}
            </a>
            <span v-else>
							{{ item.name }}
						</span>
          </a-breadcrumb-item>
        </a-breadcrumb>

        <!--头像 和下拉菜单-->
        <div class="ym-methods">
          <!--返回主页-->
          <a href="/home" title="主页">
            <HomeTwoTone style="font-size: 20px"/>
          </a>
          <!--头像-->
          <div class="userAvatar-down-menus">
            <a-button type="primary" v-if="!userStore.getUserInfo().id">登录</a-button>
            <a-dropdown
                placement="bottom"
                :arrow="{ pointAtCenter: true }"
                v-else>
              <a-avatar :size="48" :src="userStore.getUserInfo().userAvatar">
                <template #icon>
                  <UserOutlined/>
                </template>
              </a-avatar>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="/admin">
                      <AppstoreOutlined style="font-size: 14px; margin-right: 5px"/>
                      后台管理
                    </a>
                  </a-menu-item>
                  <a-menu-item @click="logout">
                    <LoginOutlined style="font-size: 14px; margin-right: 5px"/>
                    <span>注销</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>

      </div>

      <!--tags-->
      <div class="ym-tags">

        <div class="tags-list">
					<span
              v-for="item in routerTagList"
              class="tags-item"
              :class="[item.path === route.path?'active':'']"
              @click="gotoRouter(item.path)"
          >
						{{ item.title }}
						<CloseOutlined style="width: 12px" v-if="item.title !=='首页'"
                           @click.stop="removeTag(item.title,item.path === route.path)"/>
					</span>
        </div>

        <div class="tags-close-btn">
          <span @click="removeAllTags">全部关闭</span>
        </div>


      </div>

      <div class="ym-main">
        <!--下面路由-->
        <router-view></router-view>
      </div>

    </div>


  </div>
</template>

<script setup lang="ts">
import {ref, h, watch} from 'vue';
import {
  UserOutlined,
  BookOutlined,
  WechatOutlined,
  CloseOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeTwoTone,
  LoginOutlined,
  AppstoreOutlined,
  PictureOutlined,
  SlidersOutlined,
  SaveOutlined
} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import {useRoute, useRouter} from "vue-router";
import {useUserStores} from "@/stores/useUserStores.ts";
import {userLogoutUsingPost} from "@/api/userController.ts";
import checkAdmin from "@/auth/checkAdmin.ts";
import checkBoss from "@/auth/checkBoss.ts";


// 登录信息
const userStore = useUserStores();


/**
 * 注销
 */
async function logout() {

  const result = await userLogoutUsingPost()
  if (result.data.code !== 0) {
    message.error("注销失败:" + result.data.msg);
    return;
  }
  message.success("注销成功");

  // 1. 需要清空一些东西
  localStorage.removeItem("tags_list");
  await router.push("/login")
}

let items = ref([
  {
    key: "/admin/home",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页",
    isAdmin: false,
  },
  {
    key: "/admin/userManage",
    icon: () => h(UserOutlined),
    label: "用户管理",
    title: "用户管理",
    isAdmin: true,
  },


  {
    key: "/admin/pictureManage",
    icon: () => h(PictureOutlined),
    label: "图片管理",
    title: "图片管理",
    isAdmin: true,
  },
  {
    key: "/admin/adminArticleManage",
    icon: () => h(BookOutlined),
    label: "文章管理",
    title: "文章管理",
    isAdmin: true,
  },
  {
    key: "/admin/adminCollectArticleManage",
    icon: () => h(SaveOutlined),
    label: "收藏文章管理",
    title: "收藏文章管理",
    isAdmin: false,
  },
  {
    key: "/admin/adminUserInfo",
    icon: () => h(WechatOutlined),
    label: "个人信息",
    title: "个人信息",
    isAdmin: false,
  }
])


/**
 * 这里 过滤菜单(系统最高权限除外)
 */
async function filterRoleMenus() {
  // 校验
  const isAdmin = await checkAdmin();
  const isBoss = checkBoss();


  // 这里是 boss 需要 额外添加
  if (isAdmin && isBoss) {
    items.value.splice(
        -1,
        0,
        {
          key: "/admin/adminSystemManage",
          icon: () => h(SlidersOutlined),
          label: "系统管理",
          title: "系统管理",
          isAdmin: true
        }
    )
    return
  }

  // 管理员 不需要拦截
  if (isAdmin) {
    return
  }


  // 以下是 非管理员 需要 过滤
  items.value = items.value.filter((item) => {
    return !item.isAdmin;
  })
}

filterRoleMenus()


/**
 * todo 这里有bug
 */
const selectedKeys = ref<string[]>(['sub1']);

/**
 * 点击跳转
 * @param e
 */
// @ts-ignore
function onClick({key}: { key: string }) {
  gotoRouter(key)
}


/**
 *  侧边栏  缩放
 */
const collapsed = ref<boolean>(false)

function toggleCollapsed() {
  collapsed.value = !collapsed.value;
}


/**
 *  面包屑数据
 */
interface breadcrumbDataType {
  name: string,
  path: string
}

const breadcrumbData = ref<breadcrumbDataType[]>([]);
/**
 *  路由 元信息
 */
const route = useRoute();

/**
 *  路由tags 数据
 */
interface routerTagDataType {
  title: string,
  path: string
}

// 初始化 数据
const string = localStorage.getItem("tags_list");
const tags = string ? JSON.parse(string as string) : [
  {
    title: "首页",
    path: "/admin/home"
  }
];
const routerTagList = ref<routerTagDataType[]>(tags)

// 监听路由变化( todo如果是没有权限进入路由就不会变化 )
watch(() => route.path, () => {

  // 选中路由
  selectedKeys.value = [route.path]

  // 面包屑
  route.matched.forEach((item) => {
    breadcrumbData.value.push({
      name: item.name as string,
      path: item.path
    })
  })


  let is;
  routerTagList.value.forEach((item) => {
    if (item.path === route.path) {
      is = true
    }
  })

  // 如果有重复 就不需要添加
  if (is) {
    return
  }
  routerTagList.value.push({
    title: (route.meta.title as string),
    path: route.path
  })

}, {immediate: true})

// 监听长度变化重新存本地
watch(() => routerTagList.value.length, () => {
  setTags()
})

/**
 *  tags 路由跳转
 * */
const router = useRouter();

function gotoRouter(path: string) {
  router.push({
    path: path,
  })
}

/**
 *  删除 tag
 * */
function removeTag(title: string, is: boolean) {

  let index = 0;

  for (let i = 0; i < routerTagList.value.length; i++) {
    if (routerTagList.value[i].title === title) {
      index = i - 1;
    }
  }

  if (is) {
    router.push({
      path: routerTagList.value[index].path
    })
  }

  routerTagList.value = routerTagList.value.filter((item) => {
    return item.title !== title
  })

}


/**
 *  删除 全部
 * */

function removeAllTags() {
  routerTagList.value = routerTagList.value.slice(0, 1);
  router.push({
    path: routerTagList.value[0].path
  })
}


/**
 *  存 数据 到 本地
 * */

function setTags() {
  localStorage.setItem("tags_list", JSON.stringify(routerTagList.value));
}


</script>

<style lang="less">
#adminPage {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    width: 240px;
    height: 100vh;
    border-right: 1px solid var(--admin_line_bg_color);
    transition: all 0.3s ease-in-out;


    .ym-logo {
      height: 90px;
      display: flex;
      align-items: center;
      padding: 20px;
      transition: all 0.3s ease-in-out;
      border-bottom: 1px solid var(--admin_line_bg_color);

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
      }

      .ym-logo-text {
        margin-left: 20px;
        letter-spacing: 4px;
        text-align: center;
        transform: scale(1);
        transform-origin: left;
        transition: all 0.3s ease-in-out;

        div:nth-child(1) {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        div:nth-child(2) {
          font-size: 12px;
        }

      }
    }

    .ym-menu {
      height: calc(100% - 90px);
      position: relative;

      .btn {
        position: absolute;
        right: 0;
        top: 48%;

        button {
          width: 38px;
        }
      }

      #ym-a-menu {
        border-inline-end: none;
      }
    }


  }

  .right {
    width: calc(100% - 240px);
    transition: all 0.3s ease-in-out;

    .ym-breadcrumb {
      width: 100%;
      height: 60px;
      padding: 0 20px;
      border-bottom: 1px solid var(--admin_line_bg_color);
      display: flex;
      justify-content: space-between;
      align-items: center;


      .ym-methods {
        display: flex;
        align-items: center;
        padding-right: 30px;

        a {
          text-align: center;
          margin-right: 30px;
        }

        .userAvatar-down-menus {


        }
      }

    }

    .ym-tags {
      width: 100%;
      height: 30px;
      border-bottom: 1px solid var(--admin_line_bg_color);
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tags-list {
        .tags-item {
          border-radius: 5px;
          border: 1px solid var(--admin_line_bg_color);
          padding: 4px 8px;
          font-size: 14px;
          cursor: pointer;
          text-align: center;

          &:not(&:last-child) {
            margin-right: 10px;
          }

          &.active {
            background-color: var(--admin_active_bg_color);
            color: var(--admin_active_font_color);
            border: none;

            .anticon:hover {
              background-color: rgb(106, 161, 255);
            }
          }


          .anticon {
            width: 12px;
            border-radius: 50%;
            margin-left: 5px;
            transition: all 0.3s;

            &:hover {
              background-color: #f0eeee;
            }
          }
        }


      }

      .tags-close-btn {
        border-radius: 5px;
        border: 1px solid var(--admin_line_bg_color);
        padding: 4px 8px;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
      }
    }

    .ym-main {
      background-color: var(--admin_main_bg_color);
      min-height: calc(100vh - 90px);
      padding: 20px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }


  &.collapsed {

    .left {
      width: 80px;

      .ym-logo {

        img {
          width: 48px;
          height: 48px;
        }

        .ym-logo-text {
          transform: scale(0);
        }
      }

    }

    .right {
      width: calc(100% - 80px);
    }
  }

}


</style>