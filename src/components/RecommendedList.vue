<template>
  <div>
    <!-- <h3><slot></slot></h3> -->
    <SongText><slot></slot></SongText>
    <ul class="recommendedul">
      <RecommendedLists
        v-for="(item) in recommendDatas"
        :key="item.id"
        :item="item"
      ></RecommendedLists>
    </ul>
  </div>
</template>

<script>
import SongText from "@/components/SongText.vue";
import RecommendedLists from "@/components/RecommendedLists.vue";
export default {
  components: {
    SongText,
    RecommendedLists,
  },
  props:{
      recommendDatas:{
          type:Array,
      }
  }
};
</script>

<style lang="less">
    .recommendedul{
        display: flex;
        flex-wrap: wrap;
    }
</style>