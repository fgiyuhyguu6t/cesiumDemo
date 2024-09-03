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

    // viewer.camera.setView({
    //     destination: Cesium.Cartesian3.fromDegrees(-75, 40, 50000),
    // })

    // 颜色材质
    const color = Cesium.Color.BLUE.withAlpha(0.5);
    const colorMaterial = new Cesium.ColorMaterialProperty(color);
    // 贴图材质
    const imgURL='../../public/img/checkerboard.png';
    const imgMaterial= new Cesium.ImageMaterialProperty({
        image:imgURL,
        repeat:new Cesium.Cartesian2(4,4),
        // color:Cesium.Color.BLUE,
    })
    // 棋盘纹理
    var checkerboardMaterial = new Cesium.CheckerboardMaterialProperty({
      evenColor: Cesium.Color.RED,
      oddColor: Cesium.Color.BLACK,
      repeat: new Cesium.Cartesian2(4, 4),
    });
    // 条纹纹理
    var stripeMaterial = new Cesium.StripeMaterialProperty({
      orientation: Cesium.StripeOrientation.VERTICAL,
      evenColor: Cesium.Color.WHITE,
      oddColor: Cesium.Color.BLACK,
      repeat: 16,
    });
    // 网格
    var gripMaterial = new Cesium.GridMaterialProperty({
      color: Cesium.Color.YELLOW,
      cellAlpha: 0.5,
      lineCount: new Cesium.Cartesian2(8, 8),
      lineThickness: new Cesium.Cartesian2(2.0, 2.0),
      lineOffset: new Cesium.Cartesian2(0.0, 0.0),
    });
    // 椭圆
    
    const ellipse=viewer.entities.add({
        position:Cesium.Cartesian3.fromDegrees(-75.2,42,10),
        ellipse:{
            semiMajorAxis:500,
            semiMinorAxis:500,
            material:gripMaterial,
            // material:colorMaterial,
        }
    })
    // viewer.zoomTo(ellipse)
    
    // 多线段-发光材质
    var glowingLine = viewer.entities.add({
      name: "Glowing blue line on the surface",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
        width: 10,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.8,//一个数字属性，用于指定发光强度，以总线宽的百分比表示
          taperPower: 0.5,//一个数字属性，指定渐缩效果的强度，以占总线长的百分比表示。如果为1.0或更高，则不使用锥度效果。
          color: Cesium.Color.CORNFLOWERBLUE,
        }),
      },
    });
     // 多线段-带有箭头
     var purpleArrow = viewer.entities.add({
      name: "Purple straight arrow at height",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -75,
          43,
          500000,
          -125,
          43,
          500000,
        ]),
        width: 10,
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE),
      },
    });
    // 多线段-短划线
    var dashedLine = viewer.entities.add({
      name: "Blue dashed line",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -75,
          45,
          500000,
          -125,
          45,
          500000,
        ]),
        width: 4,
        material: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.CYAN,
        }),
      },
    });
    viewer.zoomTo(purpleArrow)
    

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
