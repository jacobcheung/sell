<template>
  <div id="app">
    <!-- 头部 -->
    <Myheader :poiInfo='poiInfo'></Myheader>  

     <!-- 导航 -->
    <Mynav :commentNum = 'commentNum'></Mynav>

    <!-- 主题内容 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
 


  </div>
</template>

<script>

import Myheader from 'components/Header/Header'
import Mynav from 'components/Nav/Nav'

export default {
  name: 'App',
  components: {
    Myheader,
    Mynav
  },
  data(){
    return {
      poiInfo: {},
      commentNum: 0
    }
  },
  created(){
    var that = this;
    this.$axios.get('/api/goods').then(function(res){
      var dataSource = res.data;
      if(dataSource.code == 0) {
        that.poiInfo = dataSource.data.poi_info
      }
     
    })
    .catch(function(error){
      console.log(error)
    })
    this.$axios.get('/api/ratings').then(function(res){
      var dataSource = res.data;
      if(dataSource.code == 0) {
        that.commentNum = dataSource.data.comment_num
      }
     
    })
    .catch(function(error){
      console.log(error)
    })
  }
}
</script>

<style>

</style>
