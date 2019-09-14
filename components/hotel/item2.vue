<template>
  <div>
      我是子组件
      <span>{{name}}</span>
  </div>
</template>

<script>
export default {
    data(){
        return {
            name:'儿子'
        }
    },
mounted(){
    this.$emit('myclick',this.name)
}
}
</script>

<style>

</style>