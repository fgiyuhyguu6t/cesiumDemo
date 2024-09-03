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
        terrainProvider: new Cesium.createWorldTerrain({
            requestVertexNormals: true, //开启地形光照
            requestWaterMask: true, // 开启水面波纹
        }),
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
    async function addGLTFModel(url, height) {
        // Entity方法加载gltf
        viewer.entities.removeAll() //加载之前先清楚所有entity
        const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height)
        const heading = Cesium.Math.toRadians(135) //135度转弧度
        const pitch = Cesium.Math.toRadians(0);
        const roll = 0
        const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(
            position,
            hpr
        )
        const entity = await viewer.entities.add({
            name: 'feiji',
            position: position,
            orientation: orientation,
            model: {
                uri: url,//注意entitits.add方式加载gltf文件时，这里是uri，不是url，并且这种方式只能加载.glb格式的文件
                minimumPixelSize: 128,//最小像素大小，可以避免太小看不见
                maximumScale: 20000,//模型的最大比例尺大小。minimumPixelSize的上限  
                scale: 1.0,//缩放比例
                incrementallyLoadTextures: true,//加载模型后纹理是否可以继续流入
                runAnimations: true,//是否启动模型中制定的gltf动画
                clampAnimations: true,//制定gltf动画是否在没有关键帧的持续时间内保持最后一个姿势
                shadows: Cesium.ShadowMode.ENABLED,
                heightReference: Cesium.HeightReference.NONE
            }
        })
        viewer.trackedEntity = entity; // 聚焦模型
        viewer.zoomTo(entity)
    }
    addGLTFModel('../../public/Models/circle2.glb',0)
    // addGLTFModel('../../public/Models/ferrari2.gltf',0)

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
