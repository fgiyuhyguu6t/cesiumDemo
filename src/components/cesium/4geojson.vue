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
        // terrainProvider: new Cesium.createWorldTerrain({
        //     requestVertexNormals: true, //开启地形光照
        //     requestWaterMask: true, // 开启水面波纹
        // }),
    })
    // 隐藏logo信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(1332761, -4662399, 4137888),
        orientation: {
            heading: 0.60,
            pitch: -0.66
        }
    })
    // 官方json  Cesium中加载3DTiles数据
    // var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) }));
    // 定义3d样式
    //    var heightStyle = new Cesium.Cesium3DTileStyle({
    //     color:{
    //       // 条件判断具体的颜色
    //       conditions:[
    //         ['${height} >= 300','rgba(45,0,75,0.5)'],
    //         ['${height} >= 200','rgb(102,71,151)'],
    //         ['${height} >= 100','rgba(170,162,204,0.5)'],
    //         ['${height} >= 50','rgba(224,226,238,0.5)'],
    //         ['${height} >= 25','rgba(252,230,200,0.5)'],
    //         ['${height} >= 10','rgba(248,176,87,0.5)'],
    //         ['${height} >= 5','rgba(198,106,11,0.5)'],
    //         ["true","rgb(127,59,8)"]
    //       ]
    //     }
    //   })
    //   city.style = heightStyle;
    // var defaultStyle = new Cesium.Cesium3DTileStyle({
    //     color: "color('gray', 0.5)", // 让建筑变透明
    //     show: true
    // });

    // city.style = defaultStyle;

    // var neighborhoodsPromise = Cesium.GeoJsonDataSource.load('../../public/img/sampleNeighborhoods.geojson', geojsonOptions);
    // 加载geojson数据
    // var neighborhoodsPromise = viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../../public/img/sampleNeighborhoods.geojson', {
    //     stroke: Cesium.Color.HOTPINK,
    //     fill: Cesium.Color.PINK,
    //     strokeWidth: 3,
    //     markerSymbol: '?'
    // }))
    // //GeoJSON是一种对各种地理数据结构进行编码的格式，基于Javascript对象表示法
    // //(JavaScript Object Notation, 简称JSON)的地理空间信息数据交换格式。
    // // GeoJSON对象可以表示几何、特征或者特征集合。
    // //GeoJSON支持下面几何类型：点、线、面、多点、多线、多面和几何集合
    // // 保存邻域数据的新实体集合
    // var neighborhoods;
    // neighborhoodsPromise.then((dataSource) => {
    //     // 将新数据作为实体添加到查看器
    //     viewer.dataSources.add(dataSource);
    //     neighborhoods = dataSource.entities;

    //     // Get the array of entities
    //     var neighborhoodEntities = dataSource.entities.values;
    //     for (var i = 0; i < neighborhoodEntities.length; i++) {
    //         var entity = neighborhoodEntities[i];

    //         if (Cesium.defined(entity.polygon)) {
    //             // Use kml neighborhood value as entity name
    //             entity.name = entity.properties.neighborhood;
    //             // Set the polygon material to a random, translucent color
    //             entity.polygon.material = Cesium.Color.fromRandom({
    //                 red: 0.1,
    //                 maximumGreen: 0.5,
    //                 minimumBlue: 0.5,
    //                 alpha: 0.6
    //             });
    //             // 告诉多边形为地形着色。 ClassificationType.CESIUM_3D_TILE 将为 3D 图块集着色，而 ClassificationType.BOTH 将为 3d 图块和地形着色（BOTH 是默认值）
    //             // Tells the polygon to color the terrain. ClassificationType.CESIUM_3D_TILE will color the 3D tileset, and ClassificationType.BOTH will color both the 3d tiles and terrain (BOTH is the default)
    //             entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
    //             // 生成多边形中心
    //             var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
    //             // 边界球
    //             var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
    //             // 椭球体
    //             polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
    //             entity.position = polyCenter;
    //             // 生成标签
    //             // entity.label = {
    //             //     text: entity.name,
    //             //     showBackground: true,
    //             //     scale: 0.6,
    //             //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    //             //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //             //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 8000.0),//范围
    //             //     disableDepthTestDistance: 100.0
    //             // };
    //         }
    //     }
    // });

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
