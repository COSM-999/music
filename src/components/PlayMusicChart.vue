<template>
  <div class="chartAll" @click="$emit('taggleL')">
    <div class="chart">
      <!-- https://s3.music.126.net/mobile-new/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f= -->
      <div class="disc" :class="{ rotateActive: paused }">
        <!-- newlist[19] ? currentMusic.al.picUrl : currentMusic.picUrl -->
        <div
          class="image"
          :style="
            'background-image:url(' +
            [
              identifier == 'NMusic'
                ? currentMusic.picUrl
                : identifier == 'HMusic'
                ? currentMusic.al.picUrl
                : identifier == 'SMusic'
                ? currentMusic.al.picUrl
                : currentMusic.al.picUrl,
            ] +
            ')'
          "
        ></div>
      </div>
    </div>
    <div class="component"></div>
  </div>
</template>

<script>
export default {
  props: ["currentMusic", "newlist", "paused", "identifier"],
};
</script>

<style lang="less">
.chartAll {
  width: 100vw;
  height: 69vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // transition: all 1s;
  .chart {
    display: inline-block;
    .disc {
      position: relative;
      background-image: url("https://s3.music.126.net/mobile-new/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f=");
      background-position: center;
      background-size: cover;
      width: 40vh;
      height: 40vh;
      // margin: 0 auto;
      align-items: center;
      justify-self: center;
      animation: rotatenext 20s linear infinite;
      &.rotateActive {
        animation-play-state: paused;
      }
      .image {
        position: absolute;
        width: 25vh;
        height: 25vh;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

@keyframes rotatenext {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>