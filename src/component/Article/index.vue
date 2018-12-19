<template>
  <div class="container">
    <div :class="{'border-b mb30': line}">
      <h2 class="title mb5">
        <slot name="title"></slot>
      </h2>
      <h3 class="subtitle mb10">
        <slot name="subtitle"></slot>
      </h3>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    line: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang='less'>
  .container {
    padding: 20px 0;
    .title {
      font-size: 2em;
    }
    .subtitle {
      font-size: 1.1em;
      padding-bottom: 10px;
      font-weight: 300;
      &:empty {
        display: none;
      }
    }
  }
</style>
