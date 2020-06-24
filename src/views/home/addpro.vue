<template>
    <div class="addpro">
        <div class="form_list flex justifyContentBetween pw2">
            <div class="form_item flex flexColumn p2">
                <div class="flex flexColumn mt3">
                    <div class="font16 font_bold text_left">Product name*</div>
                    <input type="text" class="inpur_box" v-model="query.name">
                </div>
                <div class="flex flexColumn mt3">
                    <div class="font16 font_bold text_left">Amazon url*</div>
                    <input type="text" class="inpur_box " v-model="query.amazon_url">
                </div>
                <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Discount level*</div>
                  <el-dropdown class="level_box inpur_box" @command="handleChange"
                  placement="bottom-start">
                    <span class="el-dropdown-link" :class="query.level_id?'active':''">
                      {{level}}
                    </span>
                    <el-dropdown-menu slot="dropdown" class="level_main">
                      <el-dropdown-item :command="tll.id" v-for="(tll,key) in levelList" :key="key">{{tll.us_title}}</el-dropdown-item>
                      
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- <input disabled type="text" class="inpur_box " v-model="query.level_id" placeholder="please chooose"> -->
                </div>
                <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">product cate*</div>
                  <el-dropdown class="level_box inpur_box"
                  placement="bottom-start" @command="handleCommand">
                    <span class="el-dropdown-link" :class="query.cate_id?'active':''">
                      {{cate}}
                    </span>
                    <el-dropdown-menu slot="dropdown" class="level_main">
                      <el-dropdown-item :command="ell.id" v-for="(ell,key) in cateList" :key="key">{{ell.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- <input disabled type="text" class="inpur_box " v-model="query.cate_id" placeholder="please chooose"> -->
                </div>
            </div>
            <div class="form_item flex flexColumn p2">
              <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Amazon current price*</div>
                  <input type="text" class="inpur_box" v-model="query.currency_price">
              </div>
              <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Discount*</div>
                  <input type="text" class="inpur_box " v-model="query.discount">
              </div>
              <div class="flex flexColumn mt3">
                <div class="font16 font_bold text_left">Start date*</div>
                <el-date-picker
                  v-model="query.start_time"
                  type="date"
                  placeholder="chose date">
                </el-date-picker>
              </div>
              <div class="flex flexColumn mt3">
                <div class="font16 font_bold text_left">End date*</div>
                <el-date-picker
                  v-model="query.end_time"
                  type="date"
                  placeholder="chose date">
                </el-date-picker>
              </div>
            </div>
            <div class="form_item flex flexColumn p2">
              <div class="flex flexColumn mt3">
                  <div class="font16 font_bold text_left">Discount code*</div>
                  <input type="text" class="inpur_box" v-model="query.discount_coud">
              </div>
              <div class="font14 color_9 mt3">
                *If using long code, fill in a discount code here, and upload other discount code attachments
              </div>
              <div class="flex flexColumn mt5">
                <div class="font16 font_bold text_left">Product Image*</div>
                <div class="mt2">
                  <el-upload
                      class="avatar-uploader"
                      :action="actionUrl"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            </div>
        </div>
        <div class="flex flexAlignCenter flexColumn mt5">
            <div class="flex flexAlignCenter">
              <el-checkbox v-model="checked"></el-checkbox>
              <div class="font14 ml2 color_9 text_ttp">I know that the <span class="color_red font18 text_underline">Featured Deals US</span> section needs to be charged, and I understand the charging standards and precautions *</div>
            </div>
            <div class="font16 conadd_btn mt3" @click="submit">Confirm add</div>
        </div>
    </div>
</template>
<script>
  import {get,post} from '@/api/axios.js'
  import {getToken} from '@/utils/auth.js'
  import {formatDate} from '@/utils/common.js'
  export default{
    data() {
      return {
        checked:true,
        actionUrl:'https://www.amzshop-us.uk/api.php/common/picture_upload',
        imageUrl: '',
        level:'chose level',
        cate:'chose cate',
        cateList:[],//分类
        levelList:[],//折扣
        proid:'',
        query:{
          user_token:getToken(),
          currency_price:'',//当前价格
          name:'',
          discount:'',
          discount_coud:'', //折扣码
          cover_id:'',//图片Id
          amazon_url:'',
          start_time:'',
          end_time:'',
          level_id:'',//折扣分类id
          cate_id:'',//商品分类id
        }
      };
    },
    created () {
      this.getcateList()
      this.getlevelList()
      console.log(this.$route.query,"8888888888")
      if(this.$route.query){
        this.proid = this.$route.query.id
        this.getDetail()
      }
    },
    methods: {
      async getDetail(){
        let query = {
          id:this.proid,
          user_token:getToken()
        }
        const res = await post('shop/goods_detail',query)
        if(res.code == 0){
          this.query = {
            user_token:getToken(),
            currency_price:res.data.currency_price,//当前价格
            name:res.data.name,
            discount:res.data.discount,
            discount_coud:res.data.discount_coud, //折扣码
            cover_id:res.data.cover_id,//图片Id
            amazon_url:res.data.amazon_url,
            start_time:res.data.start_time,
            end_time:res.data.end_time,
            level_id:res.data.level_id,//折扣分类id
            cate_id:res.data.cate_id,//商品分类id
          }
          this.imageUrl = res.data.image
          this.cateList.map(item=>{
            if(item.id == res.data.cate_id){
              this.cate = item.name
            }
          })
          this.levelList.map(item=>{
            if(item.id == res.data.level_id){
              this.level = item.us_title
            }
          })
        }
      },
      async getcateList(){
        const res = await post('goods/goods_cate_list')
        if(res.code == 0){
            this.cateList = res.data
        }
      },
      async getlevelList(){
        let query = {
          user_token:getToken()
        }
        const res = await post('goods/goods_level_list',query)
        if(res.code == 0){
            this.levelList = res.data
        }
      },
      //点击子菜单筛选
      handleCommand(event){
        console.log(event,"lllll")
        this.query.cate_id = event
        this.cateList.map(item=>{
          if(item.id == event){
            this.cate = item.name
          }
        })
      },
      handleChange(event){
        console.log(event,"lllll")
        this.query.level_id = event
        this.levelList.map(item=>{
          if(item.id == event){
            this.level = item.us_title
          }
        })
      },
      handleAvatarSuccess(res, file) {
        console.log(res,"res")
        this.imageUrl = URL.createObjectURL(file.raw);
        this.query.cover_id = res.data.id
      },
      beforeAvatarUpload(file) {
        
      },
      //提交信息
      submit(){
        if(!this.checked){
          this.$message('请仔细阅读协议!')
          return;
        }
        if(this.val()){
          let objUrl = ''
          if(this.proid){
            objUrl = '/shop/edit_goods'
            this.query.id = this.proid
          }else{
            objUrl = '/shop/add_goods'
          }
          // console.log(formatDate(this.query.start_time),"9999999999999999")
          this.query.start_time = formatDate(this.query.start_time)
          this.query.end_time = formatDate(this.query.end_time)
          console.log(this.query.start_time,"llllllllllll")
          post(objUrl,this.query).then(res=>{
            if(res.code == 0){
              let msg = ''
              if(this.proid){
                msg = '修改成功!'
              }else{
                msg = '添加成功!'
              }
              this.$message({
                message:msg,
                type:'success',
                center:true,
                duration:1000
              })
              setTimeout(()=>{
                this.$router.push('/index/home?type=1')
              },1000)
            }
          })
        }
      },
      //验证上传信息
      val(){
        if(this.query.name==''){
          this.$message('请输入产品名称!')
          return;
        }
        if(this.query.currency_price==''){
          this.$message('请输入产品价格!')
          return;
        }
        if(this.query.amazon_url==''){
          this.$message('请输入产品链接!')
          return;
        }
        if(this.query.discount==''){
          this.$message('请输入产品折扣!')
          return;
        }
        if(this.query.discount_coud==''){
          this.$message('请输入产品折扣码!')
          return;
        }
        if(this.query.cate_id==''){
          this.$message('请选择商品分类!')
          return;
        }
        if(this.query.level_id==''){
          this.$message('请选择产品折扣分类!')
          return;
        }
        if(this.query.start_time==''){
          this.$message('请选择开始时间!')
          return;
        }
        if(this.query.end_time==''){
          this.$message('请选择结束时间!')
          return;
        }
        if(this.query.cover_id==''){
          this.$message('请上传产品图片!')
          return;
        }
        return true
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
  .avatar-uploader{
    display: flex;
    justify-content: flex-start;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  input{
    padding:0 0.1rem;
  }
  .level_box{
    text-align: left;
    padding:0 0.1rem;
    background: #eceaea;
    color:#999999;
  }
  .active{
    color:#1a1a1a
  }
  .el-dropdown-link{
    outline: none;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }

  .el-input__inner{
    border:0.01rem solid #E4ECFA;
    height:0.5rem;line-height:0.5rem;
    margin-top:0.2rem!important;
    display: flex;
    align-items:center;
  }
  .el-input__prefix{
    height:0.5rem;line-height:0.5rem;
    bottom:0!important;
    top:50%;
    transform: translateY(-30%);
  }
 .el-input__icon{
    height:0.5rem;line-height:0.5rem;
  }
  .el-input__icon.el-icon-circle-close{
    height:0.5rem;line-height:0.5rem;
    transform: translateY(40%);
  }
</style>