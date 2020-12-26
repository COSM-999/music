<template>
  <div class="recommend">
    <RecommendedList :recommendDatas="recommendDatas">推荐歌单</RecommendedList>
    <NewMusic
      :newSong="newSong"
      @update:music="$emit('update:music', $event)"
      @update:list="$emit('update:list', $event)"
      @update:identifierNMusic="$emit('update:identifierNMusic', $event)"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
      >最新音乐</NewMusic
    >
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// @ is an alias to /src
import RecommendedList from "@/components/RecommendedList.vue";
import NewMusic from "@/components/NewMusic.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
    RecommendedList,
    NewMusic,
  },
  data() {
    return {
      recommendData: [],
      newSong: [],
      recommendsIndex: 0,
      isLoading: false,
      count: 0,
    };
  },
  computed: {
    recommendDatas: function () {
      return this.recommendData.slice(
        this.recommendsIndex * 6,
        (this.recommendsIndex + 1) * 6
      );
    },
  },
  created() {
    this.isLoading = true;
    this.axios.get("personalized").then((respose) => {
      this.recommendData = respose.data.result;
      this.count++;
      // console.log(this.recommendData);
    });
    this.axios.get("personalized/newsong").then((respose) => {
      this.newSong = respose.data.result;
      this.count++;
      // console.log(respose);
    });
  },
  activated() {
    this.recommendsIndex =
      this.recommendsIndex >= 4 ? 0 : this.recommendsIndex + 1;
  },
  watch: {
    count: function (n) {
      if (n >= 2) {
        this.isLoading = false;
      }
    },
    isLoading:function (n) {
      this.$emit("update:isLoading",n)
    }
  },
};
</script>
<style lang="less">
.recommend {
  position: absolute;
  top: 150px;
}
</style>