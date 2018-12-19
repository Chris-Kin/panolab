/*
 * @File: 页面公共头部
 * @Wiki:
 * @Author: yu
 * @Date: 2018-04-12 02:48:20
*/
<template>
  <div class="container">
    <section class="menuWrapper">
      <el-menu
        theme="dark"
        mode="horizontal"
      >
        <el-menu-item index="bit">
          <i class="el-icon-edit"></i>
          <span>项目速报</span>
        </el-menu-item>
        <el-menu-item index="feedback">
          <i class="el-icon-edit"></i>
          <span>投一票</span>
        </el-menu-item>
        <el-menu-item index="help">
          <i class="el-icon-edit"></i>
          <span>帮助</span>
        </el-menu-item>
      </el-menu>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PHeader',
  data() {
    return {
      isEN: false,
      keyword: '',
      isShowInput: false,
    };
  },
  methods: {

  },
};
</script>

<style scoped lang='less'>
  @media screen and (max-width: 729px) {
    .searchWrapper {
      display: none;
    }
    // 导航
    .ivu-menu-item {
      padding: 0 6px;
      span {
        display: none;
      }
    }
    .ivu-menu-submenu {
      padding: 0 6px;
    }
    .ivu-menu-submenu-title {
      span {
        display: none;
      }
    }
    // 搜索
    .searchWrapper {
      font-size: .16rem;
      width: 1rem;
    }
  }

  .container {
    display: flex;
    height: 60px;
  }
  *[class$='Wrapper'] {
    line-height: 60px;
    color: #f0f0f0;
  }
</style>
