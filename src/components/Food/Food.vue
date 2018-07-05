<template>
  <transition name="detail">
    <div class="foodwrap-details" v-show="isShow" ref="foodView">
      <div class="food-wrapper">  
        <div class="food-content"> 
          <div class="img-wrapper">
            <img class="food-img" :src="food.picture" alt="">
            <span class="close-bt icon-close"  @click="closeView"></span>
            <img class="share-bt" src="./share.png" alt="">
            <img class="more-bt" src="./more.png" alt="">
          </div>
          <div class="details-contents">
            <h3 class="name">{{food.name}}</h3>
            <p class="saled">{{food.month_saled_content}}</p>
            <img :src="food.product_label_picture" alt="" class="product" v-show="food.product_label_picture">
            <p class="price">
              <span class="text">￥{{food.min_price}}</span> 
              <span class="unit">/{{food.unit}}</span>
            </p>
            <div class="cartcontrol-wrapper">
                <Cartcontrol :food='food'></Cartcontrol>
              </div>
            <div class="buy" v-show="!food.count||food.count==0" @click="addFirst">
              选规格
            </div>
          </div>
        </div>

        <Split></Split>

        <div class="rating-wrapper">
          <div class="rating-title" v-if="food.rating">
            <div class="like-ratio" >
              <span class="title">
                {{food.rating.title}}
              </span>
              <span class="ratio">
                ({{food.rating.like_ratio_desc}}
                <i>{{food.rating.like_ratio}}</i>)
              </span>
            </div>
            <div class="snd-title">
              <span class="text">{{food.rating.snd_title}} </span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>
          <ul class="rating-content" v-if="food.rating">
            <li v-for="comment in food.rating.comment_list" :key="comment.id" class="rating-comment" >
              <div class="comment-header">
                <img :src="comment.user_icon" alt="" v-if="comment.user_icon">
                <img src="./anonymity.png" alt="" v-else>
              </div>
              <div class="comment-main">
                <div class="user">
                  {{comment.user_name}}
                </div>
                <div class="time">
                  {{comment.comment_time}}
                </div>
                <div class="content">
                  {{comment.comment_content}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import BScroll from 'better-scroll'
  import Cartcontrol from 'components/Cartcontrol/Cartcontrol'
  import Vue from 'vue'
  import Split from 'components/Split/Split'
  export default {
    data() {
      return {
        isShow: false
      }
    },
    props: {
      food: {
        type:Object
      }
    },
    methods: {
      isShowView() {
        this.isShow = true;
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.foodView, {
              click:true
            });
          }
        })
      },
      closeView() {
        this.isShow = !this.isShow;
      },
      addFirst() {
        Vue.set(this.food,'count',1)
      }
    },
    components: {
      BScroll,
      Cartcontrol,
      Vue,
      Split
    }
  }
</script>
<style>
@import url("Food.css");
</style>
