<template>
  <div class="inputbox">
    <div class="mainbox">
      <input
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        @keyup.enter="enter"
        @input="change"
        v-model.trim="searchvalue"
      />
      <div class="searchicon"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["newsearchvalue"],
  data() {
    return {
      searchvalue: "",
      searchbool: false,
      // searchlist: [],
    };
  },
  methods: {
    enter: function () {
      this.searchbool = true;
      this.$emit("update:searchbool", this.searchbool);
    },
    change: function () {
      this.searchbool = false;
      this.$emit("update:searchvalue", [this.searchvalue, this.searchbool]);
    },
  },
  watch: {
    newsearchvalue: function (n) {
      if (n) {
        this.searchvalue = n;
      }
    },
  },
};
</script>

<style scoped lang="less">
.inputbox {
  width: 100vw;
  // height: 10vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .mainbox {
    position: relative;
    width: 89%;
    height: 6vh;
    margin: 10px auto;
    input {
      position: absolute;
      display: block;
      left: 0%;
      top: 0%;
      width: 100%;
      height: 100%;
      border-radius: 3vh;
      outline: none;
      padding: 0 0 0 25px;
      box-sizing: border-box;
      border: none;
      background-color: #eee8e8;
    }
    .searchicon {
      width: 13px;
      height: 13px;
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
      background-size: cover;
    }
  }
}
</style>