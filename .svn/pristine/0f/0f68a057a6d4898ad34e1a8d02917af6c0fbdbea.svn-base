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
        // options这里是配置项
        // imageryProvider: custom,// 设置图像提供的程序
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
        // 地形相关
        // terrain: Cesium.Terrain.fromWorldTerrain(), // 地形数据
        terrainProvider: Cesium.createWorldTerrain(),
        // terrainProvider:new Cesium.createWorldTerrain({
        //     requestVertexNormals: true, //开启地形光照
        //     requestWaterMask: true, // 开启水面波纹
        // }),
    })

    // 隐藏logo信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    // 经纬度转笛卡尔xyz 这不代表高度
    // const Cartesian1 = Cesium.Cartesian3.fromDegrees(86.889, 27.991, 10000)
    // const Cartesian2 = Cesium.Cartesian3.fromDegrees(100, 200, 300)
    // console.log("Cartesian1", Cartesian1);
    // console.log("Cartesian1", Cartesian2);

    // // xyz转弧度
    // const a = Cesium.Cartographic.fromCartesian(Cartesian1)
    // console.log("a1", a);
    //  //方法1 弧度转经纬
    //  let longitude = 180 / Math.PI * a.longitude
    //  let latitude = 180 / Math.PI * a.latitude
    //  console.log('经纬度:', longitude, latitude, a.height);
    //  //方法2 封装弧度转经纬
    //  let longitude1 = Cesium.Math.toDegrees(a.longitude)
    //  let latitude1 =  Cesium.Math.toDegrees(a.latitude)
    //  console.log('封装转经纬度1:', longitude1, latitude1, a.height);



    // viewer.scene.globe.show=false;//globe 地球show

    // var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(3839) }));

    //     //相机飞到珠穆朗玛峰
    //   viewer.camera.flyTo({
    //       destination: Cesium.Cartesian3.fromDegrees(86.889, 27.991, 10000),
    //       orientation:{
    //           pitch:Cesium.Math.toRadians(-45)
    //       }
    //   });

    // 相机
    viewer.camera.setView({
        // destination: Cesium.Cartesian3.fromDegrees(118.6300130,25.1089021,2500),
        // destination: Cesium.Cartesian3.fromDegrees(109.5006885,36.6318405, 2500),
        destination: Cesium.Cartesian3.fromDegrees(-74.01881302800248, 40.69114333714821, 753),
        endTransform: Cesium.Matrix4.IDENTITY,
        // destination: Cesium.Cartesian3.fromDegrees(113.318977, 23.114155, 2000),
        // destination: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 2000),//广州塔
        // 方向、俯视和仰视的视角
        orientation: {
            heading: Cesium.Math.toRadians(90),//方位
            // pitch: Cesium.Math.toRadians(-90)//仰 俯
        }
    })
    // viewer.camera.setView({
    //     // (xyz)
    //   destination:new Cesium.Cartesian3(1332761,-4662399,4137888),
    //   orientation:{
    //     heading:0.60,
    //     pitch:-0.66
    //   }
    // })

    // 载入官方资源
    // var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({url:Cesium.IonResource.fromAssetId(3839)}));


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
