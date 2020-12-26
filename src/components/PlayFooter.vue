<template>
  <div class="footer">
    <div class="rangemodel">
      <input
        type="range"
        :min="0"
        :max="duration"
        @input="changeValue"
        :value="currentTime"
      />
      <span
        class="range"
        :style="{ width: (currentTime / duration) * 100 + '%' }"
      ></span>
      <span class="leftText">{{continuous}}</span>
      <span class="rightText">{{total}}</span>
    </div>
    <div class="playArea">
      <img class="cycle" src="../assets/cycle.png" alt="" />
      <img
        class="previous"
        src="../assets/previous.png"
        alt=""
        @click="$emit('update:previousId')"
      />
      <img
        v-if="paused"
        @click="$emit('update:statePaused')"
        class="circlePause"
        src="../assets/circlePause.png"
        alt=""
      />
      <img
        v-else
        @click="$emit('update:statePlayer', paused)"
        class="circlePlayer"
        src="../assets/circlePlayer.png"
        alt=""
      />
      <img
        class="next"
        src="../assets/next.png"
        alt=""
        @click="$emit('update:nextId')"
      />
      <img class="playlist" src="../assets/playlist.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["duration", "currentTime", "currentMusic", "paused"],
  data() {
    return {};
  },
  methods: {
    changeValue: function (e) {
      // console.log(e.target.value);
      this.$emit("update:value", e.target.value);
    },
    computedTime: function (n) {
      // {{Math.floor(duration/60)}}:{{Math.floor(duration%60)}}
      let minute = Math.floor(n / 60);
      let secends = Math.floor(n % 60);
      if (Math.floor(n / 60) < 10) {
        minute = "0" + Math.floor(n / 60);
      }
      if (Math.floor(n % 60) < 10) {
        secends = "0" + Math.floor(n % 60);
      }
      return minute + ":" + secends;
    },
  },
  computed: {
    total:function(){
      return this.computedTime(this.duration);
    },
    continuous:function(){
      return this.computedTime(this.currentTime);
    }
  },
};
</script>

<style lang="less">
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  // padding-bottom: 100px;
  .rangemodel {
    width: 70%;
    height: 3px;
    background-color: white;
    position: relative;
    border-radius: 1.5px;
    margin: 0 auto;
    input {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      opacity: 0;
    }
    .range {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: red;
      border-radius: 1.5px;
    }
    .leftText {
      position: absolute;
      display: block;
      top: 0;
      left: -25px;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
    }
    .rightText {
      position: absolute;
      display: block;
      top: 0;
      right: -25px;
      transform: translate(50%, -50%);
      color: white;
      font-size: 12px;
    }
  }
  .playArea {
    display: flex;
    width: 100%;
    height: 100px;
    // background-color: aqua;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
      display: block;
    }
    .previous {
      width: 22px;
      margin-left: 7vw;
    }
    .circlePause,
    .circlePlayer {
      width: 45px;
      margin: 0 5vw;
    }
    .next {
      width: 22px;
      margin-right: 7vw;
    }
  }
}
</style>