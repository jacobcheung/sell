<template>
  <div class="ratings" ref="ratingView">
    <div class="ratings-wrapper">
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <p class="score">{{ratings.comment_score}}</p>
            <p class="text">商家评分</p>
          </div>
          <div class="other-score">
            <div class="quality-score item clearfix">
              <span class="text">口味</span>
              <Start :scoreNum="ratings.quality_score" class="star"></Start>
              <span class="score">{{ratings.quality_score}}</span>
            </div>  
            <div class="pack-score item clearfix">
              <span class="text">包装</span>
              <Start :scoreNum="ratings.pack_score"></Start>   
              <span class="score">{{ratings.pack_score}}</span> 
            </div>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{ratings.delivery_score}}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>
      
      <Split></Split>

      <div class="content">
        <div class="rating-select" v-if="ratings.tab">
          <span class="item" @click="selectTypeFn(2)" :class="{'active':selectType==2}">
            {{ratings.tab[0].comment_score_title}}
          </span> 
          <span class="item" @click="selectTypeFn(1)" :class="{'active':selectType==1}">
            {{ratings.tab[1].comment_score_title}}
          </span>
          <span class="item" @click="selectTypeFn(0)" :class="{'active':selectType==0}">
            <img src="./icon_sub_tab_dp_normal@2x.png" alt="" v-if="selectType!=0">
            <img src="./icon_sub_tab_dp_highlighted@2x.png" alt="" v-else>
            {{ratings.tab[2].comment_score_title}}
          </span>
        </div>
        <div class="labels-view">
          <span v-for="item in ratings.labels" :key="item.id" class="item" :class="{'highligh':item.label_star > 0}">
            {{item.content}} {{item.label_count}}
          </span>
        </div>

        <!-- 点评内容 -->
        <ul class="rating-li">
          <li class="comment-item" v-for="comment in selectComments" :key="comment.id">
            <div class="comment-header">
              <img :src="comment.user_pic_url" alt="" v-if="comment.user_pic_url">
              <img src="./anonymity.png" alt="" v-else>
            </div>
            <div class="comment-main">
              <div class="user">
                {{comment.user_name}}
              </div>
              <div class="time">
                {{fotmatDate(comment.comment_time)}}
              </div>
              <div class="star-wrapper">
                <span class="score">评分</span>
                <Start class="star" :scoreNum='comment.order_comment_score'></Start>
              </div>
              <div class="content_in" v-html="commentStr(comment.comment)">
              </div>
              <div class="img-wrapper" v-if="comment.comment_pics.length">
                <img :src="item.thumbnail_url" alt="" v-for="item in comment.comment_pics" :key="item.id">
              </div>
            </div>  
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Start from "components/Start/Start"
  import Split from "components/Split/Split"

  // const ALL = 2;
  // const PICTURE = 1;
  // const COMMENT = 0;
  export default {
    data(){
      return {
        ratings: {},
        selectType: 2
      }
    },
    components:{
      Start,
      Split,
      BScroll
    },
    created() {
      this.$axios.get('/api/ratings')
        .then((res)=>{
          var that = this;
          var dataSource = res.data;
          if(dataSource.code == 0) {
            that.ratings = dataSource.data
            
            this.$nextTick(()=>{
              if(!that.scroll) {
                that.scroll = new BScroll(that.$refs.ratingView,{
                  click: true
                })
              } else {
                that.scroll.refresh();
              }
            })
          }
        })
        .catch((error)=>{
          console.log(error)
        })
    },
    methods: {
      selectTypeFn(type){
        this.selectType = type;
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      },
      fotmatDate(time) {
        let data = new Date(time*1000);
        // 时间格式
        let fmt = "yyy.MM.dd";
        if(/(y+)/.test(fmt)){
          let year = data.getFullYear().toString();
          fmt = fmt.replace(RegExp.$1,year)
        }
        if(/(M+)/.test(fmt)){
          let mouth = data.getMonth() + 1;
          if(mouth<10) {
            mouth = '0' + mouth;
          }
          fmt = fmt.replace(RegExp.$1,mouth)
        }
        if(/(d+)/.test(fmt)){
          let day = data.getDate();
          if(day<10) {
            day = '0' + day;
          }
          fmt = fmt.replace(RegExp.$1,day)
        }
        return fmt;
      },
      commentStr(content){
        let rel = /#[^#]+#/g;
        return content.replace(rel, '<i>$&</i>')
      }
    },
    computed: {
      selectComments(){
        if(this.selectType == 2) {
          return this.ratings.comments;
        } else if (this.selectType == 1){
          let arr = [];
          this.ratings.comments.forEach((comment)=>{
            if(comment.comment_pics.length) {
              arr.push(comment)
            }
          })
          return arr;
        } else {
          return this.ratings.comments_dp.comments
        }
      }
    }
  }
</script>
<style>
  @import url("Ratings.css");
</style>
