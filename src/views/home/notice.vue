<template>
  <div>
      <div v-if="hasData" class="notice">
          <div class="text_left font_bold pp2 font18 ">Notifications</div>
          <div class="notice_list pw2">
              <div class="notice_item p2 flex flexAlignCenter font16" v-for="(item,index) in 5" :key="index">
                  <div class="img_icon">
                      <!-- <img src="../../assets/images/pro.png" alt="" class="img1"> -->
                      <img src="../../assets/images/msg.png" alt="" class="img2">
                      <!-- <img src="../../assets/images/share.png" alt="" class="img3"> -->
                  </div>
                  <div class="content_notice">
                      <div class="flex flexAlignCenter">
                          <div>Removal reminder</div>
                          <span class="font14 color_9 ml2">2020.05.12 12:47</span>
                      </div>   
                      <div class="mt2">[
                          <span class="color_blue text_underline">Power Bank 10000mAh Portable Charger with Dual Out...</span>
                          ]will be removed in three days, please go to renew.</div>
                  </div>
              </div>
          </div>
          <div class="block mt5">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="5"
              layout="prev, pager, next, jumper"
              :total="12">
            </el-pagination>
          </div>
      </div>
      <div v-else class="font16 nodata font_bold">You have not received any notifications yet.</div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      currentPage3: 1,
      hasData:true
    }
  },
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
}
</script>
<style>
 @import url("../../assets/css/index.scss");
 .notice{
    margin:0.3rem 0.2rem;
    background: #ffffff;
    padding-bottom:0.8rem;
    box-sizing: border-box;
  }
  .nodata{
    height:calc(100vh - 0.89rem - 0.6rem);
    box-sizing: border-box;
    padding-top:4rem;
  }
</style>