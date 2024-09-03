<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import { CylinderGeometry } from './hooks'
onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'
    
    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(118.120679,24.515347, 50000),
  })
    // viewer.scene.primitives.add(primitive);
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
  