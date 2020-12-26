<template>
  <li class="PlayMusicLyricLi">
    {{ item.text }}
  </li>
</template>

<script>
export default {
  props: ["item", "index"],
};
</script>

<style scoped lang="less">
.PlayMusicLyricLi {
  //   height: 25px;
  line-height: 28px;
  padding-bottom: 10px;
  width: 79vw;
  // transition: all 1s;
  &:last-child {
    padding-bottom: 0px;
  }
}
</style>