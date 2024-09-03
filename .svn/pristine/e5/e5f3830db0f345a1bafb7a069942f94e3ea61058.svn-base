<template>
  <div id="cesiumContainer"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import { rectangle, point } from '../demo/hooks/enitity/enititys.ts'
import { label, billboard } from '../demo/hooks/enitity/label'
import { polyline, tdpline } from '../demo/hooks/enitity/polyline'
import { polylinevolume, polylinevolume1 } from '../demo/hooks/enitity/polylinevolume'
import { geojson } from '../demo/hooks/geojson/geojson'
import { polylinematerialall } from '../demo/hooks/enitity/Ematerial'
import { CorridorGeometry } from '../demo/hooks/primitive/tdpolyline.ts'
import { polylinematerial } from '../demo/hooks/material/PolylineMaterialAppearance.ts'
import { PolylineGeometry } from '../demo/hooks'
import { maps, materialall } from '../demo/hooks/material/material.ts'

//cesium初始化必须写在mounted生命周期里面，否则会报错"Element with id "cesiumContainer" does not exist in the document."
onMounted(() => {
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

  viewer._cesiumWidget._creditContainer.style.display = 'none'
  var headers = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  headers.setInputAction(function (event) {
    var windowpos = viewer.camera.getPickRay(event.position);//射线
    if (windowpos) {
      var cartesian2 = viewer.camera.pickEllipsoid(event.position, viewer.scene.globe.ellipsoid);
      // 弧度
      var carto2 = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian2);
      // creatPup({id:"pupdiv"+Math.random(10000),position:carto2})

      console.log(carto2);
    }
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

  // viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
  //   console.log("54545");
  // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-85.0, 32.0, 1000),
    // destination: Cesium.Cartesian3.fromDegrees(112.82536, 23.071506, 10000),
    // destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 10000),
  })

  // 自定义标签
  // viewer.scene.postRender.addEvenrListener(() => {
  // })
  // geojson(viewer,'../../../public/img/sampleNeighborhoods.geojson')
  // let box = rectangle(viewer)
  // box.rectangle.material=Cesium.Color.RED
  // let box = label(viewer,'fhdjgsfdhs')
  // let box = billboard(viewer)
  // let box = point(viewer)
  // entity实体    
  // let box = tdpline(viewer)




  // let box = polyline(viewer)
  // box.polyline.material = materialzdy
  // box.polyline.material = polylinematerialall.pm1 //发光
  // box.polyline.material=polylinematerialall.pm2
  // box.polyline.material=polylinematerialall.pm3
  // box.polyline.material=polylinematerialall.pm4
  // let box = polylinevolume( viewer)
  // let box = polylinevolume1(viewer)
  // box.polylineVolume.material=Cesium.Color.BLUE
  // viewer.zoomTo(box)

  // var entity = viewer.entities.getById('hhh');//查找 
  // setTimeout(() => {
  //   // let geometry = viewer.entities.getById('hhh')
  //   // viewer.entities.remove(geometry) //删除
  //   // viewer.entities.removeById('hhh') //直接删除
  //   viewer.entities.removeAll() //删除所有
  // }, 3000);

  // primitive 
  // CorridorGeometry(viewer)

  // 贴地线
  viewer.scene.primitives.add(new Cesium.GroundPrimitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.CorridorGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        positions: Cesium.Cartesian3.fromDegreesArray([-77, 35.001,
        -77.1, 35.001]),
        width: 40
      }),
      // attributes: {
      //   color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0.0, 1.0, 0.0, 0.5))
      // }
    }),
    appearance : new Cesium.PolylineMaterialAppearance({
        // material: polylinematerial.Polylineimgflow('../../../public/img/dd.png',new Cesium.Color(1.0,1.0,1.0))
        // material: polylinematerial.Polylineglow(new Cesium.Color(1.0,1.0,1.0))
        material: polylinematerial.Polylineglowflow(new Cesium.Color(0.0,0.0,1.0))
        // material: materialall.materialimg6('../../../public/img/111.png',-5,1)
    }),
   
    classificationType: Cesium.ClassificationType.TERRAIN
  }));

  // 折线
  let po = Cesium.Cartesian3.fromDegreesArrayHeights([-77, 35.003,30,
        -77.1, 35.003,30])
    const { geometryInstance: pp } = PolylineGeometry(po, 6)
    viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: pp, // 多个instance组成的集合
        // appearance: maps.PolylineMaterialAppearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
        appearance: new Cesium.PolylineMaterialAppearance({
            material: materialall.materialimg6('../../../public/img/111.png',-5,1)
        })
    }))
})
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
