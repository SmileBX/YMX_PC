<template>
    <div>
      <!--共用组件头部-->
      <indexList :type="type"></indexList>
      <!--列表-->
      <div class="index_content">
          <div class="text_left font_bold pp2 font18 ">Product listing</div>
          <div class="flex flexAlignCenter justifyContentBetween pw2">
              <div class="flex">
                  <div class="flex flexAlignCenter border_com font16">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link font14">
                          All labels<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                          <el-dropdown-item command="b">狮子头</el-dropdown-item>
                          <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                          <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                          <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <!-- <img src="../../assets/images/more.png" alt="" class="icon_more"> -->
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
              <div class="menu_btn font14" v-if="type==1" @click="addPro">New product +</div>
              <div class="menu_btn font14" v-if="type==3 && !showMenu" @click="showMenu=true"> Add +</div>
              <div v-if="showMenu && type==3" class="font14 flex flexAlignCenter">
                  <el-radio-group v-model="radio" class="font14 flex flexAlignCenter" @change="changeRadio">
                    <div class="font14 ad_item">
                      <el-radio :label="3">Banner AD</el-radio>
                    </div>
                    <div class="font14 ad_item">
                      <el-radio :label="6">Home AD</el-radio>
                    </div>
                    <div class="font14 ad_item">
                      <el-radio :label="9">Floating AD</el-radio>
                    </div>
                  </el-radio-group>
                  <div class=" menu_btn promote_btn font14"> Promote >></div>
              </div>
          </div>
          <div class="pro_list mt5">
              <div class="flex pro_head justifyContentBetween font14 font_bold flexAlignCenter">
                  <div class="pro_head_name">Products</div>
                  <div class="flex justifyContentBetween box_f6">
                    <div class="flex flexAlignCenter justifyContentCenter">
                        <div>Start Time</div>
                        <div>
                            <p class="d1 color_active"></p>
                            <p class="d2"></p>
                        </div>
                    </div>
                    <div class="flex flexAlignCenter justifyContentCenter">
                        <div>End Time</div>
                        <div>
                            <p class="d1 color_active"></p>
                            <p class="d2"></p>
                        </div>
                    </div>
                    <div class="flex flexAlignCenter justifyContentCenter">
                        <div>Price</div>
                        <div>
                            <p class="d1 color_active"></p>
                            <p class="d2"></p>
                        </div>
                    </div>
                    <div class="flex flexAlignCenter justifyContentCenter">On / Off shelf</div>
                    <div class="flex flexAlignCenter justifyContentCenter">Promote</div> 
                    <div class="flex flexAlignCenter justifyContentCenter">Setting</div>
                  </div>
                  
              </div>
              <div class="list_content font14">
                  <div class="list_item flex flexAlignCenter justifyContentBetween" v-for="(item,key) in 4" :key="key">
                    <div class="pro_item_left flex flexAlignCenter">
                      <el-checkbox v-model="checked"></el-checkbox>
                      <div class="item_pic">
                        <img src="" alt="" >
                      </div>
                      <div class="text_flow flex1">Steam Iron for Clothes, Dcenta 2 IN 1 Horizontal and Vertical Ironing Steamer for clothes, 1300W Powerful 25s Fast Heat-up Portable Handheld Garment...</div> 
                    </div>
                    <div class="flex justifyContentBetween  box_f6">
                      <div class="flex flexAlignCenter justifyContentCenter color_9">2020/05/15</div>
                      <div class="flex flexAlignCenter justifyContentCenter color_9">2020/06/14</div>
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
</template>
<script>
  import indexList from '../../components/indexList.vue'
  import {get,post} from '@/api/axios.js'
  import {getToken} from '@/utils/auth.js'
  export default{
    data(){
      return{
        type:0,//1-home 2-vip 3-adver   1-3都是home页面
        checked:true,
        currentPage3: 1,
        value: true,
        radio: 3,
        showMenu:false,//广告的时候是否显示分类
        query:{
          user_token:getToken(),
          list_rows:5,//每页记录数量
          page:1,//访问页码
        }
      }
    },
    components:{
      indexList,
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      changeRadio(e){
        console.log(e,"value")
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      addPro(){
        this.$router.push('/index/add')
      },
      getList(){
        let objUrl = ''
        if(this.type==1){ //1-home  3-adver
          objUrl = '/shop/good_list?lang=en-us'
        }else{
          objUrl = '/shop/good_list?lang=en-us'
        }
        post(objUrl,this.query).then(res=>{

        })
      }
    },
    watch: {
			$route() {
        this.type = this.$route.query.type;
        this.getList()
        // console.log(this.type,",,,,,,,,,,,,,")
			}
		},
    created () {
      this.type = this.$route.query.type;
      this.getList()
    }
  }

</script>
<style>
  @import url("../../assets/css/index.scss");
/* .el-checkbox__inner{
  background: #2D8CF0;
} */
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background: #3F51B5;
  border-color: #3F51B5;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color: #3F51B5;
}
.el-switch__core{
  border-color:  #999999!important;
    background-color:  #999999!important;
}
.el-switch.is-checked .el-switch__core{
    border-color:  #3F51B5!important;
    background-color:  #3F51B5!important;
}
.el-dropdown-link {
    cursor: pointer;
    color: #999999;
  }
  .el-icon-arrow-down {
    font-size: 0.14rem;
  }
  .el-radio__input.is-checked .el-radio__inner{
    border-color:  #3F51B5!important;
    background-color:  #3F51B5!important;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color: #3F51B5;
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