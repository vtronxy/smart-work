/** @format */
/**
 * @description: 全局响应 选择行政单位
 */
const SelectRegion = {
  created() {
    this.$bus.$off('region-change').$on('region-change', data => {
      this.regionChangeHandler(data);
    });
  },
  methods: {
    regionChangeHandler() {
      window.alert('请添加 行政区域的响应函数 regionChangeHandler');
    }
  }
};
export default SelectRegion;
