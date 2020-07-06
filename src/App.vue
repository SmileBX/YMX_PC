<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {getToken} from './utils/auth.js'
export default {
  name: 'App',
  created () {
   console.log(getToken(),"start66666________________________________")
  }
}
</script>

<style>
@import '/assets/css/common.css';
@import '/assets/css/media.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-icon-arrow-left:before {
    content: "Previous";
}
.el-icon-arrow-right:before {
    content: "Next";
}
.el-pager li.active{
  color:#FB7A6A;
  font-weight:bold;
  border-bottom:0.02rem solid #FB7A6A;
}
.el-pager li:hover{
  color:#544CFB;
}
.el-input__inner{
  margin-top:0!important;
}
</style>
