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
                 <div class="tip">Sign in</div>
                 <div class="form_item flex flexAlignCenter mt5">
                   <img src="../assets/images/account.png" alt="">
                   <input type="text" placeholder="Account" class="flex1" v-model="query.email">
                 </div>
                 <div class="form_item flex flexAlignCenter mt3">
                  <img src="../assets/images/pwd.png" alt="">
                  <input type="text" placeholder="Password" class="flex1" v-model="query.password">
                </div>
                <div class="flex mt3 flexAlignCenter justifyContentBetween login_btn">
                  <div class="sign_btn cli_pointer"@click="login">Sign in</div>
                  <div class="text_center btn_rister cli_pointer" @click="toRegister">Rigistered</div>
                </div>
                <div class="mt5 mention font14">Don't remember the password?<span>Recover it</span></div>
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
  export default{
    data(){
      return{
        query:{
          email:'2249494851@qq.com',
          password:'123456'
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
      toRegister(){
        this.$router.push('/register')
      },
      login(){
        console.log(this.$store,"8889999999")
        if(this.val()){
          this.$store.dispatch('loginName',this.query).then(res=>{
            console.log(res,"res")
            if(res.code == 0){
              this.$message({
                  message: '登录成功!',
                  type: 'success',
                  center:true,
                  duration:1000
              })
              setTimeout(()=>{
                this.$router.push('/index/home?type=1')
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
        return true;
      }
    }
  }

</script>
<style lang="">
@import url("../assets/css/login.css");
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
</style>