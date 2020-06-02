<template>
    <div>
      <!--共用组件头部-->
      <indexList></indexList>
      <!--列表-->
      <div class="index_content">
          <div class="text_left font_bold pp2 font18 ">Product listing</div>
          <div class="flex flexAlignCenter justifyContentBetween pw2">
              <div class="flex">
                  <div class="flex flexAlignCenter border_com font16">
                      <div>All labels</div>
                      <img src="../../assets/images/more.png" alt="" class="icon_more">
                  </div>
                  <div class="flex flexAlignCenter border_com m15_cen">
                      <input type="text" name="" id="" placeholder="Search">
                      <img src="../../assets/images/search.png" alt="" class="icon_sear">
                    </div>
                  <div class="flex flexAlignCenter font14">
                    <el-checkbox v-model="checked"></el-checkbox>
                    <div class="ml5">Only show ongoing listing</div>
                  </div>
              </div>
              <!---home  New product +
                  adv   Add +
                  adv分类  Promote >>等
              -->
              <!-- <div class="menu_btn font14">New product +</div> -->
              <div class="font14 flex flexAlignCenter">
                  <div class="font14 ad_item">
                    <el-checkbox v-model="checked">Banner AD</el-checkbox>
                  </div>
                  <div class="font14 ad_item">
                    <el-checkbox v-model="checked">Home AD</el-checkbox>
                  </div>
                  <div class="font14 ad_item">
                    <el-checkbox v-model="checked">Floating AD</el-checkbox>
                  </div>
                  <div class=" menu_btn promote_btn"> Promote >></div>
              </div>
          </div>
          <div class="pro_list mt5">
              <div class="flex pro_head justifyContentBetween font14 font_bold flexAlignCenter">
                  <div class="pro_head_name w5">Products</div>
                  <div class="flex justifyContentBetween w5 box_f6">
                    <div>Start Time</div>
                    <div>End Time</div>
                    <div>Price</div>
                    <div>On / Off shelf</div>
                    <div>Promote</div>
                    <div>Setting</div>
                  </div>
                  
              </div>
              <div class="list_content font14">
                  <div class="list_item flex flexAlignCenter justifyContentBetween" v-for="(item,key) in 4" :key="key">
                    <div class="w5 flex flexAlignCenter">
                      <el-checkbox v-model="checked"></el-checkbox>
                      <div class="item_pic">
                        <img src="" alt="" >
                      </div>
                      <div class="text_flow flex1">Steam Iron for Clothes, Dcenta 2 IN 1 Horizontal and Vertical Ironing Steamer for clothes, 1300W Powerful 25s Fast Heat-up Portable Handheld Garment...</div> 
                    </div>
                    <div class="flex justifyContentBetween w5 box_f6">
                      <div>2020/05/15</div>
                      <div>2020/06/14</div>
                      <div>
                        <div>$52</div>
                        <div class="color_9">USD</div>
                      </div>
                      <div>
                        <el-switch
                          v-model="value"
                          active-color="#13ce66"
                          inactive-color="#ff4949">
                        </el-switch>
                      </div>
                      <div>
                        <el-switch
                          v-model="value"
                          active-color="#13ce66"
                          inactive-color="#ff4949">
                        </el-switch>
                      </div>
                      <div class="set_menu">
                          <img src="../../assets/images/set.png" alt="">
                          <img src="../../assets/images/url.png" alt="">
                          <img src="../../assets/images/del.png" alt="">
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
  import indexList from '../../components/indexList.vue'
  export default{
    data(){
      return{
        checked:true,
        value: true
      }
    },
    components:{
      indexList,
    }
  }

</script>
<style>
  @import url("../../assets/css/index.scss");
/* .el-checkbox__inner{
  background: #2D8CF0;
} */
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background: #2D8CF0;
}
.text_flow{
  text-overflow: -o-ellipsis-lastline!important;
  overflow: hidden!important;
  text-align: left!important;
  text-overflow: ellipsis!important;
  display: -webkit-box!important;
  -webkit-line-clamp: 2!important;
  line-clamp: 2!important;
  -webkit-box-orient: vertical!important;
}
</style>