<template>
  <div class="h4">
    <h4><slot></slot></h4>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.h4 {
  border-left: 3px solid red;
  padding-left: 10px;
  h4 {
    font-weight: 400;
    font-size: 17px;
    margin-bottom: 16px;
  }
}
</style>