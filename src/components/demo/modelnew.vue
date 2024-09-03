<template>
    <div id="cesiumContainer"></div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref, watch, onBeforeUpdate } from 'vue'
import * as Cesium from 'cesium'

onMounted(() => {
    // Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNmI0MDRkZi04NzhjLTQyYmMtYjQxOC1iNzc2MDA1MmM4ZjIiLCJpZCI6OTAwMTAsImlhdCI6MTY1MDA3NTM0MX0.mGMDeDFon6i_AOEfTs3pEq30wRCipCWL3O-bzLHswtw';
    const viewer = new Cesium.Viewer('cesiumContainer')
    // viewer.camera.setView({
    //     destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 50000),
    // })
  
})
</script>
<style scoped>
#cesiumContainer {
    /* width: 100%;
    height: 100%; */
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
  