<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'


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
    // fullscreenButton: false,//全屏组件
    // geocoder: false,//地理编码搜索组件
    // homeButton: false,//首页组件
    // // infoBox: false,//信息框 //弹窗
    // sceneModePicker: false,//场景模式
    // selectionIndicator: false,//选取指示器组件
    // navigationHelpButton: false,//帮助按钮
    // navigationInstructionsInitiallyVisible: false,
    // terrainProvider: new Cesium.createWorldTerrain({
    //     requestVertexNormals: true, //开启地形光照
    //     requestWaterMask: true, // 开启水面波纹
    // }),

  })
  // 隐藏logo信息
  viewer._cesiumWidget._creditContainer.style.display = 'none'
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-75, 40, 1550),
    // destination:new Cesium.Cartesian3(1332761, -4662399, 4138888),
  })

  var tileset=new Cesium.Cesium3DTileset({ url:'http://192.168.9.212/3dtiles/xhh_1116/tileset.json'})
  // var tileset=new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) })
  var city = viewer.scene.primitives.add(tileset);
  tileset.readyPromise.then(tiles=>{viewer.zoomTo(tiles)}
  )
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
