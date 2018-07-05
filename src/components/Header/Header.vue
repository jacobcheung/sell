<template>
  <div class="header">
    <!-- 顶部通栏 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="搜索店内商品">
      </form>
      <div class="more-wrapper">
        <a class="spelling-bt" href="#">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>

    </div>

    <!-- 内容 -->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg">
      </div>
      <div class="name">
        <h3>{{poiInfo.name}}</h3>
      </div>
      <div class="collect">
        <img src="./star.png" alt="">
        <span>收藏</span>
      </div>
    </div>
    
    <!-- 公号内容 -->
    <div class="bulletin-wrapper">
      <img class="icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" alt="">
      <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
      <div class="detail" v-if="poiInfo.discounts2"  @click="showButton()">
        {{poiInfo.discounts2.length}}个活动
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!-- 背景 -->
    <div class="bg-wrapper" :style="content_bg">
    </div>
    <!-- 公告详情 -->
    
    <transition name="h_detail">         
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="main-wapper" :style="detail_bg">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfo.name}}</h3>
            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i>  
              {{poiInfo.shipping_fee_tip}} <i>|</i>  
              {{poiInfo.delivery_time_tip}}
            </p>
            <div class="score">
              <Start :scoreNum="poiInfo.wm_poi_score"></Start>  
              <span>{{poiInfo.wm_poi_score}}</span>
            </div>
            <p class="time">
              配送时间：
              {{poiInfo.shipping_time}}
            </p>
            <div class="discounts" v-if="poiInfo.discounts2"> 
              <p>
                <img :src="poiInfo.discounts2[0].icon_url" alt="">
                <span>{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <div class="close-wapper">
            <span class="icon-close" @click="hideButton()"></span>
          </div>
        </div>
      </div>
    </transition>     
  </div>
</template>
<script>
  import Start from "components/Start/Start"
  export default {
    data(){
      return {
        isShow: false
      }
    },
    components: {
      Start
    },
    props : {
      poiInfo :{
        type:Object,
        default: {}
      }
    },
    computed:{
      content_bg(){
        return `background-image:url(${this.poiInfo.head_pic_url})` ;  
      },
      head_bg(){
        return `background-image:url(${this.poiInfo.pic_url})` ;  
      },
      detail_bg(){
        return `background-image:url(${this.poiInfo.poi_back_pic_url})` ;  
      }
    },
    methods: {
      showButton(){
        this.isShow = true;
      },
      hideButton(){
        this.isShow = false;
      }
    }
  }

</script>

<style lang="less">
@import url("../../common/styles/icon.css");
/* @import url("Header.css"); */
.header {
  height: 140px;
  padding-top: 20px;
  .top-wrapper {
    position: relative;
    .back-wrapper {
      width: 50px;
      height: 31px;
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 31px;
    }
  }
}
.header .top-wrapper .back-wrapper span {
  display: inline-block;
  color: #fff;
}
.header .top-wrapper .search-wrapper {
  width: 100%;
  height: 31px;
  padding: 0 104px 0 50px;
  box-sizing: border-box;
 
}
.header .top-wrapper .search-wrapper .search-icon{
  width: 28px;
  height: 31px;
  background: url(./titans_h5_search@2x.png) no-repeat 11px center;
  background-size: 13px 13px;
  position: absolute;
}
.header .top-wrapper .search-wrapper .search-bar{
  background: #cdcdcc;
  width: 100%;
  height: 31px;
  border: 0;
  border-radius: 25px;
  box-sizing: border-box;
  padding-left: 28px;
  outline: none;
}
.header .top-wrapper .more-wrapper {
  width: 65px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px 15px 0 24px;
}
.header .top-wrapper .more-wrapper .spelling-bt {
  width: 30px;
  height: 17px;
  color: #fff;
  line-height: 17px;
  border: 1px solid #fff;
  text-align: center;
  float: left;
  text-decoration: none;
  font-size: 10px;
}
.header .top-wrapper .more-wrapper .more-bt {
  float: right;
  width: 20px;
  height: 20px;
  margin-left:12px; 
  margin-top: 7px;
}
.header .top-wrapper .more-wrapper .more-bt .s-radius {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  border: 1px solid #fff;
  display: block;
  float: left;
  margin-right: 1px;
}
/* 内容 */
.content-wrapper {
  height: 50px;
  padding: 17px 10px  11px;
}
.content-wrapper .icon {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  float: left;
}
.content-wrapper .name {
  padding: 17px 0 0 12px;
  float: left;
}
.content-wrapper .name h3 {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.content-wrapper .collect {
  width: 25px;
  height: 37px;
  float: right;
  text-align: center;
  padding-top: 6px; 
}
.content-wrapper .collect img {
  width: 20px;
  height: 20px;;
}
.content-wrapper .collect span {
  margin-top: 7px;
  color: #fff;
  font-size: 11px;
  
}
/* 公号 */
.bulletin-wrapper {
  height: 16px;
  padding: 0 10px;
}
.bulletin-wrapper .icon {
  width: 16px;
  height: 16px;
  float: left;
  margin-right: 6px;
}
.bulletin-wrapper .text {
  font-size: 11px;
  color: #fff;
  float: left;
  line-height: 16px;
}
.bulletin-wrapper .detail {
  font-size: 11px;
  color: #fff;
  float: right;
  line-height: 16px;
}
.bulletin-wrapper .detail span {
  font-size: 16px;
  line-height: 16px;
  float: right;
}
/* 背景 */
.header .bg-wrapper {
  width: 100%;
  height: 160px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-size: cover;
  background-position: center;
}

/* 公告详情 */
.header .bulletin-detail {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(98, 98, 98, 0.8);
}
.header .bulletin-detail .detail-wrapper {
  width: 100%;
  height: 100%;
  padding: 43px 20px 125px;
  box-sizing: border-box;
}
.header .bulletin-detail .detail-wrapper .main-wapper{
  width: 100%;
  height: 100%;
  background-size: 100%;
  border-radius: 10px;
  text-align: center;
}
.header .bulletin-detail .detail-wrapper .main-wapper .icon {
  width: 60px;
  height: 60px;
  background-size: cover;
  background-position: center;
  display: inline-block;
  margin-top: 40px;
}
.header .bulletin-detail .detail-wrapper .main-wapper .name {
  font-size: 15px;
  color: #fff;
  margin-top: 13px;
}
.header .bulletin-detail .detail-wrapper .main-wapper .score {
  margin-top: 6px;
  height: 10px;
  text-align: center;
  font-size: 0;
}
.header .bulletin-detail .detail-wrapper .main-wapper .score .star {
  display: inline-block;
  margin-right: 7px;
}
.header .bulletin-detail .detail-wrapper .main-wapper .score span {
  display: inline-block;
  color: #fff;
  font-size: 10px;
}
.header .bulletin-detail .detail-wrapper .main-wapper .tip {
  font-size: 11px;
  color: #bababc;
  margin-top: 8px;
}
.header .bulletin-detail .detail-wrapper .main-wapper .tip i {
  margin: 0 7px;
  font-style: inherit;
}
.header .bulletin-detail .detail-wrapper .main-wapper .time {
  font-size: 11px;
  color: #bababc;
  margin-top: 13px;
}
.header .bulletin-detail .detail-wrapper .main-wapper .discounts {
  margin-top: 20px;
  padding: 0 20px;
}
.header .bulletin-detail .detail-wrapper .main-wapper .discounts p {
  padding-top: 20px;
  border-top: 1px solid #BABABC;
}
.header .bulletin-detail .detail-wrapper .main-wapper .discounts img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.header .bulletin-detail .detail-wrapper .main-wapper .discounts span {
  font-size: 11px;
  line-height: 11px;
  color: #fff;
}
.header .bulletin-detail .detail-wrapper .close-wapper {
  padding-top: 20px;
  height: 40px;
  text-align: center;
}
.header .bulletin-detail .detail-wrapper .close-wapper span {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  font-size: 14px;
  color: #fff;
  display: inline-block;
  background: rgba(118, 118, 118, 0.7);
  border: 1px solid rgba(140, 140, 140, 0.9);
}

/* 过渡效果 */
.h_detail-enter-active, .h_detail-leave-active {
  transition: 2.5s all;
}
.h_detail-enter, .h_detail-leave-to {
  opacity: 0;
}
.h_detail-enter-to, .h_detail-leave {
  opacity: 1;
}
</style>