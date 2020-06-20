<template>
  <div>
    <!--共用组件头部-->
    <div class="flex justifyContentBetween index_list_component flexWrap">
        <div v-for="(item,index) in this.cardInfo" :key="index" class="com_item">
            <div class="flex item_head justifyContentBetween">
                <div class="text_left">
                    <div class="com_total" :class="index==0?'color1':(index==1?'color2':(index==2?'color3':'color4'))">{{item.value}}</div>
                    <div>{{item.key}}</div>
                    <!-- <div>Total collect</div>
                    <div>Total recommend</div>
                    <div>Total review</div> -->
                </div>
                <img src="../assets/images/coupon.png" alt="" class="item_logo" v-if="index==0">
                <img src="../assets/images/collect.png" alt="" class="item_logo" v-if="index==1">
                <img src="../assets/images/zan.png" alt="" class="item_logo" v-if="index==2">
                <img src="../assets/images/review.png" alt="" class="item_logo" v-if="index==3">
            </div>
            <div class="flex com_bot flexAlignCenter justifyContentAround" :class="index==0?'bg1':(index==1?'bg2':(index==2?'bg3':'bg4'))">
                <div v-if="typeNew==1">
                  <div v-if="index==0">Coupon code</div>
                  <div v-if="index==1">Collect</div>
                  <div v-if="index==2">Recommend</div>
                  <div v-if="index==3">Review</div>
                </div>
                
                <div class="cli_pointer" v-if="typeNew==2 || typeNew==3">Renewal >></div>
                <img src="../assets/images/all.png" alt="" class="all_classify">
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  import {post,get} from '@/api/axios.js'
  import {getToken} from '@/utils/auth'
  export default{
    created () {
      this.typeNew = this.$route.query.type;
      this.getData()
    },
    watch: {
      $route() {
        this.typeNew = this.$route.query.type;
        console.log(this.typeNew,",,,,,,,,,,,,,")
        this.getData()
			}
    },
    methods:{
      getData(){  ////1-home 2-vip 3-adver
        let objUrl = ''
        console.log(this.typeNew,"2222222222222")
        if(this.typeNew == 1){
          objUrl = '/shop/goods_statistics?lang=en-us'
        }else if(this.typeNew == 2){
          objUrl = '/shop/vip?lang=en-us'
        }else{
          objUrl = '/shop/goods_statistics?lang=en-us'
        }
        post(objUrl,this.query).then(res=>{
          if(res.code == 0){
            console.log(res.data)
            let data;
            if(this.typeNew==1){
              data = res.data
              for(let key  in data){
                let obj = {}
                obj.key = key
                obj.value = data[key]
                this.cardInfo.push(obj)
              }
            }else if(this.typeNew==2){
              data = res.data.level_info
              this.cardInfo=[
                {key:data.expire_date,value:data.level_name},
                {value:data.times/data.total_times,key:'Simultaneous Shelves'},

              ]
            }
            
            
            
            console.log(this.cardInfo,"card")
          }
        })
      }
    },
    data(){
      return{
        query:{
          user_token:getToken()
        },
        typeNew:'',
        cardInfo:[]
      }
    }
  }

</script>
<style>
  @import url("../assets/css/index.scss");

</style>