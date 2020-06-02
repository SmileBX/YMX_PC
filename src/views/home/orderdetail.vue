<template>
  <div>
      <div class="orderdetail">
          <div class="text_left font_bold pp2 font18 ">Order list > Order information</div>
          <div class="order_info flex mt8 font_bold font16">
              <div class="w7 flex justifyContentBetween order_info_item">
                <div class="text_left">
                  <div>Order number: <span class="font14 color_9">202005110101102</span></div>
                  <div class="mt5">Price: <span class="font14 color_9">99 USD/YEAR</span></div>
                </div>
                <div class="text_left">
                  <div>Service: <span class="font14 color_9">VIP3 annual fee</span></div>
                  <div class="mt5">Quantity: <span class="font14 color_9">1</span></div>
                </div>
                <div class="text_left">
                  <div>Product: <span class="font14 color_9">VIP3</span></div>
                  <div class="mt5">Quantity: <span class="font14 color_9">Paypal</span></div>
                </div>
              </div>
              <div class="w3 flex justifyContentBetween">
                  <div>Date: <span class="font14 color_9">2020.05.11 12:03</span></div>
                  <div>Status: <span class="font14 color_9">Paid</span></div>
              </div>
          </div>
          <div class="flex_alic">
              <div class="detail_bott flex flexColumn flexAlignCenter">
                <div class="font16 font_bold">Total price: <span class="color_purple">99 USD</span></div>
                <div class="font16 service_btn">Service</div>
                <div class="text_underline color_purple font14">request a refund</div>
              </div>
          </div>
      </div>
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
      
    },
}
</script>
<style>
 @import url("../../assets/css/index.scss");
 .orderdetail{
    margin:0.3rem 0.2rem;
    background: #ffffff;
    padding-bottom:1.5rem;
    box-sizing: border-box;
  }

</style>