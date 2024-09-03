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

    // var geojsonOptions = {
    //     clampToGround: true//贴地
    // };
    // 阿里中国区
    // 方法1
    // var neighborhoodsPromise = Cesium.GeoJsonDataSource.load('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json', geojsonOptions);
    // var neighborhoods;
    // neighborhoodsPromise.then(function (dataSource) {
    //     viewer.dataSources.add(dataSource);
    //     neighborhoods = dataSource.entities;

    //     // 获取enity列表遍历
    //     var neighborhoodEntities = dataSource.entities.values;

    //     for (var i = 0; i < neighborhoodEntities.length; i++) {
    //         var entity = neighborhoodEntities[i];

    //         if (Cesium.defined(entity.polygon)) {
    //             // 设置每个entity的name属性和行政区的名称相同
    //             // entity.name = entity.properties.name;

    //             entity.polygon.material = Cesium.Color.fromRandom({ // 通过ColorMaterialProperty设置随机颜色Color，而不是把所有的区域都设置成一样的颜色。
    //                 red: 0.1,
    //                 maximumGreen: 0.5,
    //                 minimumBlue: 0.5,
    //                 alpha: 0.6
    //             });
    //         }
    //     }
    // });
    // 方法2
    // 加载geojson数据
    let dataGeo = Cesium.GeoJsonDataSource.load(
        "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
        //设置样式
        {
            stroke: Cesium.Color.RED,//折线和多边形轮廓的默认颜色
            fill: Cesium.Color.SKYBLUE.withAlpha(0.5),//获取或设置多边形内部的默认颜色
            strokeWidth: 4,//获取或设置折线和多边形轮廓的默认宽度
        }
    );
    // viewer.dataSources.add(dataGeo);//可直接进行添加数据
    //dataGeo Promise对象加载完毕后执行
    dataGeo.then((dataSources) => {
        // console.log(dataSources);
        viewer.dataSources.add(dataSources);
        // 获取datasources中的实体
        let entities = dataSources.entities.values;
        //获取每一个实体
        entities.forEach((entity, i) => {
            //设置随机颜色
            entity.polygon.material = new Cesium.ColorMaterialProperty(
                Cesium.Color.fromRandom({
                    alpha: 1,
                })
            );
            entity.polygon.outline = false;
            //随机高度（5个级别）
            let randomNum = parseInt(Math.random() * 5);
            //挤出高度
            entity.polygon.extrudedHeight = 100000 * randomNum;
        });
    });


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
