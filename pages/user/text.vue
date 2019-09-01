<template>
  <div>
    <div class="tab">
      <span
        v-for="(item,index) in ['我我','她她','他他']"
        :key="index"
        :class="{active:current===index}"
        @click="handleclick(index)"
      >{{ item }}</span>
    </div>

    <div v-show="current===0">
      <ul>
        <li>我我我</li>
        <li>我我我</li>
        <li>我我我</li>
      </ul>
    </div>

    <div v-show="current===1">
      <ul>
        <li>她她她</li>
        <li>她她她</li>
        <li>她她她</li>
      </ul>
    </div>

    <div v-show="current===2">
      <ul>
        <li>他他他</li>
        <li>他他他</li>
        <li>他他他</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 0
    }
  },
  methods: {
    handleclick (index) {
      this.current = index
    }
  }
}
</script>

<style lang="less">
.tab {
  cursor: pointer;
  span{
      padding-right: 10px
  }
}
.active {
  color: red;
}
</style>
