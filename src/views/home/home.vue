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
                    <el-dropdown 
                    placement="bottom-start"
                    @command="handleCommand">
                        <span class="el-dropdown-link font14">
                         {{cate}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="level_main">
                          <el-dropdown-item :command="ell.id" v-for="(ell,key) in cateList" :key="key">{{ell.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <!-- <img src="../../assets/images/more.png" alt="" class="icon_more"> -->
                  </div>
                  <div class="flex flexAlignCenter border_com m15_cen">
                      <input type="text" name="" id="" placeholder="Search" v-model="query.search">
                      <img src="../../assets/images/search.png" alt="" class="icon_sear" @click="getList">
                    </div>
                  <!-- <div class="flex flexAlignCenter font14">
                    <el-checkbox v-model="checked"></el-checkbox>
                    <div class="ml5">Only show ongoing listing</div>
                  </div> -->
              </div>
              <!---home  New product +
                  adv   Add +
                  adv分类  Promote >>等
              -->
              <div class="menu_btn font14 cli_pointer" v-if="type==1" @click="addPro">New product +</div>
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
                    <!-- <div class="flex flexAlignCenter justifyContentCenter">Promote</div>  -->
                    <div class="flex flexAlignCenter justifyContentCenter">Setting</div>
                  </div>
                  
              </div>
              <div class="list_content font14">
                  <div class="list_item flex flexAlignCenter justifyContentBetween" v-for="(item,key) in proList" :key="key">
                    <div class="pro_item_left flex flexAlignCenter">
                      <!-- <el-checkbox v-model="checked"></el-checkbox> -->
                      <div class="item_pic">
                        <img :src="item.image" alt="" >
                      </div>
                      <div class="text_flow flex1">{{item.name}}</div> 
                    </div>
                    <div class="flex justifyContentBetween  box_f6">
                      <div class="flex flexAlignCenter justifyContentCenter color_9">{{item.start_time}}</div>
                      <div class="flex flexAlignCenter justifyContentCenter color_9">{{item.end_time}}</div>
                      <div>
                        <div>${{item.price}}</div>
                        <div class="color_9">USD</div>
                      </div>
                      <div>
                        <el-switch
                          v-model="item.isCheck"
                          active-color="#13ce66"
                          @change="changSwitch(item)"
                          inactive-color="#ff4949">
                        </el-switch>
                      </div>
                      <!-- <div>
                        <el-switch
                          v-model="value"
                          active-color="#13ce66"
                          inactive-color="#ff4949">
                        </el-switch>
                      </div> -->
                      <div class="set_menu">
                          <img src="../../assets/images/set.png" alt="" @click="addPro(item)">
                          <img src="../../assets/images/url.png" alt="">
                          <img src="../../assets/images/del.png" alt="" @click="del(item)">
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="block mt5">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-size="query.list_rows"
          layout="prev, pager, next, jumper"
          :total="total">
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
        currentPage3: 1,
        value: true,
        radio: 3,
        checked:true,
        showMenu:false,//广告的时候是否显示分类
        proList:[],
        cateList:[],
        total:0,
        cate:'All labels',
        query:{
          user_token:getToken(),
          list_rows:5,//每页记录数量
          page:1,//访问页码
          cate_id:0,
          search:'',
        }
      }
    },
    components:{
      indexList,
    },
    methods: {
      handleCommand(event){
        console.log(event,"lllll")
        this.query.cate_id = event
        this.cateList.map(item=>{
          if(item.id == event){
            this.cate = item.name
          }
        })
        this.getList()
      },
      changeRadio(e){
        console.log(e,"value")
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$router.push({
					path: "/index/home",
					query:{
            page:val,//访问页码
            list_rows:this.query.list_rows
          }
				});
      },
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
				this.getList()
			},
      async getcateList(){
        try{
          const res = await post('goods/goods_cate_list')
          if(res.code == 0){
              this.cateList = res.data
          }
        }catch(err){

        }
      },
      //删除商品
      del(item){
        let query = {
          user_token:getToken(),
          id:item.id,
          status:'-1',
        }
        post('shop/update_goods_status',query).then(res=>{
          if(res.code == 0){
            this.$message({
                 message: '删除成功!',
                type: 'success',
                center:true,
                duration:1000
            })
            setTimeout(()=>{
              this.getList()
            },1000)
          }
        }).catch((err)=>{
          
        })
      },
      changSwitch(item){
        //是否上架
        // console.log(item,"777777777777777")
        let query = {
          user_token:getToken(),
          id:item.id,
          status:item.status==1?'0':'1',
        }
        // console.log(query,"kkkkk")
        post('shop/update_goods_status',query).then(res=>{
          if(res.code == 0){
            this.$message({
                 message: '操作成功!',
                type: 'success',
                center:true,
                duration:1000
            })
          }
        }).catch(()=>{
          
        })
      },
      addPro(item){
        if(item){
          this.$router.push({
            path:'/index/add',
            query:{
              id:item.id
            }
          })
        }else{
          this.$router.push('/index/add')
        }
        
        // this.$router.push('/index/add?id='+item.id)
      },
      getList(){
        let objUrl = ''
        if(this.type==1){ //1-home  3-adver
          objUrl = '/shop/good_list?lang=en-us'
        }else{
          objUrl = '/shop/good_list?lang=en-us'
        }
        post(objUrl,this.query).then(res=>{
          if(res.code == 0){
            console.log(res.data.data,"998989898")
            this.total = res.data.total
            this.proList = res.data.data
            res.data.data.map(item=>{
              if(item.status == 1){
                this.$set(item,"isCheck",true)
              }else{
                this.$set(item,"isCheck",false)
              }
            })
            // console.log(this.proList,"this.proList")
          }
        }).catch(()=>{

        })
      }
    },
    watch: {
			$route() {
        this.type = this.$route.query.type;
        // this.getList()
        this.innerGetContent()
        // console.log(this.type,",,,,,,,,,,,,,")
			}
		},
    created () {
      this.type = this.$route.query.type;
      this.innerGetContent()
      this.getcateList()
    }
  }

</script>
<style>
  @import url("../../assets/css/index.css");
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