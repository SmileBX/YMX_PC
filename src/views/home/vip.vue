<template>
  <div>
    <!--共用组件头部-->
    <indexList :type="type"></indexList>
    <!--列表-->
    <div class="index_content">
      <div class="text_left font_bold pp2 font18 ">VIP level</div>
      <div class="vip_head flex flexAlignCenter font16 m2">
          <div class="vip_left">Privilege</div>
          <div class="vip_right flex flexAlignCenter justifyContentBetween">
            <div>VIP3</div>
            <div>VIP2</div>
            <div>VIP1</div>
            <div>FREE</div>
          </div>
      </div>
      <div class=" font16 vip_list">
        <div class="vip_item flex flexAlignCenter" v-for="(item,value) in 6" :key="value">
          <div class="vip_left">Monthly fee</div>
          <div class="vip_right flex flexAlignCenter justifyContentBetween">
            <div><span class="color_red">9</span> USD/Month</div>
            <div><span class="color_red">8</span> USD/Month</div>
            <div><span class="color_red">3</span> USD/Month</div>
            <div class="color_red">FREE</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import indexList from '../../components/indexList.vue'
export default{
  data(){
    return{
      type:0,//1-home 2-vip 3-adver
    }
  },
  components:{
    indexList,
  },
  watch: {
			$route() {
        this.type = this.$route.query.type;
        console.log(this.type,",,,,,,,,,,,,,")
			}
	},
  created () {
    this.type = this.$route.query.type;
  },

}

</script>
<style>
  @import url("../../assets/css/index.scss");
.vip_head{
  font-family:Arial;
  font-weight:bold;
  color:#ffffff;
  background:rgba(87,109,219,1);
  margin-top:0.3rem;
  padding:0.1rem 0;
}
</style>