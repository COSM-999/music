<template>
  <!-- <li></li> -->
  <li
    class="songlistli"
    @click="
      $emit('update:identifierRMusic', identifier),
        $emit('update:playListDetail', item),
        $emit('update:playList')
    "
  >
    <div class="num">{{ index }}</div>
    <div class="section">
      <div class="eachli">
        <h4>{{ item.name }}</h4>
        <p>
          <span>{{ item.ar[0].name }} - {{ item.al.name }}</span>
        </p>
      </div>
      <div class="play">
        <span
          class="i"
          :class="{ paused: paused }"
          v-if="currentMusic && currentMusic.id == item.id"
        >
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span class="playicon" v-else></span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item", "index", "paused", "currentMusic"],
  data() {
    return {
      identifier: "RMusic",
      addZero: "0",
    };
  },
};
</script>

<style scoped lang="less">
.songlistli {
  position: relative;
  padding-left: 0px;
  display: flex;
  .num {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    font-size: 17px;
    color: #999;
  }
  .section {
    flex: 1 1 auto;
    width: 1%;
    .eachli {
      padding: 5px 0;
      h4 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 50px;
        margin: 0;
        font-weight: 400;
        color: #333333;
      }
      p {
        display: flex;
        align-items: center;
        margin: 0;
        font-weight: 400;
        color: #333333;
        span {
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-right: 50px;
          font-size: 10px;
          color: #888888;
        }
        i {
          display: inline-block;
          width: 15px;
          height: 9px;
          background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
            no-repeat;
          background-size: 190px;
        }
      }
    }
    .play {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      span.playicon {
        background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
          no-repeat;
        width: 22px;
        height: 22px;
        background-size: 156px;
        background-position: -22px 0;
        display: block;
      }
      span.i {
        display: flex;
        align-items: flex-end;
        height: 25px;
        i {
          display: block;
          width: 6px;
          height: 100%;
          background-color: red;
          transform-origin: bottom;
          animation: move 0.5s linear -0.2s infinite alternate-reverse;
          &:nth-of-type(1) {
            animation-delay: 0s;
          }
          &:nth-of-type(2) {
            margin: 0 2px;
          }
          &:nth-of-type(3) {
            animation-delay: -0.4s;
          }
        }
        &.paused {
          i {
            animation-play-state: paused;
          }
        }
      }
    }
  }
}

@keyframes move {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0.5);
  }
}
</style>