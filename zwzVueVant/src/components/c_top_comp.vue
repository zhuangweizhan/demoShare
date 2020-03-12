<template>
    <div @click="clickMess()"  class="comm_top" v-if="flag" >
        <img src="../assets/top.png"  />
    </div>
</template>

<script>
export default {
    name: 'cTop',
    methods: {
        clickMess: function(){
            window.scrollTo(0,0);
        }
    }
}
</script>
<style scoped>
.comm_top {
  position: fixed;
  right: 20px;
  bottom: 10vh;
}
.comm_top img {
  width: 40px;
  height: 40px;
}
</style>
