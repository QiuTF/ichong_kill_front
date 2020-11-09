<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <Header>
        <div class="logo"/>
      </Header>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="home"/>
          <span>主 页</span>
          <router-link to="/"></router-link>
        </a-menu-item>
        <a-menu-item key="2" v-show="is_manage === 'admin' ? true:false">
          <a-icon type="play-circle"/>
          <span>开始游戏</span>
          <router-link to="/start/game"></router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="team"/>
          <span>玩家列表</span>
          <router-link to="/users"></router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="select"/>
          <span>角色列表</span>
          <router-link to="/roles"></router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="ordered-list"/>
          <span>游戏记录</span>
          <router-link to="/records"></router-link>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="number"/>
          <span>Rank排行榜</span>
          <router-link to="/rank"></router-link>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="trophy"/>
          <span>赛季奖励</span>
          <router-link to="/reward"></router-link>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="history"/>
          <span>身份使用</span>
          <router-link to="/reward/use"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
        />
        <a-button class="logout_box" @click="logout">退出</a-button>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '512px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      collapsed: false,
      is_manage: window.sessionStorage.getItem('manage')
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.replace({path: '/login'})
    }
  }
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.logout_box {
  position: absolute;
  left: 88%;
  top: 25%;
  transform: translate(-50%, -50%);
}
</style>
