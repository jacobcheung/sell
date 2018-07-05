<template>
  <div class="star">
    <span v-for="itemClass in itemClasses" :class="itemClass" :key="itemClass.id" class="star-item"></span>
  </div>
</template>
<script>
  const LENGTH = 5;

  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
  export default {
    props: {
      scoreNum: {
        type: Number
      }
    },
    computed: {
      itemClasses(){
        let result = [];
        let score = Math.floor(this.scoreNum*2)/2;
        // 半星
        let hasDecimal = score %2 !==0;

        let integer = Math.floor(score);
        // 全星
        for(let i=0;i<integer;i++){
          result.push(CLS_ON)
        }
        if(hasDecimal) {
          result.push(CLS_HALF)
        }
        while(result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result;
      }
    }
  }
</script>
<style>
  .star {
    font-size: 0;
  }
  .star .star-item {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-repeat: no-repeat;
    background-size: 10px 10px;
  }
  .star .star-item:last-child{
    margin-right: 0;
  } 
  .star .star-item.on {
    background-image: url(./star24_on@2x.png)
  }
  .star .star-item.off {
    background-image: url(./star24_off@2x.png)
  }
  .star .star-item.half {
    background-image: url(./star24_half@2x.png)
  }
</style>