<template>
    <div class="login">
        <!--背景图-->
        <img src="../assets/images/blue1.png" alt="" class="bg_url bg_login1">
        <img src="../assets/images/blue2.png" alt="" class="bg_url bg_login2">
        <div class="login_main flex">
          <div class="login_left">
              <div class="title flex flexAlignCenter">
                <img src="../assets/images/logo.png" alt="" class="bg_logo">
                <span class="font_bold login_name">VIPON</span>
                <span>Seller center</span>
              </div>
              <div class="login_form flex flexColumn flexAlignCenter">
                 <div class="tip">Sign in</div>
                 <div class="form_item flex flexAlignCenter mt5">
                   <img src="../assets/images/account.png" alt="">
                   <input type="text" placeholder="Account" class="flex1">
                 </div>
                 <div class="form_item flex flexAlignCenter mt3">
                  <img src="../assets/images/pwd.png" alt="">
                  <input type="text" placeholder="Password" class="flex1">
                </div>
                <div class="flex mt3 flexAlignCenter justifyContentBetween login_btn">
                  <div class="sign_btn">Sign in</div>
                  <div class="text_center btn_rister">Rigistered</div>
                </div>
                <div class="mt5 mention">Don't remember the password?<span>Recover it</span></div>
              </div>
          </div>
          <div class="login_right">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                  <div class="swiper-slide">Slide 1</div>
                  <div class="swiper-slide">Slide 2</div>
                  <div class="swiper-slide">Slide 3</div>
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

      }
    },
    mounted(){
      new Swiper ('.swiper-container', {
        autoplay:true,
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
      })       
    },
    methods: {
      
    }
  }

</script>
<style lang="scss">
@import url("../assets/css/login.scss");
.swiper-container{
  border:1px solid black;
    width: 396px;
    height:596px;
    margin: 20px auto;
    --swiper-theme-color: #ff6600;
    --swiper-pagination-color: #00ff33;/* 两种都可以 */
  }
  .swiper-slide{
    width:396px;
    height:596px;
    border:1px solid #ff0000;
  }
  .swiper-pagination{
    border:1px solid black;
  }
</style>