<template>
  <li
    class="songlistli"
    @click="
      $emit('update:hotSearchList', item),
        $emit('update:identifierSMusic', identifier)
    "
  >
    <div class="eachli">
      <h4>{{ item.name }}</h4>
      <p>
        <i></i>
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
  </li>
</template>

<script>
export default {
  props: ["item","paused","currentMusic"],
  data() {
    return {
      identifier: "SMusic",
    };
  },
};
</script>

<style>
</style>