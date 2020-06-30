<template>
  <div>
      <div class="submit">
          <div class="text_left font_bold pp2 font18 ">Settlement Center</div>
          <div class="submit_order font16 ">
                <el-steps :active="1" align-center class="font_bold" >
                  <el-step title="Submit Order" ></el-step>
                  <el-step title="Payment order"></el-step>
                  <el-step title="Payment Completed"></el-step>
                </el-steps>
                <div class="mt5 submit_list pw4">
                    <div class="submit_pay font_bold">
                        <div>Service</div>
                        <div>Title</div>
                        <div>Price</div>
                        <div>Total price</div> 
                    </div>
                    <div class="sub_list mt2 ">
                        <div class="sub_item" v-for="(item,index) in vipdata">
                            <div class="submit_pay color_9 font14">
                                  <div class="flex flexAlignCenter justifyContentCenter">
                                    <img src="../../assets/images/Y.png" alt="" class="vip_icon1" v-if="index==0">
                                    <img src="../../assets/images/q.png" alt="" class="vip_icon1" v-if="index==1">
                                    <img src="../../assets/images/m.png" alt="" class="vip_icon2" v-if="index==2">
                                    <!-- <img src="../../assets/images/banner.png" alt="" class="vip_icon3" v-if="index==2">
                                    <img src="../../assets/images/banner1.png" alt="" class="vip_icon4" v-if="index==3">
                                    <img src="../../assets/images/tui.png" alt="" class="vip_icon5" v-if="index==4">
                                    <img src="../../assets/images/web.png" alt="" class="vip_icon6" v-if="index==5"> -->
                                    <span class="ml2">{{info.description}}</span>
                                </div>
                                <div >{{item.title}}</div>
                                <div >{{item.fee}} USD/{{index==0?'Monthly':(index==1?'Quarter':'Year')}}</div>
                                <div>{{item.fee}} USD</div> 
                            </div>
                            <el-checkbox v-model="item.isCheck" @change="change(index)"></el-checkbox>
                        </div>
                    </div>
                </div>
                <div class="flex justifyContentBetween pw4 mt8">
                  <div class="font14 sub_men_left">
                    * If submitting an order means you know and accept <span class="text_underline submit_color">Member Terms of Service</span>
                  </div>
                  <div>
                    Total price: <span class="submit_color font_bold">${{total}}</span>
                  </div>
                </div>
                <div class="text_right mt2 pw4">
                  <div class="step1_btn font14 cli_pointer" @click="submit">Submit Order</div>
                </div>
          </div>
      </div>
  </div>
</template>
<script>
import {get,post} from '@/api/axios.js'
import {getToken} from '@/utils/auth.js'
import { getStore, setStore, removeStore } from "@/utils/store";
export default{
  data(){
    return{
        vipdata:[],
        info:{},
        total:0,
    }
  },
  created () {
    // this.query.id = this.$route.query.id
    // this.getOrderList()
    // this.vipdata = getStore('vip_level')
    this.getData()
  },
  methods: {
    // async getOrderList(){
    //   try{
    //     const res = await post('user/up_vip',this.query)
    //     if(res.code == 0){
    //       this.vipdata = res.data
    //       this.order_id = res.data.id
    //     }
    //   }catch(err){}
    // },
    getData(){
      let level = getStore('vip_level')
      this.info = level
      // console.log(level,"lllllllll")
      let data = [
        {title:level.title,fee:level.month_fee,isCheck:false},
        {title:level.title,fee:level.quarter_fee,isCheck:false},{title:level.title,fee:level.fee,isCheck:false}
      ]
      this.vipdata = data
    },
    change(key){
        for(let i =0;i<this.vipdata.length;i++){
          if(key == i){
            this.$set(this.vipdata[i],'isCheck',true)
            this.total = this.vipdata[i].fee
          }else{
            this.$set(this.vipdata[i],'isCheck',false)
          }
          
        }
        
    },
    //提交订单
    submit(){
      let num = 0;
      let type = 0//1:一月 2:一季 3:一年
      for(let i =0;i<this.vipdata.length;i++){
        if(this.vipdata[i].isCheck){
          num++;
          type = i+1
        }
      }
      if(num==0){
        this.$message('请选择订单!')
        return;
      }
      this.$router.push({
        path:'/index/pay',
        query:{
          id:this.info.id,
          type:type
        }
      })
      
      // let query = {
      //   id:this.order_id,
      //   user_token:getToken()
      // }
      // post('paypal/user_pay',query).then(res=>{
      //   if(res.code == 0){
      //       window.open(res.data,"_blank"); 
      //   }
      // })
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

</style>