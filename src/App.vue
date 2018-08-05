<template>
  <div id="app">
    <good-header></good-header>
    <router-view/>
    <good-fooder></good-fooder>
  </div>
</template>

<script>
import goodFooder from './components/Fooder'
import goodHeader from './components/Header'
export default {
  components:{
    goodFooder,
    goodHeader
  }
}
</script>

<style>

</style>
