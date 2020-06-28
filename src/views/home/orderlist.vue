<template>
  <div>
      <div v-if="hasData" class="orderlist">
          <div class="text_left font_bold pp2 font18 ">Order list</div>
          <div class="order_head flex mt5 font_bold font16">
              <div class="order_group flex justifyContentBetween">
                  <div>Service</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total price</div>
              </div>
              <div class="order_date">Date</div>
          </div>
          <div class="order_list pw2 mt2">
              <div class="order_item flex flexAlignCenter font14" v-for="(item,index) in orderList" :key="index">
                <div class="order_group flex justifyContentBetween">
                    <div class="flex flexAlignCenter">
                        <img src="../../assets/images/Y.png" alt="" class="vip_icon1" >
                        <!-- <img src="../../assets/images/m.png" alt="" class="vip_icon2" v-if="index==1">
                        <img src="../../assets/images/banner.png" alt="" class="vip_icon3" v-if="index==2">
                        <img src="../../assets/images/banner1.png" alt="" class="vip_icon4" v-if="index==3">
                        <img src="../../assets/images/tui.png" alt="" class="vip_icon5" v-if="index==4">
                        <img src="../../assets/images/web.png" alt="" class="vip_icon6" v-if="index==5"> -->
                        <span class="ml2">{{item.description}}</span>
                    </div>
                    <div class="flex_ali">{{item.price}} USD/YEAR</div>
                    <div class="flex_ali">1</div>
                    <div class="flex_ali">{{item.price}} USD</div>
                </div>
                <div class="order_date">
                    <span>{{item.create_time}}</span>
                    <span class="color_blue text_underline ml2 cli_pointer" @click="toDetail(item)">more</span>
                </div>
              </div>
          </div>
          <div class="block mt5">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="query.page"
              :page-size="query.list_rows"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
      </div>
      <div v-else class="font16 nodata font_bold">You have not order yet.</div>
  </div>
</template>
<script>
  import {get,post} from '@/api/axios.js'
  import {getToken} from '@/utils/auth.js'
export default{
  data(){
    return{
      hasData:true,
      orderList:[],
      total:0,
      query:{
        user_token:getToken(),
        list_rows:5,
        page:1
      }
    }
  },
  created () {
    this.innerGetContent()
  },
  watch: {
			$route() {
        this.type = this.$route.query.type;
        // this.getList()
        this.innerGetContent()
        // console.log(this.type,",,,,,,,,,,,,,")
			}
		},
  methods: {
      async getOrderList (){
        try{
          const res = await post('shop/order_list',this.query)
          if(res.code == 0){
            this.total = res.data.total
            this.orderList = res.data.data
          }
        }catch(err){}
      }, 
      innerGetContent() {
				let pramas = this.$route.query;
				if (pramas.list_rows) {
					this.query.list_rows = parseInt(pramas.list_rows)
				}
				if (pramas.page) {
					this.query.page = parseInt(pramas.page)
				} else {
					this.query.page = 1
				}
				this.getOrderList()
			},
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$router.push({
					path: "/index/order",
					query:{
            page:val,//访问页码
            list_rows:this.query.list_rows
          }
				});
      },
      //订单详情
      toDetail(item){
        this.$router.push({
          path:'/index/detail',
          query:{
            id:item.id
          }
        })
      }
    },
    
    
}
</script>
<style>
 @import url("../../assets/css/index.css");
 .orderlist{
    margin:0.3rem 0.2rem;
    background: #ffffff;
    padding-bottom:0.8rem;
    box-sizing: border-box;
  }
  
</style>