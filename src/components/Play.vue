<template>
  <div id="play">
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      controls
      autoplay
      ref="audio"
    ></audio>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <div class="play-bar" v-show="!opendetail">
        <div class="barfooter" @click="opendetail = !opendetail">
          <div class="imgbig">
            <div class="img" :class="{ paused: paused }">
              <!-- newlist[19] ? currentMusic.al.picUrl : currentMusic.picUrl, -->
              <img
                :src="[
                  identifier == 'NMusic'
                    ? currentMusic.picUrl
                    : identifier == 'HMusic'
                    ? currentMusic.al.picUrl
                    : identifier == 'SMusic'
                    ? currentMusic.al.picUrl
                    : currentMusic.al.picUrl,
                ]"
                alt=""
              />
            </div>
          </div>
          <h4>{{ currentMusic.name }}</h4>
          <div class="tagglebutton">
            <canvas width="50" height="50" ref="circle"></canvas>
            <div class="play" v-if="!paused" @click.stop="toggleState"></div>
            <div class="pause" v-else @click.stop="toggleState"></div>
          </div>

          <!-- <span></span> -->
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="play-detail" v-show="opendetail">
        <!-- newlist[19]
                ? currentMusic.al.picUrl
                : currentMusic.song.album.blurPicUrl, -->
        <div
          class="mask"
          :style="
            'backgroundImage:url(' +
            [
              identifier == 'NMusic'
                ? currentMusic.song.album.blurPicUrl
                : identifier == 'HMusic'
                ? currentMusic.al.picUrl
                : identifier == 'SMusic'
                ? currentMusic.al.picUrl
                : currentMusic.al.picUrl,
            ] +
            ');'
          "
        ></div>
        <PlayHeader
          :currentMusic="currentMusic"
          @update:num="opendetail = !opendetail"
          :newlist="newlist"
          :identifier="identifier"
        />
        <template>
          <!-- <transition name="component-fade" mode="out-in"> -->
          <transition name="fade">
            <PlayMusicChart
              :currentMusic="currentMusic"
              v-if="isTaggle"
              @taggleL="isTaggle = !isTaggle"
              :paused="paused"
              :newlist="newlist"
              :identifier="identifier"
            />
          </transition>
          <!-- <keep-alive> -->
          <!-- <transition name="component-fade" mode="out-in"> -->
          <transition name="fade">
            <PlayMusicLyric
              v-if="!isTaggle"
              @taggleC="isTaggle = !isTaggle"
              :Lyric="Lyric"
              :LyricI="LyricI"
              :currentTime="currentTime"
            />
          </transition>
          <!-- </keep-alive> -->
        </template>
        <PlayFooter
          :duration="duration"
          :currentMusic="currentMusic"
          :currentTime="currentTime"
          @update:value="$refs.audio.currentTime = $event"
          @update:statePaused="toggleState"
          @update:statePlayer="toggleState"
          @update:previousId="provioussong"
          @update:nextId="nextsong"
          :paused="paused"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import PlayHeader from "@/components/PlayHeader.vue";
import PlayFooter from "@/components/PlayFooter.vue";
import PlayMusicChart from "@/components/PlayMusicChart.vue";
import PlayMusicLyric from "@/components/PlayMusicLyric.vue";
export default {
  components: {
    PlayHeader,
    PlayFooter,
    PlayMusicChart,
    PlayMusicLyric,
  },
  props: ["currentMusic", "newlist", "identifier", "Lyric"],
  data() {
    return {
      paused: null,
      duration: 0,
      currentTime: 0,
      opendetail: false,
      isTaggle: true,
      LyricI: null,
    };
  },
  mounted() {
    this.$refs.audio.addEventListener("pause", () => {
      this.paused = true;
    });
    this.$refs.audio.addEventListener("play", () => {
      this.paused = false;
    });
    this.$refs.audio.addEventListener("durationchange", () => {
      this.duration = this.$refs.audio.duration;
    });
    this.$refs.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.$refs.audio.currentTime;
      this.drawCircle(this.duration, this.currentTime);
      // console.log(this.duration);
    });
    this.$refs.audio.addEventListener("ended", () => {
      // console.log("下一曲");
      this.nextsong();
    });
    // this.$refs.audio.addEventListener("timeupdate", () => {
    //   var _this = this;
    //   var i = this.Lyric.findIndex((element) => {
    //     return element.time > _this.currentTime;
    //   });
    //   if (i == -1) {
    //     i = this.Lyric.length;
    //   }
    //   this.LyricI = i;
    // });
  },
  methods: {
    drawCircle: function (n, m) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.arc(25, 25, 21, Math.PI * -0.5, Math.PI * ((m / n) * 2 - 0.5), false);
      ctx.strokeStyle = "yellow";
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.closePath();
    },
    toggleState: function () {
      if (this.paused) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    nextsong: function () {
      this.$emit("update:NCurrentMusic", this.newlist[this.nextIndex]);
    },
    provioussong: function () {
      this.$emit("update:provioussong", this.newlist[this.proviousIndex]);
    },
  },
  computed: {
    nextIndex: function () {
      let index = this.newlist.findIndex((item) => {
        return item.id == this.currentMusic.id;
      });
      index++;
      if (index > this.newlist.length - 1) {
        index = 0;
      }
      return index;
    },
    proviousIndex: function () {
      let index = this.newlist.findIndex((item) => {
        return item.id == this.currentMusic.id;
      });
      index--;
      if (index < 0) {
        index = this.newlist.length - 1;
      }
      return index;
    },
  },
  watch: {
    paused: function (n) {
      this.$emit("update:paused", n);
    },
    currentTime: function () {
        var _this = this;
        var i = this.Lyric.findIndex((element) => {
          return element.time > _this.currentTime;
        });
        if (i == -1) {
          i = this.Lyric.length;
        }
        this.LyricI = i;
        console.log(i);
    },
  },
};
</script>

<style lang="less">
.play-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  background-color: white;
  .barfooter {
    display: flex;
    width: 100%;
    height: 50px;
    box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.2);
    .imgbig {
      background-color: #242424;
      position: relative;
      width: 50px;
      border-radius: 50%;
      overflow: hidden;
      .img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 35px;
        border-radius: 50%;
        overflow: hidden;
        animation: rotate 9s linear infinite;
        img {
          display: block;
          width: 100%;
        }
        &.paused {
          animation-play-state: paused;
        }
      }
    }
    .tagglebutton {
      position: relative;
      .pause {
        background: url("../assets/pause.png") no-repeat;
      }
      .play {
        background: url("../assets/player.png") no-repeat;
      }
      .play,
      .pause {
        width: 40px;
        height: 40px;
        background-size: 40px;
        background-position: 1px 0px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: palegreen;
      }
    }

    h4 {
      margin: 0;
      flex: 1;
      line-height: 50px;
      margin-left: 10px;
    }
    span {
      width: 50px;
      height: 50px;
    }
  }
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
audio {
  width: 100%;
  height: 30px;
  display: none;
}
.play-detail {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  background: linear-gradient(
    to right,
    rgb(56, 56, 56),
    rgb(95, 95, 95),
    rgb(56, 56, 56)
  );
  .mask {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px) brightness(0.6);
  }
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>