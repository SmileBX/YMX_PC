<template>
  <div>
    <!--共用组件头部-->
    <indexList :type="type"></indexList>
    <!--列表-->
    <div class="index_content">
      <div class="text_left font_bold pp2 font18 ">VIP level</div>
      <div class="vip_head flex flexAlignCenter font16 m2">
          <div class="vip_left">title</div>
          <div class="vip_right flex flexAlignCenter justifyContentBetween">
            <div>Optional discount</div>
            <div>times</div>
            <div>fee</div>
            <div>is_get</div>
          </div>
      </div>
      <div class=" font16 vip_list">
        <div class="vip_item flex flexAlignCenter" v-for="(item,value) in vipList" :key="value">
          <div class="vip_left">{{item.title}}</div>
          <div class="vip_right flex flexAlignCenter justifyContentBetween">
            <div><span class="color_red">{{item.discount}}</span> off</div>
            <div><span class="color_red">{{item.times}}</span> </div>
            <div><span class="color_red">{{item.fee}}</span> USD/Month</div>
            <div class="color_red cli_pointer" @click="makeOrder(item)">{{item.is_get==0?'Get':'Use'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import indexList from '../../components/indexList.vue'
import {get,post} from '@/api/axios.js'
import {getToken} from '@/utils/auth.js'
export default{
  data(){
    return{
      type:0,//1-home 2-vip 3-adver
      query:{
        user_token:getToken()
      },
      vipList:[]
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
    this.getVipList()
  },
  methods: {
    getVipList(){
      post('/shop/vip?lang=en-us',this.query).then(res=>{
        if(res.code == 0){
          this.vipList = res.data.list
        }
      })
    },
    //创建订单
    makeOrder(item){
      if(item.is_get==0){
        this.$router.push({
          path:'/index/submit',
          query:{
            id:item.id
          }
        })
      }
    }
  }

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