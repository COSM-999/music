<template>
  <div class="detail">
    <DetailHeader :detailListHeader="detailListHeader" />
    <p>歌曲列表</p>
    <ul>
      <PlayListDetail
        v-for="(item, index) in detailList.songs"
        :key="index"
        :item="item"
        :index="index + 1"
        @update:identifierRMusic="$emit('update:identifierRMusic', $event)"
        @update:playListDetail="$emit('update:playListDetail', $event)"
        @update:playList="$emit('update:playList', detailList.songs)"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
    </ul>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import PlayListDetail from "@/components/PlayListDetail.vue";
import DetailHeader from "@/components/DetailHeader.vue";
export default {
  components: {
    PlayListDetail,
    DetailHeader,
  },
  data() {
    return {
      id: null,
      detailList: [],
      detailListHeader: [],
      count: 0,
      isLoading: false,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$root.isShowLoading = true;
    this.isLoading = true;
    this.axios
      .get("playlist/detail?id=" + this.id)
      .then((response) => {
        this.axios
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 19)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            this.detailList = response.data;
            this.count++;
          })
          .finally(() => {
            this.$root.isShowLoading = false;
          });
      })
      .finally(() => {
        this.$root.isShowLoading = false;
      });

    this.axios.get("playlist/detail?id=" + this.id).then((response) => {
      this.detailListHeader = response.data.playlist;
      this.count++;
    });
  },
  watch: {
    isLoading: function (n) {
      this.$emit("update:detailhIsLoading", n);
    },
    count: function (n) {
      if (n >= 2) {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
p {
  margin: 0;
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
}
</style>