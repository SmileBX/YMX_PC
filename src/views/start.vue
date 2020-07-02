<template>
    <div>
        <!---顶部-->
        <div class="index_head flex boxSize">
          <div class="nav_left flex flexAlignCenter justifyContentCenter">
            <img src="../assets/images/logo2.png" alt="" class="bg_logo">
            <div class="flex flexAlignEnd">
                <span class="font_bold nav_name font16">VIPON</span>
                <span class="font14 ml5">Seller center</span>
            </div>
          </div>
          <div class="nav_right flex flexAlignCenter justifyContentEnd boxSize">
              <div class="font14 logn cli_pointer" @click="toLog(1)">Log in</div>
              <div class="font14 logn cli_pointer" @click="toLog(2)"> Sign Up</div>
          </div>
        </div>
        <!--介绍-->
        <div class="start_intro flex jusifyContentAround">
            <div>
                <h3 class="text_left">Vipon</h3>
                <div class="font18 mt5">拥有全球百万级活跃真实买家用户和海量的全球社交媒体红人，数万资深亚马逊卖家的共同选择。</div>
                <div class="font18">超高性价比的亚马逊多站点站外折扣促销平台，一站式解决亚马逊卖家站外营销难题。</div>
                <div class="font14 flex btn_start justifyContentAround">
                    <div class="log_in cli_pointer" @click="toLog(2)">注册</div>
                    <div class="log_in cli_pointer" @click="toLog(1)">登录</div>
                </div>
            </div>
            <div class="start_pic">
                <img src="../assets/images/start.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    export default{
      methods: {
        toLog(tt){
          let path;
          tt==1?path='/login':path='/register';
          this.$router.push(path)
        }
      }
    }
</script>
<style>
 @import url("../assets/css/index.css");
  @import url("../assets/css/media.css");
.logn{
  margin-right: 0.8rem;;
}
.start_intro{
  background: #4feafc;
  color:#ffffff;
  height:calc(100vh - 0.92rem);
  padding:2rem 1.5rem;
  text-align: left;
}
.start_pic{
  width:9.02rem;height:4.87rem;
  margin-top:0.5rem;
}
.start_pic img{
  width:100%;height:100%;
}
.font18{
  font-size:0.25rem;line-height: 1.5;
}
.btn_start{
  font-size:0.3rem;
  margin-top:1rem;
}
.log_in{
  width:2rem;height:0.5rem;line-height:0.5rem;
  text-align: center;
  border:2px solid #ffffff;border-radius:0.1rem;
}
</style>