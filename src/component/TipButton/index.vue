/*
 * @File: 操作前提示按钮
 * @Wiki:
 * @Author: yu
 * @Date: 2018-08-31 19:49:05
 * @USAGE:
 * <TipButton @click="handleClick">提交</TipButton>
 * TipButton接受Button的所有属性
 * tip: 提示文案
 */

<template>
  <el-button v-bind="$props" @click="handleClick"><slot></slot></el-button>
</template>
<script>
import { Button } from 'element-ui';

export default {
  name: 'TipButton',
  props: {
    ...Button.props,
    tip: {
      type: String,
      default: '确定执行该操作？',
    },
  },
  methods: {
    handleClick() {
      this.$confirm(this.tip, '提示', {
        type: 'warning',
      }).then(() => {
        this.$emit('click');
      }).catch(err => err);
    },
  },
};
</script>
