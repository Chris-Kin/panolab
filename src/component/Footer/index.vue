/*
 * @File: 公共页脚
 * @Wiki:
 * @Author: yu
 * @Date: 2018-04-12 02:49:02
*/
<template>
  <div class="wrapper">
    <span>&copy; All right Reserved.</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEN: false,
    };
  },
};
</script>

<style scoped lang='less'>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: #ccc;
    background-color: #495060;
    position: relative;
    &>span:nth-child(2) {
      position: absolute;
      right: 0;
    }
  }
</style>
