<template>
  <div>
      <div class="orderdetail">
          <div class="text_left font_bold pp2 font18 ">Order list > Order information</div>
          <div class="order_info flex mt8 font_bold font16">
              <div class="w7 flex justifyContentBetween order_info_item">
                <div class="text_left">
                  <div>Order number: <span class="font14 color_9">{{orderInfo.order_no}}</span></div>
                  <div class="mt5">Price: <span class="font14 color_9">{{orderInfo.price}} USD/YEAR</span></div>
                </div>
                <div class="text_left">
                  <div>Service: <span class="font14 color_9">{{orderInfo.description}}</span></div>
                  <div class="mt5">Quantity: <span class="font14 color_9">{{orderInfo.quantity}}</span></div>
                </div>
                <div class="text_left">
                  <div>Product: <span class="font14 color_9">{{orderInfo.product}}</span></div>
                  <div class="mt5">
                    Payment method: <span class="font14 color_9">{{orderInfo.pay_type==1?'paypel':'qita'}}</span></div>
                </div>
              </div>
              <div class="w3 flex justifyContentBetween">
                  <div>Date: <span class="font14 color_9">{{orderInfo.create_time}}</span></div>
                  <div>Status: <span class="font14 color_9">{{orderInfo.pay_status==0?'未付款':(orderInfo.pay_status==1?'已付款':'已取消')}}</span></div>
              </div>
          </div>
          <div class="flex_alic">
              <div class="detail_bott flex flexColumn flexAlignCenter">
                <div class="font16 font_bold">Total price: <span class="color_purple">{{orderInfo.price}}USD</span></div>
                <div class="font16 service_btn">Service</div>
                <div class="text_underline color_purple font14">request a refund</div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  import {get,post} from '@/api/axios.js'
  import {getToken} from '@/utils/auth.js'
export default{
  data(){
    return{
      currentPage3: 1,
      hasData:true,
      orderInfo:{},
      query:{
        user_token:getToken(),
        id:'',
      }
    }
  },
  created () {
    this.query.id = this.$route.query.id
    this.getDetail()
  },
  methods: {
    getDetail(){
      post('shop/order_detail',this.query).then(res=>{
        if(res.code == 0){
          this.orderInfo = res.data
        }
      })
    }
  },
}
</script>
<style>
 @import url("../../assets/css/index.scss");
 .orderdetail{
    margin:0.3rem 0.2rem;
    background: #ffffff;
    padding-bottom:1.5rem;
    box-sizing: border-box;
  }

</style>