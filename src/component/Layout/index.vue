/*
 * @File: 头-肚-脚页面布局
 * @Wiki:
 * @Author: yu
 * @Date: 2018-04-21 18:13:13
*/
<template>
  <div class="container">
    <div class="header-cwrapper">
      <PHeader />
    </div>
    <div class="content-cwrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import PHeader from '../Header';

export default {
  name: 'Layout',
  components: { PHeader },
};
</script>

<style scoped lang='less'>
  .container {
    height: 100%;
  }
  div[class$='-cwrapper'] {
    width: 100%;
    padding: 0 10px;
  }
  div[class$='-cwrapper'] > div {
    max-width: 1200px;
    margin: 0 auto;
  }
  .content-cwrapper {
    padding: 10px!important;
    min-height: calc(100% - 100px);
  }
</style>
