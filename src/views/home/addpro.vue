<template>
    <div class="addpro">
        <div class="form_list flex justifyContentBetween pw2">
            <div class="form_item flex flexColumn p2">
                <div class="flex flexColumn mt3">
                    <div class="font16 font_bold text_left">Product name*</div>
                    <input type="text" class="inpur_box">
                </div>
                <div class="flex flexColumn mt3">
                    <div class="font16 font_bold text_left">Amazon url*</div>
                    <input type="text" class="inpur_box ">
                </div>
                <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Amazon star*</div>
                  <input type="text" class="inpur_box ">
                </div>
                <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Review*</div>
                  <input type="text" class="inpur_box ">
                </div>
            </div>
            <div class="form_item flex flexColumn p2">
              <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Amazon current price*</div>
                  <input type="text" class="inpur_box">
              </div>
              <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Discount*</div>
                  <input type="text" class="inpur_box ">
              </div>
              <div class="flex flexColumn mt3">
                <div class="font16 font_bold text_left">Start date*</div>
                <input type="text" class="inpur_box ">
              </div>
              <div class="flex flexColumn mt3">
                <div class="font16 font_bold text_left">End date*</div>
                <input type="text" class="inpur_box ">
              </div>
            </div>
            <div class="form_item flex flexColumn p2">
              <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Discount code*</div>
                  <input type="text" class="inpur_box">
              </div>
              <div class="font14 color_9 mt3">
                *If using long code, fill in a discount code here, and upload other discount code attachments
              </div>
              <div class="flex flexColumn mt5">
                <div class="font16 font_bold text_left">Product Image*</div>
                <div class="mt2">
                    <div class="img_pic border_pic">
                      <img src="../../assets/images/add.png" alt="" class="add_pic">
                    </div>
                    <!---其他图片-->
                </div>
            </div>
            </div>
        </div>
        <div class="flex flexAlignCenter flexColumn mt5">
            <div class="flex flexAlignCenter">
              <el-checkbox v-model="checked"></el-checkbox>
              <div class="font14 ml5 color_9 text_ttp">I know that the <span class="color_red font18 text_underline">Featured Deals US</span> section needs to be charged, and I understand the charging standards and precautions *</div>
            </div>
            <div class="font16 conadd_btn mt3">Confirm add</div>
        </div>
    </div>
</template>
<script>
  export default{
    data(){
      return{
        checked:true,
      }
    }
  }
</script>
<style>
   @import url("../../assets/css/index.scss");
   .addpro{
    margin:0.3rem 0.2rem;
    background: #ffffff;
    padding-bottom:0.8rem;
  }
</style>