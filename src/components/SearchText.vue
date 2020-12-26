<template>
  <div>
    <div class="searchtext" v-if="searchvalue == '' && searchbool == false">
      <p><slot></slot></p>
      <div>
        <HotSearch
          v-for="(item, index) in hotSearch"
          :key="index"
          :item="item"
          @update:changeState="$emit('update:changeState', $event)"
        />
      </div>
    </div>

    <div
      class="searchindex"
      v-else-if="searchvalue != '' && searchbool == false"
    >
      <h4 @click="$emit('update:clickSCH')">搜索“{{ searchvalue }}”</h4>
      <ul>
        <!-- <li v-for="(item, index) in searchlist" :key="index">
          {{ item.keyword }}
        </li> -->
        <SearchList
          v-for="(item, index) in searchlist"
          :key="index"
          :item="item"
          @update:clickSongListLi="$emit('update:clickSongListLi', $event)"
        />
      </ul>
    </div>

    <ul class="accurateSearch" v-else>
      <HotSearchList
        v-for="item in accurateList"
        :key="item.id"
        :item="item"
        @update:hotSearchList="$emit('update:hotSearchList', $event)"
        @update:identifierSMusic="$emit('update:identifierSMusic', $event)"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
    </ul>
  </div>
</template>

<script>
import HotSearch from "@/components/HotSearch.vue";
import HotSearchList from "@/components/HotSearchList.vue";
import SearchList from "@/components/SearchList.vue";
export default {
  props: [
    "hotSearch",
    "searchvalue",
    "searchlist",
    "searchbool",
    "accurateList",
  ],
  data() {
    return {};
  },
  components: {
    HotSearch,
    HotSearchList,
    SearchList,
  },
};
</script>

<style scoped lang="less">
.searchtext {
  padding: 10px 10px 0;
  p {
    margin: 0;
    font-size: 13px;
    color: #666666;
  }
}
.searchindex {
  h4 {
    margin: 0px 0 0 10px;
    padding: 10px 0;
    font: 15px Helvetica, sans-serif, STHeiTi;
    line-height: 30px;
    border-bottom: 1px solid #d3d4da;
    color: #507daf;
  }
}
</style>