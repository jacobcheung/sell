<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li class="meau-item" @click="selectMenu(0)" :class="{'crrent': getIndex === 0}">
          <p class="text">
            <img :src="container.tag_icon" class="icon" v-if="container.tag_icon" alt="">
            {{container.tag_name}}
          </p>
        </li>
        <li class="meau-item" v-for="(item,index) in goods" :key="item.id" :class="{'crrent': getIndex === index+1}" @click="selectMenu(index+1)">
          <p class="text">
            <img :src="item.icon" class="icon" v-if="item.icon" alt="">
            {{item.name}}
          </p>
          <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="food-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div v-for="item in container.operation_source_list" :key="item.id">
            <img :src="item.pic_url" alt="">
          </div>
        </li>
        <!-- 商品分类 -->
        <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
          <h3 class="title">{{item.name}}</h3>
          <ul>
            <li v-for="food in item.spus" :key="food.id" class="food-item" @click="showDetail(food)">
              <div class="icon" :style="head_bg(food.picture)"> 
              </div>
              <div class="content">
                <h3 class="name" >{{food.name}}</h3>
                <p class="desc" v-if="food.status_description">{{food.status_description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="product" :src="food.product_label_picture" v-if="food.product_label_picture" alt="">
                <p class="price">
                  <span class="text">￥{{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <Cartcontrol :food='food'></Cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <Shopcart :poiInfo="poiInfo" :selectFoods='selectFoods'></Shopcart>
    <!-- 商品详情 -->
    <Food :food='selectedFood' ref="foodView"></Food>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Shopcart from 'components/Shopcart/Shopcart'
  import Cartcontrol from 'components/Cartcontrol/Cartcontrol'
  import Food from 'components/Food/Food'

  export default {
    data() {
      return{
        container:{},
        goods:[],
        poiInfo:{},
        listHight:[],
        menuScroll:{},
        foodScroll:{},
        scrollY:0,
        selectedFood:{}
      }
    },
    components: {
      BScroll,
      Shopcart,
      Cartcontrol,
      Food
    },
    created(){
      var that = this;
      this.$axios.get('/api/goods').then(function(res){
        var dataSource = res.data;
        console.log(res)
        if(dataSource.code == 0) {
          that.container = dataSource.data.container_operation_source;
          that.goods = dataSource.data.food_spu_tags;
          that.poiInfo = dataSource.data.poi_info;
          // console.log(that.poiInfo)
          that.$nextTick (()=>{
            that.initScroll();
            that.getHeight();
          })
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    methods: {
      head_bg(imgName){
        return `background-image:url(${imgName})`;  
      },
      initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuScroll,{
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodScroll,{
          probeType: 3,
          click: true
        });

        this.foodScroll.on('scroll',(pos)=>{
          this.scrollY = Math.abs( Math.round(pos.y) );
        })
      },
      getHeight(){
        let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
        let heights = 0;
        this.listHight.push(heights);
        for(let i=0; i<foodlist.length; i++) {
          let item = foodlist[i];
          
          heights += item.offsetHeight;
          this.listHight.push(heights);
        }
      },
      selectMenu(index) {
        let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
        let el = foodlist[index];
        this.foodScroll.scrollToElement(el,300)
      },
      calculateCount(spus) {
        let count = 0;
        spus.forEach((food)=>{
          if(food.count>0) {
              count += food.count;
          }
        })
        return count;
      },
      showDetail(food){
        this.selectedFood = food;
        //显示详情页
        this.$refs.foodView.isShowView();
      }
    },
    computed: {
      getIndex(){
        for(let i=0; i<this.listHight.length; i++) {
          let height1 = this.listHight[i];
          let height2 = this.listHight[i+1];
          if(!height2 || this.scrollY >= height1 && this.scrollY<height2) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.spus.forEach((food) => {
            if(food.count>0) {
              foods.push(food)
            }
          })
        });
        return foods;
      }
      
    }
  }
</script>
<style>
@import url("Goods.css");
</style>
