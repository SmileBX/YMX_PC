<template>
  <div>
      <div class="submit">
          <div class="text_left font_bold pp2 font18 ">Settlement Center</div>
          <div class="submit_order font16 ">
                <el-steps :active="3" align-center class="font_bold" >
                  <el-step title="Submit Order" ></el-step>
                  <el-step title="Payment order"></el-step>
                  <el-step title="Payment Completed"></el-step>
                </el-steps>
                <div class="mt8 flex flexColumn flexAlignCenter">
                    <div class="flex flexAlignCenter">
                        <img src="../../assets/images/success.png" alt="" class="success_icon">
                        <span class="font18 font_bold ml2">Successful payment</span>
                    </div>
                    <div class="color_9 success_toast">You have successfully activated vip3 annual fee.</div>
                    <div class="step1_btn font14 mt2">HOME</div>
                </div>
          </div>
      </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
        checked:true,
        radio: 3
    }
  },
  methods: {
      
    },
}
</script>
<style>
 @import url("../../assets/css/index.scss");
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