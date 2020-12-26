<template>
  <div class="search">
    <Searchbox
      @update:searchvalue="
        searchbool = $event[1];
        searchvalue = $event[0];
      "
      :newsearchvalue="searchvalue"
      @update:searchbool="
        searchbool = $event;
        accurateSearchValue = searchvalue;
      "
    ></Searchbox>
    <SearchText
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
      :hotSearch="hotSearch"
      :searchvalue="searchvalue"
      :searchlist="searchlist"
      :searchbool="searchbool"
      :accurateList="accurateList"
      @update:changeState="
        searchbool = !searchbool;
        searchvalue = $event;
        accurateSearchValue = $event;
      "
      @update:clickSCH="
        accurateSearchValue = searchvalue;
        searchbool = !searchbool;
      "
      @update:clickSongListLi="
        searchbool = !searchbool;
        searchvalue = $event;
        accurateSearchValue = $event;
      "
      @update:hotSearchList="
        $emit('update:hotSearchList', [$event, accurateList])
      "
      @update:identifierSMusic="$emit('update:identifierSMusic', $event)"
      >热门搜索</SearchText
    >
  </div>
</template>

<script>
import Searchbox from "@/components/Searchbox.vue";
import SearchText from "@/components/SearchText.vue";
export default {
  data() {
    return {
      hotSearch: [],
      searchlist: [],
      accurateList: [],
      searchvalue: "",
      accurateSearchValue: "",
      count: 0,
      searchbool: false,
      time: null,
      isLoading: false,
    };
  },
  components: {
    Searchbox,
    SearchText,
  },
  created() {
    this.isLoading = true;
    this.axios.get("search/hot").then((respose) => {
      this.hotSearch = respose.data.result.hots;
      this.isLoading = false;
    });
  },
  watch: {
    searchvalue: function (n) {
      let _this = this;
      if (n == "") {
        this.searchlist = [];
        this.accurateList = [];
        return;
      }
      if (n) {
        if (this.time) {
          clearTimeout(this.time);
        }
        this.time = setTimeout(function () {
          this.axios
            .get("search/suggest?keywords=" + n + "&type=mobile")
            .then((respose) => {
              _this.searchlist = respose.data.result.allMatch;
              // console.log(_this.searchlist)
            });
        }, 200);
      }
    },
    accurateSearchValue: function (n) {
      this.isLoading = true;
      if (n == "") {
        this.searchlist = [];
        this.accurateList = [];
        return;
      }
      if (n) {
        this.axios
          .get("search?keywords=" + n + "&type=1018")
          .then((respose) => {
            this.accurateList = respose.data.result.song.songs;
            this.isLoading = false;
            // console.log(respose.data.result.song.songs);
          });
      }
    },
    isLoading: function (n) {
      this.$emit("update:searchIsLoading", n);
    },
  },
};
</script>

<style lang="less">
.search {
  position: absolute;
  top: 150px;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>