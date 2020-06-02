<template>
  <div>
    <!--共用组件头部-->
    <div class="flex justifyContentBetween">
        <div v-for="(item,index) in 4" :key="index" class="com_item">
            <div class="flex item_head justifyContentBetween">
                <div class="text_left">
                    <div class="com_total" :class="index==0?'color1':(index==1?'color2':(index==2?'color3':'color4'))">3,509</div>
                    <div>Total coupon code</div>
                    <!-- <div>Total collect</div>
                    <div>Total recommend</div>
                    <div>Total review</div> -->
                </div>
                <img src="../assets/images/coupon.png" alt="" class="item_logo" v-if="index==0">
                <img src="../assets/images/collect.png" alt="" class="item_logo" v-if="index==1">
                <img src="../assets/images/zan.png" alt="" class="item_logo" v-if="index==2">
                <img src="../assets/images/review.png" alt="" class="item_logo" v-if="index==3">
            </div>
            <div class="flex com_bot flexAlignCenter justifyContentBetween" :class="index==0?'bg1':(index==1?'bg2':(index==2?'bg3':'bg4'))">
                <div>Coupon code</div>
                <img src="../assets/images/all.png" alt="">
            </div>
        </div>
    </div>
  </div>
</template>
<script>

</script>
<style>
  @import url("../assets/css/index.scss");

</style>