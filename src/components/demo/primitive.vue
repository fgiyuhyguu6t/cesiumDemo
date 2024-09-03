<template>
    <div id="cesiumContainer"></div>
</template>
  
<script lang='ts' setup>
import { onMounted, ref, watch } from 'vue'
import * as Cesium from 'cesium'
import {

    boxGeometryprimitive, boxGeometryprimitive2,
    CylinderGeometry, addCylinderGeometry, addCylinderOutlineGeometry,
    addCircleOutlineGeometry, addCircleGeometry,
    RectangleGeometry,
    clickmoodel2,
getposition
} from './hooks'

import {sky} from './hooks/environment/sykbox.ts'


// let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
// 118.120679, 24.515347,100,
// 118.130679, 24.515347,100
// ])
// const primitive= boxGeometryprimitive()
// const primitive2= boxGeometryprimitive2()

// 圆柱
// const primitive= CylinderGeometry()
// const primitive= addCylinderGeometry()
// const primitive= addCylinderOutlineGeometry()
// 圆
const primitive = addCircleGeometry()
// const primitive= addCircleOutlineGeometry()
// 
// 地球表面
// const primitive = RectangleGeometry()

onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

    const position = Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 80000)
    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
        destination: position
    })

    viewer.scene.primitives.add(primitive)

    // sky(viewer)
    getposition(viewer)



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
  