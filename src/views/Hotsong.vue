<template>
  <div class="hotsong">
    <HotSongs
      :hotsonglist="hotsonglist"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
      @update:hotmusic="$emit('update:hotmusic', $event)"
      @update:hotlist="$emit('update:hotlist', $event)"
      @update:identifierHMusic="$emit('update:identifierHMusic', $event)"
    />
  </div>
</template>

<script>
import HotSongs from "@/components/HotSongs.vue";
export default {
  components: {
    HotSongs,
  },
  data() {
    return {
      hotsonglist: [],
      count: 0,
      isLoading: false,
    };
  },
  created() {
    // console.log("Hot created");
    this.$root.isShowLoading = true;
    this.isLoading = true;
    this.axios
      .get("/top/list?idx=1")
      .then((response) => {
        // console.log(
        //   response.data.playlist.trackIds
        //     .slice(0, 20)
        //     .map((e) => e.id)
        //     .join()
        // );
        this.$root.isShowLoading = true;
        this.axios
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 20)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            this.hotsonglist = response.data;
            this.isLoading = false;
          })
          .finally(() => {
            this.$root.isShowLoading = false;
          });
      })
      .finally(() => {
        this.$root.isShowLoading = false;
      });
  },
  watch: {
    isLoading: function (n) {
      this.$emit("update:hotSongIsLoading", n);
    },
    // count: function (n) {
    //   if (n >= 2) {
    //     this.isLoading = false;
    //   }
    // },
  },
};
</script>

<style lang='less'>
.hotsong {
  position: absolute;
  top: 150px;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>