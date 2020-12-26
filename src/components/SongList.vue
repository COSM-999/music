<template>
  <li
    class="songlistli"
    @click="
      $emit('update:music', item),
        $emit('update:list'),
        $emit('update:identifierNMusic', identifier)
    "
  >
    <div class="eachli">
      <h4>{{ item.name }}</h4>
      <p>
        <i></i>
        <span
          >{{ item.song.artists[0].name }} - {{ item.song.album.name }}</span
        >
      </p>
    </div>
    <div class="play">
      <!-- {{currentMusic}} -->
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
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    currentMusic: {
      type: Object,
    },
    paused: {
      type: Boolean,
    },
  },
  data() {
    return {
      identifier: "NMusic",
    };
  },
};
</script>

<style lang="less">
.songlistli {
  position: relative;
  padding-left: 12px;
  .eachli {
    padding: 5px 0;
    border-bottom: 1px solid #f3e9e9;
    h4 {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 50px;
      margin: 0;
      font-weight: 400;
      color: #333333;
      font-size: 17px;
    }
    p {
      display: flex;
      align-items: center;
      margin: 0;
      font-weight: 400;
      color: #333333;
      font-size: 12px;
      span {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 50px;
        // font-size: 10px;
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

@keyframes move {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0.5);
  }
}
</style>