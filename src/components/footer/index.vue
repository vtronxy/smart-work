<!-- @format -->
<template>
  <div :class="[isDashBoardFlag? greyClass:blueClass,footerClass]">Copyright©2015 iFLYTEK. All rights reserved. 科大讯飞 版权所有</div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      isDashBoardFlag: true,
      footerClass: 'footer',
      blueClass: 'blue',
      greyClass: 'grey'
    };
  },
  watch: {
    $route: function() {
      if (this.$route.name === 'dashboard') {
        this.isDashBoardFlag = true;
      } else {
        this.isDashBoardFlag = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  line-height: 40px;
  text-align: center;
  color: #bbbbbb;
  &.grey {
    background-color: #404145;
  }
  &.blue {
    background: #3498db;
  }
}
</style>
