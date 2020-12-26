<template>
  <div class="DetailHeaderBox">
    <div class="DetailHeaderMain">
      <div
        class="DetailHeaderImg"
        :style="'background-image: url(' + detailListHeader.coverImgUrl + ')'"
      >
        <span class="left">歌单</span>
        <span class="right">{{ NewNum }}</span>
      </div>
      <div class="text">
        <h2>{{ detailListHeader.name }}</h2>

        <div>
          <div class="nickname">
            <div
              class="iconPortrait"
              :style="'background-image: url(' + avatarUrl + ')'"
            >
              <span></span>
            </div>
            {{ nickname }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="mask"
      :style="'background-image: url(' + detailListHeader.coverImgUrl + ')'"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["detailListHeader"],
  data() {
    return {
      nickname: "",
      avatarUrl: "",
    };
  },
  computed: {
    NewNum: function () {
      if (this.detailListHeader.playCount > 99999999) {
        return (this.detailListHeader.playCount / 100000000).toFixed(1) + "亿";
      } else if (this.detailListHeader.playCount > 9999) {
        return (this.detailListHeader.playCount / 10000).toFixed(1) + "万";
      } else {
        return this.detailListHeader.playCount;
      }
    },
  },
  watch: {
    "detailListHeader.creator": function (n) {
      //   console.log(n.nickname)
      this.nickname = n.nickname;
      this.avatarUrl = n.avatarUrl;
      //   detailListHeader.creator.avatarUrl
    },
  },
};
</script>

<style scoped lang="less">
.DetailHeaderBox {
  padding: 30px 10px 30px 15px;
  overflow: hidden;
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(20px);
    transform: scale(1.5);
  }
  .DetailHeaderMain {
    display: flex;
    z-index: 2;
    .DetailHeaderImg {
      width: 115px;
      height: 115px;
      background-size: cover;
      position: relative;
      z-index: 12;
      .left {
        position: absolute;
        z-index: 3;
        top: 10px;
        left: 0;
        padding: 0 8px;
        height: 17px;
        color: #fff;
        font-size: 9px;
        text-align: center;
        line-height: 17px;
        background-color: rgba(217, 48, 48, 0.8);
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
      }
      .right {
        position: absolute;
        top: 0;
        right: 2px;
        display: block;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
        padding-left: 15px;
        color: #fff;
        font-size: 12px;
        background-position: 0;
        background-repeat: no-repeat;
        background-size: 11px 10px;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
        z-index: 3;
      }
    }
    .text {
      flex: 1 1 auto;
      width: 1%;
      margin-left: 16px;
      z-index: 12;
      color: white;
      h2 {
        margin: 0;
        padding-top: 1px;
        font-size: 17px;
        // color: #fefefe;
        height: 44px;
        font-weight: 500;
        // display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
        // -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
        // text-overflow，可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > div {
        margin-top: 20px;
        font-size: 14px;
        color: #cccccc;
        .nickname {
          display: inline-block;
          .iconPortrait {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            // margin-right: 5px;
            border-radius: 50%;
            background-size: cover;
            position: relative;
            span {
              position: absolute;
              right: -5px;
              bottom: 0;
              width: 12px;
              height: 12px;
              background-image: url("https://s3.music.126.net/mobile-new/img/usericn_2x.png?6423c0681bfb3358d5c684c9b998e412=");
              background-position: -40px 0;
              background-repeat: no-repeat;
              background-size: 75px auto;
            }
          }
        }
      }
    }
  }
}
</style>