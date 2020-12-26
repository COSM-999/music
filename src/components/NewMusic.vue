<template>
  <div>
    <SongText><slot></slot></SongText>
    <ul>
      <SongList
        v-for="item in newSong"
        :key="item.id"
        :item="item"
        @update:music="$emit('update:music', $event)"
        @update:list="$emit('update:list', newSong)"
        @update:identifierNMusic="$emit('update:identifierNMusic', $event)"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      ></SongList>
    </ul>
  </div>
</template>

<script>
import SongText from "@/components/SongText.vue";
import SongList from "@/components/SongList.vue";
export default {
  components: {
    SongText,
    SongList,
  },
  props: {
    newSong: {
      type: Array,
    },
  },
};
</script>

<style>
</style>