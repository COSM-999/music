<template>
  <div id="app">
    <div v-show="isLoading" class="loadbox">
      <div class="loading"></div>
    </div>
    <Detail
      v-if="!$route.meta.isShowNav"
      @update:identifierRMusic="identifier = $event"
      @update:playListDetail="currentMusic = $event"
      @update:playList="newlist = $event"
      @update:detailhIsLoading="isLoading = $event"
      :currentMusic="currentMusic"
      :paused="paused"
    />
    <div class="pic" v-if="$route.meta.isShowNav"></div>
    <HomeNav v-if="$route.meta.isShowNav" />
    <transition name="component-fade" mode="out-in">
      <Play
        v-if="currentMusic"
        :currentMusic="currentMusic"
        :newlist="newlist"
        :identifier="identifier"
        :Lyric="Lyric"
        @update:paused="paused = $event"
        @update:NCurrentMusic="currentMusic = $event"
        @update:provioussong="currentMusic = $event"
      ></Play>
    </transition>
    <keep-alive>
      <router-view
        @update:music="currentMusic = $event"
        @update:identifierNMusic="identifier = $event"
        @update:identifierHMusic="identifier = $event"
        @update:identifierSMusic="identifier = $event"
        @update:list="newlist = $event"
        @update:hotmusic="currentMusic = $event"
        @update:hotlist="newlist = $event"
        @update:hotSearchList="
          currentMusic = $event[0];
          newlist = $event[1];
        "
        :currentMusic="currentMusic"
        :paused="paused"
        @update:isLoading="isLoading = $event"
        @update:hotSongIsLoading="isLoading = $event"
        @update:searchIsLoading="isLoading = $event"
      />
    </keep-alive>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav.vue";
import Play from "@/components/Play.vue";
import Detail from "@/views/Detail.vue";
export default {
  components: {
    HomeNav,
    Play,
    Detail,
  },
  data() {
    return {
      currentMusic: null,
      paused: null,
      newlist: [],
      Lyric: [],
      identifier: "",
      isLoading: "",
    };
  },
  methods: {
    paresLyric: function (lyric) {
      var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      var arr = lyric
        .split("\n")
        .filter((e) => e)
        .map((str) => {
          var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
          var timeArr = time.split(":");
          time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
          var text = str.replace(patt, "");
          if (text == "") {
            text = "...";
          }
          return { time, text };
        });
      return arr;
    },
  },
  watch: {
    currentMusic: function () {
      this.axios.get("lyric?id=" + this.currentMusic.id).then((response) => {
        // console.log(this.paresLyric(response.data.lrc.lyric));
        this.Lyric = this.paresLyric(response.data.lrc.lyric);
      });
    },
  },
};
</script>

<style  lang="less">
body,
html {
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  margin: 0;
  position: relative;
  .loadbox {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading {
      display: inline-block;
      width: 1em;
      height: 1em;
      vertical-align: middle;
      border: 0.2em solid transparent;
      border-top-color: red;
      border-radius: 50%;
      -webkit-animation: 1s loading linear infinite;
      animation: 1s loading linear infinite;
      position: relative;
      &::before {
        content: "";
        display: block;
        width: inherit;
        height: inherit;
        position: absolute;
        top: -0.2em;
        left: -0.2em;
        border: 0.2em solid white;
        border-radius: 50%;
        opacity: 0.5;
      }
    }
  }
  .pic {
    position: fixed;
    top: 0;
    width: 100%;
    height: 110px;
    background-color: white;
    z-index: 100;
  }
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: black;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
