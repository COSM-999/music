<template>
  <ul id="home-nav">
    <li><router-link to="/playlist">推荐音乐</router-link></li>
    <li><router-link to="/hotsong">热歌榜</router-link></li>
    <li><router-link to="/search">搜索</router-link></li>
    <!-- <li><router-link to="/list">List</router-link></li> -->
  </ul>
</template>

<script>
export default {};
</script>

<style lang='less'>
#home-nav {
  position: fixed;
  top: 110px;
  left: 0;
  display: flex;
  width: 100%;
  font-size: 15px;
  border-bottom: 1px solid #cccc;
  background-color: white;
  box-sizing: border-box;
  z-index: 1000;
  li {
    width: 33.33vw;
    line-height: 40px;
    text-align: center;
    box-sizing: border-box;
    a {
      line-height: 40px;
      display: inline-block;
      -webkit-tap-highlight-color: transparent;
      
      &.router-link-active {
        color: red;
        position: relative;
        // border-bottom: 3px solid red;
        &::after{
          content: "";
          position: absolute;
          height: 3px;
          width: 100%;
          background-color: red;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}
</style>