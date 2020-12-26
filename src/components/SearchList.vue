<template>
  <li class="songlistli" @click="$emit('update:clickSongListLi', item.keyword)">
    <div class="keyword">
      {{ item.keyword }}
    </div>
    <div class="icon"></div>
  </li>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped lang="less">
li {
  padding: 0;
  padding-left: 30px;
  line-height: 49px;
  border: 0;
  position: relative;
  color: #333333;
  .keyword {
    border-bottom: 1px solid #f3e9e9;
  }
  .icon {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
    background-size: cover;
  }
}
</style>