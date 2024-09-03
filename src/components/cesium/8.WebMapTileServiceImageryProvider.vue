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
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            // url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=6a7f8c44badb0594bf701c55fcec3754',
            // layer: 'img',
            // style: 'default',
            // format: 'tiles',
            // tileMatrixSetID: 'w',
            // maximumLevel: 18,
            // credit: new Cesium.Credit('© Tianditu', 'http://www.tianditu.gov.cn/')
            url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=6a7f8c44badb0594bf701c55fcec3754",
            layer: "tdtAnnoLayer",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible",
        })

    })
    // 隐藏logo信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    // 纽约坐标
    // viewer.camera.setView({
    //     destination: new Cesium.Cartesian3(1332761, -4662399, 4138888),
    //     orientation: {
    //         heading: 0.60,
    //         pitch: -0.66
    //     }
    // })

    // viewer.camera.setView({
    //     destination: Cesium.Cartesian3.fromDegrees(-75, 40, 50000),
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
