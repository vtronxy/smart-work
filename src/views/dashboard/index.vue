<!-- @format -->

<template>
  <div class="dashboard-home">
    <Header></Header>
    <div class="dashboard-content">

    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/header';
import Footer from '@/components/footer';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
</style>
