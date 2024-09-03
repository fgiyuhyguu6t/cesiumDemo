<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import { particle } from '../demo/hooks/ParticleSystem/ParticleSystem'
import { ParticleSystemgravity } from '../demo/hooks//ParticleSystem/ParticleSystemgravity'

//cesium初始化必须写在mounted生命周期里面，否则会报错"Element with id "cesiumContainer" does not exist in the document."
onMounted(() => {
  // const custom = new Cesium.ArcGisMapServerImageryProvider({
  //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
  // })
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

  const viewer = new Cesium.Viewer('cesiumContainer', {
    // animation: false,//动画小部件
    // timeline: false,//时间轴
    // 加载别的图层
    // imageryProvider: new Cesium.IonImageryProvider({ assetId: 3812 }),
    baseLayerPicker: false,//地图图层组件
    shouldAnimate: true,//打开动画效果
    // fullscreenButton: false,//全屏组件
    // geocoder: false,//地理编码搜索组件
    // homeButton: false,//首页组件
    // // infoBox: false,//信息框 //弹窗
    // sceneModePicker: false,//场景模式
    // selectionIndicator: false,//选取指示器组件
    // navigationHelpButton: false,//帮助按钮
    // navigationInstructionsInitiallyVisible: false,
    // terrainProvider: Cesium.createWorldTerrain(),
    // terrainProvider: new Cesium.createWorldTerrain({
    //     requestVertexNormals: true, //开启地形光照
    //     requestWaterMask: true, // 开启水面波纹
    // }),

  })
  // 隐藏logo信息
  viewer._cesiumWidget._creditContainer.style.display = 'none'

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.477, 39.93, 1000),
    orientation: {
      heading: 0.90,
      pitch: -0.66
    }
    // destination: Cesium.Cartesian3.fromDegrees(116.45, 39.9, 753),
  })

  // let particle =ParticleSystemgravity(viewer)
  // viewer.scene.primitives.add(particle)


  let particlefire = particle()
  viewer.scene.primitives.add(particlefire)
})
</script>
<!-- modelMatrix: computeModelMatrix(entity, Cesium.JulianDate.now()) -->

<style scoped>
#cesiumContainer {
  /* width: 100%;
    height: 100%; */
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
