<template>
    <div class="index">
      <!--顶部菜单-->
      <div class="index_head flex boxSize">
        <div class="nav_left flex flexAlignCenter justifyContentCenter">
          <img src="../assets/images/logo2.png" alt="" class="bg_logo">
          <div class="flex flexAlignEnd">
              <span class="font_bold nav_name font16">VIPON</span>
              <span class="font14 ml5">Seller center</span>
          </div>
        </div>
        <div class="nav_right flex flexAlignCenter justifyContentEnd boxSize">
            <img src="../assets/images/ava.png" alt="" class="index_ava">
            <div style="padding-right:0.2rem;" class="flex flexAlignCenter">
              <span class="index_ver font16">{{userInfo.username}}</span>
              <img src="../assets/images/out.png" alt="" class="index_tb cli_pointer" @click="loginOut">
            </div>
        </div>
      </div>
      <div class="index_main flex">
        <!--左侧导航栏-->
        <div class="index_left w2">
          <el-row class="tac boxSize">
            <h5 class="elem_title">Welcome to the seller center!</h5>
            <el-col :span="12">
              <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo font_bold font16"
                @select="choseIndex"
                >
                <el-menu-item index="1">
                  <i class="el-icon-s-platform"></i>
                  <span slot="title">Home</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">VIP</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-s-promotion"></i>
                  <span slot="title">Advertising</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-document"></i>
                  <span slot="title">My order</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="el-icon-s-opportunity"></i>
                  <el-badge :value="newsCount" :max="99" class="item" v-if="newsCount>0">
                  </el-badge>
                  <span slot="title">Notification</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
          <div class="concat">
            <div class="concat_title font16 font_bold">Contact us</div>
            <div class="index_concat">0755-84868888</div>
            <div class="index_concat">service@vipon.com</div>
            <div class="flex flexAlignCenter mt2">
              <img src="../assets/images/1.png" alt="" class="icon_img">
              <!-- <img src="../assets/images/1.png" alt="" class="icon_img"> -->
              <img src="../assets/images/3.png" alt="" class="icon_img">
            </div>
          </div>
          <div class="color_9 copy_right">Copyrignt© 2020 Timely Watches Co,Ltd. All Rights Reserved.</div>
        </div>
        <!--右侧单页面-->
        <div class="index_right boxSize">
          <router-view/>
        </div>
      </div>
      
    </div>
</template>
<script>
  import {get,post} from '@/api/axios.js'
  import {getToken} from '@/utils/auth'
  export default {
    data(){
      return{
        activeIndex:"1",
        query:{
          user_token:getToken()
        },
        userInfo:{},
        newsCount:0,
      }
    },
    created(){
      
      if(this.$route.query.type){
        this.activeIndex = this.$route.query.type
      }else{
        this.activeIndex="1"
      }
      this.getUserInfo()
      this.getNewsList()
    },
    methods: {
      //获取消息
      getNewsList(){
        post('user/user_notice',this.query).then(res=>{
            this.$store.commit('changeNewsCount',res.data.total)
            this.newsCount = this.$store.state.newsCount
            console.log(this.newsCount,"this.newsCount")
          if(res.code == 0){
            this.$store.commit('changeNewsCount',res.data.total)
            this.newsCount = this.$store.state.newsCount
            
          }
        })
      },
      //获取用户信息
      getUserInfo(){
        post('/user/getuserinfo?lang=en-us',this.query).then(res=>{
          if(res.code == 0){
            this.userInfo = res.data
          }
        })
      },
      //退出登录
      loginOut(){
        this.$store.dispatch('loginOut').then(
          this.$router.push('/login')
        )
      },
      choseIndex(key, keyPath){
        this.activeIndex = key
        let urlPath = ''
        // console.log(this.activeIndex,"activeIndex")
        if(key==1 || key==3){
          urlPath = "/index/home"
        }else if(key==2){
          urlPath = "/index/vip"
        }else if(key==4){
          urlPath = "/index/order"
        }else{
          urlPath = "/index/notice"
        }
        this.$router.push({
            path:urlPath,
            query:{
              type:this.activeIndex,
        }})
      },
      
    },

  }

</script>
<style>
  @import url("../assets/css/index.scss");
  @import url("../assets/css/media.css");
  .el-col{
    width:100%;
  }
  .el-submenu__title{

  }
  .el-menu-item{
    text-align: left;
    font-size:0.14rem;
    padding: 0 0.2rem;
  }
  .el-menu-vertical-demo.el-menu{
    border-right:0;
    width:100%;
  }
  .el-menu-item.is-active,.el-menu-item.is-active{
    color:#303F9F
  }
  .el-badge{
    width:80%;
  }
  .el-badge__content.is-fixed{
    top:50%;
    right:0;
    transform: translateY(-50%);
  }
  .el-button{
    border: none;
    padding:0;
    color: #303133;
  }
</style>