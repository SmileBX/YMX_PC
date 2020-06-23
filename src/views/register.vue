<template>
  <div class="login">
      <!--背景图-->
      <img src="../assets/images/blue1.png" alt="" class="bg_url bg_login1">
      <img src="../assets/images/blue2.png" alt="" class="bg_url bg_login2">
      <div class="login_main flex">
        <div class="login_left">
            <div class="title flex flexAlignCenter">
              <img src="../assets/images/logo.png" alt="" class="bg_logo">
              <div class="flex flexAlignEnd">
                  <span class="font_bold login_name">VIPON</span>
                  <span class="font14">Seller center</span>
              </div>
            </div>
            <div class="login_form flex flexColumn flexAlignCenter">
               <div class="tip">Registered</div>
               <div class="form_item flex flexAlignCenter mt5">
                 <img src="../assets/images/account.png" alt="">
                 <input type="text" placeholder="Email" v-model="query.email" class="flex1">
               </div>
               <div class="form_item flex flexAlignCenter mt3">
                <img src="../assets/images/pwd.png" alt="">
                <input type="text" placeholder="Password" class="flex1" v-model="query.password">
              </div>
              <div class="form_item flex flexAlignCenter mt3">
                <img src="../assets/images/pwd.png" alt="">
                <input type="text" placeholder="Repeat Password" class="flex1" v-model="query.confirm_password">
              </div>
              <div class="flex mt3 flexAlignCenter justifyContentBetween login_btn">
                <div class="text_center btn_rister cli_pointer" @click="toLogin">Sign in</div>
                <div class="sign_btn cli_pointer" @click="register">Rigistered</div>
              </div>
              <div class="mt5 mention font14 flex flexAlignCenter">
                <el-checkbox v-model="checked" @change="change"></el-checkbox>
                <div class="ml2">
                  I have read and accept the<span>User Agreement</span>
                </div>
               </div>
            </div>
        </div>
        <div class="login_right swiper_box">
          <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide swiper_side flex flexColumn flexAlignCenter" v-for="(item,index) in 5" :key="index">
                    <img src="../assets/images/tx.png" alt="" class="login_ava">
                    <div class="font_bold swiper_side_name">Hot investment</div>
                    <div class="swiper_subtitle">Amazon sellers share deals and coupons for a huge selection of products, most 50% off or more.</div>
                    <div class="join_btn font14">Join now</div> 
                </div>
            </div>
            <div class="swiper-pagination"></div><!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
          </div>
        </div>
      </div>
      
  </div>
</template>
<script>
import Swiper from 'swiper';
import {
  get,post
} from '@/api/axios.js'
export default{
  data(){
    return{
      checked:true,
      query:{
        email:'',
        password:'',
        confirm_password:''
      }
    }
  },
  mounted(){
    new Swiper ('.swiper-container', {
      autoplay:true,
      loop: true,
      // 如果需要分页器
      pagination: {
        el:'.swiper-pagination',
      },
    })       
  },
  methods: {
    change(e){
        this.checked = e
    },
    toLogin(){
      this.$router.push('/login')
    },
    //注册
    register(){
      if(this.val() && this.checked){
        post('/shop/register?lang=en-us',this.query).then(res=>{
          if(res.code == 0){
            this.$message({
                message: '注册成功!',
                type: 'success',
                center:true,
                duration:1000
            });
            //跳转到登录页
            setTimeout(()=>{
                this.$router.push({path:'/login',
                // query:{
                //       accountNumber:this.accountNumber
                //   }
              })
            },1000)
          }
        })
      }
    },
    val(){
      if(this.query.email == ''){
        this.$message('邮箱不能为空!');
        return;
      }
      if(!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(this.query.email)){
        this.$message('邮箱格式不正确!');
        return;
      }
      if(this.query.password == ''){
        this.$message('请设置登录密码!');
        return;
      }
      if(this.query.confirm_password == ''){
        this.$message('请再次输入登录密码!');
        return;
      }
      return true;
    }
  }
}

</script>
<style lang="scss">
@import url("../assets/css/login.scss");
.swiper-container{
  width: 3.96rem;
  height:6.20rem;
  margin: 0.2rem auto;
  --swiper-theme-color: #ff6600;
  --swiper-pagination-color: #ffffff;/* 两种都可以 */
}
.swiper-slide{
  width:3.96rem;
  height:5.56rem;
  background: #ffffff;
}

.swiper-pagination{
  width:100%;height:0.3rem;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #3F51B5;
    border-color: #3F51B5;
  }
</style>