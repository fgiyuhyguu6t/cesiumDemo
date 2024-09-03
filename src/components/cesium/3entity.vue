<template>
    <div id="cesiumContainer"></div>
</template>

<script lang="ts" setup>
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
    })
    // 隐藏logo信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'

    // 实体 entity
    // const point = new Cesium.Entity({
    //     position:Cesium.Cartesian3.fromDegrees(109.4776560,36.6517925),
    //     point:{
    //         pixelSize:20,
    //         color:Cesium.Color.BLUE,
    //     }
    // })
    // // 添加到地图里
    // viewer.entities.add(point)
    // viewer.zoomTo(point)//地图跳转

    // 写法二
    //    const point2= viewer.entities.add({
    //         id:'point',
    //         position:Cesium.Cartesian3.fromDegrees(140,30),
    //         point:{
    //             pixelSize:20,
    //             color:Cesium.Color.BLUE
    //         }
    //     })
    //     console.log("point",point2);
    
    // 图片坐标
    // const billboard=viewer.entities.add({
    //     position:Cesium.Cartesian3.fromDegrees(-75,60,10),
    //     billboard:{
    //         image:'../../public/img/position.png',
    //         scale:0.1,
    //         color:Cesium.Color.BLUE
    //     }
    // })
    // 文字
    // const label =viewer.entities.add({
    //     position:Cesium.Cartesian3.fromDegrees(-75,40,10),
    //     label:{
    //         text:"cesium",
    //         fillColor:Cesium.Color.YELLOWGREEN,//变量
    //         showBackground:true,
    //         backgroundColor:new Cesium.Color(255,0,0),//实例化类

    //     }
    // })
    // 线
    // const polyline=viewer.entities.add({
    //     polyline:{
    //         positions:Cesium.Cartesian3.fromDegreesArray([-75,41,-75,40.5,-75.5,40.5]),
    //         width:10,
    //         material:Cesium.Color.YELLOWGREEN,
    //     }
    // })
    // viewer.zoomTo(polyline)

    let heightAA = 1050;
    let thickness = 80;
    const polyLV = viewer.entities.add({
        name: "高亮墙",
        polylineVolume: {
            //   positions: Cesium.Cartesian3.fromDegreesArrayHeights(newArr),
            positions: Cesium.Cartesian3.fromDegreesArray([-75.5, 41, -75.5, 40.5, -76.5, 40.5]),
            shape: [  // 截面形状
                new Cesium.Cartesian2(-1 * thickness, -0.5 * heightAA),
                new Cesium.Cartesian2(1 * thickness, -0.5 * heightAA),
                new Cesium.Cartesian2(thickness, 0.5 * heightAA),
                new Cesium.Cartesian2(-1 * thickness, 0.5 * heightAA),
            ],
            // shape: [
            //     new Cesium.Cartesian2(-1000, 0),
            //     new Cesium.Cartesian2(1000, 0),
            //     new Cesium.Cartesian2(2000, 1734),
            //     new Cesium.Cartesian2(0, 3734),
            //     new Cesium.Cartesian2(-2000, 1700)
            // ],
            //   zIndex:999,
            material: Cesium.Color.fromCssColorString("#4ABAE9"),
            cornerType: Cesium.CornerType.MITERED,  // 线段转折处样式
        }
    })
    viewer.zoomTo(polyLV)

    // 
    // let height=3000
    // const polygon=viewer.entities.add({
    //     polygon:{
    //         hierarchy:{
    //             positions:Cesium.Cartesian3.fromDegreesArray([-75.5,41,-75.5,40.5,-76.5,40.5]),
    //             // holes:
    //         },
    //         // height:20,//离地
    //         extrudedHeight:new Cesium.CallbackProperty(()=>{return height},false),//高
    //         // extrudedHeight:1000,//高
    //         material:Cesium.Color.YELLOWGREEN,
    //         outline:true,
    //         outlineColor:Cesium.Color.WHITE,//描边
    //         // fill:false,//填充
    //     }
    // })
    // setInterval(()=>{
    //     height+=100
    // },1000)

    // box
    // const box=viewer.entities.add({
    //     position:Cesium.Cartesian3.fromDegrees(-75,42,10),
    //     box:{
    //         dimensions:new Cesium.Cartesian3(2000,3000,1000),
    //         material:Cesium.Color.BLUEVIOLET,
    //     }
    // })
    // const ellipse=viewer.entities.add({
    //     position:Cesium.Cartesian3.fromDegrees(-75.2,42,10),
    //     ellipse:{
    //         semiMajorAxis:500,
    //         semiMinorAxis:500,
    //     }
    // })
    // const rectangle=viewer.entities.add({
    //     rectangle:{
    //         coordinates:Cesium.Rectangle.fromDegrees(120,40,123,45),
    //         extrudedHeight:20000,
    //         height:10000,
    //         // material:Cesium.Color.BLUEVIOLET,
    //         material:'../../public/img/earthquake-fill.png',
    //     }
    // })


    // viewer.zoomTo(polygon)

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
