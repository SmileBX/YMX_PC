<template>
  <div>
      <div v-if="hasData" class="notice">
          <div class="text_left font_bold pp2 font18 ">Notifications</div>
          <div class="notice_list pw2">
              <div class="notice_item p2 flex flexAlignCenter font16" v-for="(item,index) in newslist" :key="index">
                  <div class="img_icon">
                      <!-- <img src="../../assets/images/pro.png" alt="" class="img1"> -->
                      <img src="../../assets/images/msg.png" alt="" class="img2">
                      <!-- <img src="../../assets/images/share.png" alt="" class="img3"> -->
                  </div>
                  <div class="content_notice">
                      <div class="flex flexAlignCenter">
                          <div>Removal reminder</div>
                          <span class="font14 color_9 ml2">{{item.create_time}}</span>
                      </div>   
                      <div class="mt2">{{item.content}}
                        <!-- [
                          <span class="color_blue text_underline">Power Bank 10000mAh Portable Charger with Dual Out...</span>
                          ]will be removed in three days, please go to renew. -->
                      </div>
                  </div>
              </div>
          </div>
          <div class="block mt5">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="query.page"
              :page-size="query.list_rows"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
      </div>
      <div v-else class="font16 nodata font_bold">You have not received any notifications yet.</div>
  </div>
</template>
<script>
import {get,post} from '@/api/axios.js'
import {getToken} from '@/utils/auth.js'
export default{
  data(){
    return{
      hasData:true,
      total:0,
      newslist:[],
      query:{
        user_token:getToken(),
        list_rows:5,
        page:1
      }
    }
  },
  created () {
    this.innerGetContent()
  },
  watch: {
			$route() {
        this.type = this.$route.query.type;
        // this.getList()
        this.innerGetContent()
        // console.log(this.type,",,,,,,,,,,,,,")
			}
	},
  methods: {
    innerGetContent() {
				let pramas = this.$route.query;
				if (pramas.list_rows) {
					this.query.list_rows = parseInt(pramas.list_rows)
				}
				if (pramas.page) {
					this.query.page = parseInt(pramas.page)
				} else {
					this.query.page = 1
				}
				this.getNewsList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$router.push({
					path: "/index/notice",
					query:{
            page:val,//访问页码
            list_rows:this.query.list_rows
          }
				});
      },
      getNewsList(){
        post('user/user_notice',this.query).then(res=>{
          if(res.code == 0){
            this.total = res.data.total
            if(res.data.total>0){
              this.hasData = true
            }else{
              this.hasData = false
            }
            this.newslist = res.data.data
          }
        }).catch((err)=>{})
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
}
</script>
<style>
 @import url("../../assets/css/index.css");
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