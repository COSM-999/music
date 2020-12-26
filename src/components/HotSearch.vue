<template>
  <span @click="$emit('update:changeState', item.first)">{{ item.first }}</span>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped lang="less">
span {
  display: inline-block;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 15px;
  border: 1px solid #d3d4da;
  margin: 5px;
  font-size: 14px;
  color: #333333;
}
</style>