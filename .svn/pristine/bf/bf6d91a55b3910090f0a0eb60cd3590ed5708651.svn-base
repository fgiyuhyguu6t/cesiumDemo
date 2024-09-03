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
        animation: false,//动画小部件
        // 加载别的图层
        // imageryProvider: new Cesium.IonImageryProvider({ assetId: 3812 }),
        baseLayerPicker: false,//地图图层组件
        fullscreenButton: false,//全屏组件
        geocoder: false,//地理编码搜索组件
        homeButton: false,//首页组件
        // infoBox: false,//信息框 //弹窗
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

    // viewer.camera.setView({
    //     destination: Cesium.Cartesian3.fromDegrees(-75, 40, 50000),
    // })

    const plane = viewer.entities.add({
      id:'planeLogo',
      position:Cesium.Cartesian3.fromDegrees(-75.2,40,10),
      plane:{
        plane:new Cesium.Plane(Cesium.Cartesian3.UNIT_Z,0.0),
        dimensions:new Cesium.Cartesian2(400,300),
        material:'../../public/img/checkerboard.png',
        outline:true,
        outlineColor:Cesium.Color.BLUE,
      },
      // 选中是显示信息
      description:`<div>7878979</div>`
    })

    viewer.zoomTo(plane)
    
    // 屏幕控制实例，使用场景里的元素
    var handler=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    // setInputAction监听事件（点击，移入）
    handler.setInputAction(function (movement) {
      // viewer.scene.pick 获取点击对象 scene.dirllpice对象列表，Globe.plick(光线和地形交点)
      var pick=viewer.scene.pick(movement.position);
      // 判断Cesium.defined(pick)是否为空。
      if(Cesium.defined(pick)&&(pick.id.id==='planeLogo')){
        alert('111')
      }
      // 鼠标抒发点击事件
    },Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // MOUSE_MOVE 移入事件 PIGHT_CLICK 右击
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
