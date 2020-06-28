<template>
  <div>
      <div class="submit">
          <div class="text_left font_bold pp2 font18 ">Settlement Center</div>
          <div class="submit_order font16 ">
                <el-steps :active="2" align-center class="font_bold" >
                  <el-step title="Submit Order" ></el-step>
                  <el-step title="Payment order"></el-step>
                  <el-step title="Payment Completed"></el-step>
                </el-steps>
                <div class="flex justifyContentBetween pw4 mt8">
                  <div class="font14 color_9 flex flexAlignCenter">
                    <el-checkbox v-model="checked"></el-checkbox>
                    <div class="ml2">
                      Order has been submitted, please complete payment within 1 hour!
                    </div>
                  </div>
                  <div>
                    Total price: <span class="submit_color font_bold">${{vipdata.price}}</span>
                  </div>
                </div>
                <div class="flex pw4 mt2 sub_men_left font14 font_bold">
                    <span>Order Number: {{vipdata.order_no}}</span>
                    <span class="ml6">Service: {{vipdata.description}}</span>
                </div>
                <!---支付方式-->
                <div>
                    <div class="flex pw4 mt8 flexAlignCenter">
                        <div class="color_9 font14">Payment method:</div>
                        <div class="font16 font_bold ml6">
                            <span class="pay_active payment_item">Payment platform</span>
                            <span class="payment_item">Credit card</span>
                        </div>
                    </div>
                    <div class="pay_methods pw4 mt5">
                        <el-radio-group v-model="radio" class="flex">
                            <div class="flex flexAlignCenter card_pay">
                                <el-radio></el-radio>
                                <div class="pay_logo">
                                  <img src="../../assets/images/pay.png" alt="">
                                </div>
                            </div>
                            <div class="flex flexAlignCenter card_pay">
                              <el-radio ></el-radio>
                              <div class="pay_logo">
                                <img src="../../assets/images/pay.png" alt="">
                              </div>
                          </div>
                        </el-radio-group>
                    </div>
                </div>
                <div class="text_right mt8 pw4 flex justifyContentBetween flexAlignCenter">
                  <div class="font14 sub_men_left">
                    * If submitting an order means you know and accept <span class="text_underline color_lignblue">Member Terms of Service</span>
                  </div>
                  <div class="step1_btn font14" @click="submit">Submit Order</div>
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
        vipdata:{},
        order_id:'',
        query:{
          id:'',
          user_token:getToken()
        },
        checked:true,
        radio: 3
    }
  },
  created () {
    this.query.id = this.$route.query.id
    this.getOrderList()
  },
  methods: {
    async getOrderList(){
      try{  
        const res = await post('user/up_vip',this.query)
        if(res.code == 0){
          this.vipdata = res.data
          this.order_id = res.data.id
        }
      }catch(err){}
    },
    //提交订单
    submit(){
      if(!this.checked){
        this.$message('请选择订单!')
        return;
      }
      let query = {
        id:this.order_id,
        user_token:getToken()
      }
      post('paypal/user_pay',query).then(res=>{
        if(res.code == 0){
            window.open(res.data,"_blank"); 
        }
      }).catch((err)=>{})
    }
  },
}
</script>
<style>
 @import url("../../assets/css/index.css");
 .submit{
    margin:0.3rem 0.2rem;
    background: #ffffff;
    padding-bottom:0.8rem;
    box-sizing: border-box;
  }
  .el-step.is-horizontal .el-step__line{
    top:60%;
  }
  .el-step__title{
    font-size:0.14rem;
  }
  .el-step__head.is-finish,.el-step__title.is-finish{
    color:#3F51B5
  }
  .el-step__head.is-finish .el-step__icon.is-text{
    border:none;
    background:#3F51B5 ;
    color:#ffffff;
  }
  .el-step__head.is-process,.el-step__title.is-process{
    color: #C0C4CC;
    border-color: #C0C4CC;
  }
  .el-step__head.is-finish{
    border-color: #3F51B5;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #3F51B5;
    border-color: #3F51B5;
  }
  .el-radio{
    margin-right:0;
  }
</style>