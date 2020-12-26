<template>
  <div class="PlayMusicLyric" @click="$emit('taggleC')">
    <ul
      ref="LyricUl"
      :style="'margin-top: calc( ' + sum * -1 + 'px + 34.5vh )'"
    >
      <PlayMusicLyricLi
        v-for="(item, index) in Lyric"
        :key="index"
        :item="item"
        :index="index"
        ref="Ly"
      />
    </ul>
  </div>
</template>

<script>
import PlayMusicLyricLi from "@/components/PlayMusicLyricLi.vue";
export default {
  components: {
    PlayMusicLyricLi,
  },
  props: ["Lyric", "LyricI", "currentTime"],
  data() {
    return {
      sum: 0,
      // forward:0,
      // text: "calc( 34.5vh )",
      LyricComponents: [],
    };
  },
  watch: {
    LyricI: function () {
      console.log(this.LyricI);
      if (!this.$refs.Ly) {
        return;
      }
      // if (this.LyricI >= 1) {
      // this.$refs.LyricUl.children.forEach
      // console.log(tt)
      // }
      // this.play()
      this.LyricComponents = this.$refs.Ly;
      // console.log(this.LyricComponents)
      // this.$refs.LyricUl.style.marginTop =
      //   "calc(" + -1 * this.sum + "px + " + "34.5vh)";
      // this.text = 'calc(" + -1 * this.sum + "px + " + "34.5vh)';
      // let _this = this;

      // console.log(tt)
      // var each = 0;
      // tt.forEach((item) => {
      //   // console.log(item.$el.offsetHeight)
      //   each += item.$el.offsetHeight;
      //   // this.forward=item.$el.offsetHeight
      //   // console.log(this.sum)
      // });
      // this.sum = each;
      // console.log(this.$refs.LyricUl.children[this.LyricI - 1]);
      // console.log(this.$refs.LyricUl.children);
    },
    sumall: function () {
      this.sum = this.sumall;
    },
  },
  computed: {
    sumall: function () {
      var each = 0;
      let _this = this;
      let tt = this.LyricComponents.filter((item, index) => {
        return index < _this.LyricI;
      });
      tt.forEach((item) => {
        // console.log(item.$el.offsetHeight)
        each += item.$el.offsetHeight;
        // this.forward=item.$el.offsetHeight
        // console.log(this.sum)
      });
      return each;
    },
  },
  mounted() {
    // this.LyricComponents = this.$refs.Ly;
    // console.log(this.LyricComponents);
    // this.$nextTick(function () {
    // console.log(this.$refs.LyricUl.children)
    // this.$refs.fos.focus();
    // })
    // this.$refs.LyricUl.style.marginTop = this.text;
  },
};
</script>

<style scoped lang="less">
.PlayMusicLyric {
  text-align: center;
  height: 69vh;
  overflow: hidden;
  color: white;
  font-weight: 300;
  // overflow: scroll;
  ul {
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-top: 34.5vh;
  }
}
</style>