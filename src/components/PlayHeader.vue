<template>
  <div class="header">
    <img
      class="back"
      @click="$emit('update:num')"
      src="../assets/back.png"
      alt=""
    />
    <div class="main">
      <p class="songname">{{ currentMusic.name }}</p>
      <!-- newlist[19]?currentMusic.ar[0].name:currentMusic.song.artists[0].name -->
      <span class="artists">{{
        identifier == "NMusic"
          ? currentMusic.song.artists[0].name
          : identifier == "HMusic"
          ? currentMusic.ar[0].name
          : identifier == "SMusic"
          ? currentMusic.ar[0].name
          : currentMusic.ar[0].name
      }}</span>
    </div>
    <img class="share" src="../assets/share.png" alt="" />
  </div>
</template>

<script>
export default {
  props: ["currentMusic", "newlist", "identifier"],
};
</script>

<style lang="less">
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  img {
    width: 25px;
    display: block;
  }
  .main {
    flex: 1;
    color: white;
    font-size: 16px;
    margin-left: 3vw;
    padding: 1vh 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    p {
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .artists {
      font-size: 12px;
      color: #c2b3b3;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        background: url("../assets/forward.png") no-repeat;
        background-size: 10px;
      }
    }
  }
  .back {
    margin-left: 3vw;
  }
  .share {
    margin-right: 3vw;
  }
}
</style>