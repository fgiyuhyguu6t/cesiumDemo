<template>
    <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'

//cesium初始化必须写在mounted生命周期里面，否则会报错"Element with id "cesiumContainer" does not exist in the document."
onMounted(() => {
    // var custom = new Cesium.ArcGisMapServerImageryProvider({
    //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    // })
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

    const viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false,//动画小部件
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
        terrainProvider: new Cesium.createWorldTerrain({
            requestVertexNormals: true, //开启地形光照
            requestWaterMask: true, // 开启水面波纹
        }),
    })
    // 隐藏logo信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    // 纽约坐标
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(1332761, -4662399, 4138888),
        orientation: {
            heading: 0.60,
            pitch: -0.66
        }
    })
    // 从czml文件加载飞行路径
      var dronePromise = Cesium.CzmlDataSource.load('../../public/sampleFlight.czml');

    // 无人机实体
    var drone;
    dronePromise.then(function(dataSource){
      viewer.dataSources.add(dataSource);
      drone = dataSource.entities.getById('Aircraft/Aircraft1');
      drone.model = {
        uri:'../../public/Models/ferrari2.gltf',
        // uri:'../../public/Models/CesiumDrone.gltf',
        minimumPixelSize:100,//
        maximumScale:200,
        silhouetteColor:Cesium.Color.WHITE,
        silhouetteSize:2
      }

      drone.orientation = new Cesium.VelocityOrientationProperty(drone.position);
      drone.viewFrom = new Cesium.Cartesian3(0,-30,30)
      viewer.clock.shouldAnimate = true;
    })


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
