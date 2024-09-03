<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import * as Cesium from 'cesium'
import { CylinderGeometry, PolylineVolumeGeometry, SpolylineVolumeGeometry } from './hooks'

// 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// const radius = ref(2000)
// const length = ref(10000)

// let geometryccc =CylinderGeometry()

// 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111
let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
  104.341991, 21.917029, 600,
  104.341991, 22.817029, 600,
  104.341991, 22.817029, 600,
  104.841991, 22.817029, 600,
])
// let geometryccc = PolylineVolumeGeometry(ps)


// 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111
let l1 = Cesium.Cartesian3.fromDegreesArrayHeights([
  104.341991, 21.917029, 600,
  104.341991, 22.817029, 600,
])

let l2 = Cesium.Cartesian3.fromDegreesArrayHeights([
  104.341991, 22.817029, 600,
  104.841991, 22.817029, 600,
])

let l3 = Cesium.Cartesian3.fromDegreesArrayHeights([
  104.841991, 22.817029, 600,
  104.341991, 23.817029, 600,
])

const arrpoint = [[l1, 900], [l2, 500], [l3, 500],]
// const arrpoint = [[l1, 900], [l2,500],]

let geometryccc1 = SpolylineVolumeGeometry(arrpoint)

onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'
  const viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,//动画小部件
    // 加载别的图层
    // imageryProvider: new Cesium.IonImageryProvider({ assetId: 3812 }),
    baseLayerPicker: false,//地图图层组件
    fullscreenButton: false,//全屏组件
    geocoder: false,//地理编码搜索组件
    homeButton: false,//首页组件
    infoBox: false,//信息框
    sceneModePicker: false,//场景模式
    selectionIndicator: false,//选取指示器组件
    timeline: false,//时间轴
    navigationHelpButton: false,//帮助按钮
    navigationInstructionsInitiallyVisible: false,
    // terrainProvider: new Cesium.createWorldTerrain({
    //     requestVertexNormals: true, //开启地形光照
    //     requestWaterMask: true, // 开启水面波纹
    // }),
  })
  // 隐藏logo信息
  viewer._cesiumWidget._creditContainer.style.display = 'none'

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(104.831991, 22.817029, 500000),
    // destination: Cesium.Cartesian3.fromDegrees(-95.0, 43.0, 50000),
  })

  // viewer.scene.primitives.add(geometryccc);

  viewer.scene.primitives.add(geometryccc1);
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
