/*
 * @File: 懒执行按钮（节流）
 * @Wiki:
 * @Author: yu
 * @Date: 2018-08-24 19:49:05
 * @USAGE:
 * <LazyButton @click="handleClick" :gap="4000">提交</LazyButton>
 * LazyButton接受Button的所有属性
 * gap: 节流周期（单位为ms）
 */

<template>
  <el-button v-bind="$props" @click="handleClick"><slot></slot></el-button>
</template>
<script>
import { Button } from 'element-ui';

export default {
  name: 'LazyButton',
  props: {
    ...Button.props,
    gap: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      isExcuting: false,
    };
  },
  methods: {
    handleClick() {
      if (this.isExcuting) {
        return;
      }
      this.isExcuting = true;
      this.$emit('click');
      setTimeout(() => {
        this.isExcuting = false;
      }, this.gap);
    },
  },
};
</script>
