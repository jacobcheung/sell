<template>
  <div class="shopcart" :class="{'high-ligh':totalCount>0}">
    <div class="shopcart-wapper">
      <div class="content-left">
        <div class="logo-wrapper" :class="{'high-ligh':totalCount>0}">
          <span class="icon-shopping_cart logo" :class="{'high-ligh':totalCount>0}" @click="toggleList"></span>
          <i class="num" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="desc-wrapper">
          <p class="total-prise" v-show="totalPrice">￥{{totalPrice}}</p>
          <p class="tip" :class="{'high-ligh':totalCount>0}">另需{{ poiInfo.shipping_fee_tip }}</p>
        </div>
      </div>
      <div class="content-right" :class="{'high-ligh':totalCount>0}">
        {{payStr}}
      </div>
      <!-- 购物车内容 -->
      <div class="shopcart-list" v-show="listShow" :class="{'show':listShow}">
        <div class="list-top" v-if="poiInfo.discounts2">
          {{poiInfo.discounts2[0].info}}
        </div>
        <div class="list-header">
          <h3 class="title">1号口袋</h3>
          <div class="empty" @click="emptyFun">
            <img src="./ash_bin.png" alt="">
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="listConcent">
          <ul v-if="poiInfo.discounts2">
            <li class="food" v-for="food in selectFoods" :key="food.id">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{food.name}}</p>
                  <p class="unit" v-show="!food.description">{{food.unit}}</p>
                  <p class="desc-info" v-show="food.description">{{food.description}}</p>
                </div>
                <div class="desc-right">
                  <span class="price">￥ {{food.min_price}}</span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <Cartcontrol :food="food"></Cartcontrol> 
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom">

        </div>
      </div>
    </div>
    <div class="shopcart-mask" v-show="listShow" @click="hideMask">

    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Cartcontrol from 'components/Cartcontrol/Cartcontrol'
  export default {
    data(){
      return {
        fold:true
      }
    },
    props :{
      poiInfo: {
        type:Object,
        default:{}
      },
      selectFoods: {
        type: Array,
        default(){
          return [
          //  {
          //    min_price: 10,
          //    count: 3
          //  }
          ]
        }
      }
    },
    components: {
      Cartcontrol,
      BScroll
    },
    computed: {
      // 商品总个数
      totalCount(){
        let num = 0;
        this.selectFoods.forEach((food)=> {
          num += food.count
        })
        return num;
      },
      // 商品总金额
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food)=> {
          total += food.count*food.min_price
        })
        return total;
      },
      // 结算按钮显示
      payStr(){
        if(this.totalCount>0) {
          return "去结算";
        } else {
          return this.poiInfo.min_price_tip;
        }
      },
      listShow() {
        if(!this.totalCount) {
          this.fold = true;
          return false;
        }

        let show = !this.foid;
        if(show) {
          this.$nextTick(()=>{
            if(!this.shopScroll) {
              this.shopScroll = new BScroll(this.$refs.listConcent,{
                click: true
              }) 
            }else {
              this.shopScroll.refresh();
            }
          })
          
        }


        return !this.fold;
      }
    },
    methods: {
      toggleList() {
        if(!this.totalCount) {
          return;
        }
        this.fold = !this.fold
      },
      emptyFun() {
        this.selectFoods.forEach((food)=>{
          food.count = 0;
        })
      },
      hideMask (){
        this.fold = true;
      }
    }
  }
</script>
<style>
  @import url("Shopcart.css");
</style>
