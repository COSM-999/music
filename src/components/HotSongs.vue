<template>
  <ul>
    <HotSongList
      v-for="(item,index) in hotsonglist.songs"
      :key="item.id"
      :item="item"
      :index="index+1"
      @update:hotmusic="$emit('update:hotmusic', $event)"
      @update:hotlist="$emit('update:hotlist', hotsonglist.songs)"
      @update:identifierHMusic="$emit('update:identifierHMusic', $event)"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
    ></HotSongList>
  </ul>
</template>

<script>
import HotSongList from "@/components/HotSongList.vue";
export default {
  components: {
    HotSongList,
  },
  props: ["hotsonglist"],
};
</script>

<style>
</style>