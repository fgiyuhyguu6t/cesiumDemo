<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import { CylinderGeometry, radius, PolylineVolumeGeometry2, } from './hooks'

let geometryccc = CylinderGeometry()

// const 
// const radius = ref(2000)
// const length = ref(10000)


//旋转角度
let hpr = new Cesium.HeadingPitchRoll(0, 0, Math.PI / 2);
//位置点
let point = new Cesium.Cartesian3(-95, 43, 100);
let Bpoint = new Cesium.Cartesian3(-95, 43, 100);

let origin = Cesium.Cartesian3.fromDegrees(point.x, point.y, point.z);
//初始的矩阵
const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(origin, hpr);

const cylinder = new Cesium.CylinderGeometry({
  length: 10000, // 圆柱体的长度
  topRadius: 2000, // 圆柱体顶部半径
  bottomRadius: 2000, // 圆柱体底部半径
  slices: 128, // 圆柱体周边的边数
  vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
})
var circleInstance = new Cesium.GeometryInstance({
  geometry: cylinder,
  attributes: {
    color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 1.0, 0.0, 0.5)),
    // show : new Cesium.ShowGeometryInstanceAttribute( true ) //显示或者隐藏
  },
  id: 'circle',
  // modelMatrix: Cesium.Matrix4.multiplyByTranslation(
  //   Cesium.Transforms.eastNorthUpToFixedFrame(
  //     Cesium.Cartesian3.fromDegrees(-95, 43)
  //   ),
  //   //xyz
  //   new Cesium.Cartesian3(0.0, 0.0, 0.0),
  //   new Cesium.Matrix4()
  // ),
  modelMatrix,
});
var primitive1 = new Cesium.Primitive({
  geometryInstances: circleInstance,
  appearance: new Cesium.PerInstanceColorAppearance({
    translucent: false,
    closed: true
  })
});

// PolylineVolumeGeometry




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
  // 视角
  viewer.camera.setView({
    // destination: Cesium.Cartesian3.fromDegrees(118.6052664564008, 31.896095367250844, 50000),
    // destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 50000),
    // destination: Cesium.Cartesian3.fromDegrees(-95, 43, 50000),
    // destination: Cesium.Cartesian3.fromDegrees(104.141991, 22.117029, 50000),
    destination: Cesium.Cartesian3.fromDegrees(118.133263, 24.504288, 50000),
  })
  let ps = Cesium.Cartesian3.fromDegreesArrayHeights([
    104.141991, 22.117029, 42000,
    104.341991, 21.917029, 42000,
    104.831991, 22.817029, 45000,
    104.441991, 23.817029, 42000,
    104.061991, 22.417029, 43000,
  ])
  let shape = computeCircleR(700, 12)
  // let shape = computeCircle(700, 12)
  let polylineVolumeGeometry = new Cesium.PolylineVolumeGeometry({
    polylinePositions: ps,
    shapePositions: shape,
    id: "PolylineVolumeGeometry"
  })

  var material = Cesium.Material.fromType('Color');
  material.uniforms.color = new Cesium.Color(0.0, 0.0, 1.0, 1);

  // 颜色材质
  const color = Cesium.Color.BLUE.withAlpha(0.5);
  const colorMaterial = new Cesium.ColorMaterialProperty(color);

  // viewer.scene.primitives.add(
  //   new Cesium.Primitive({
  //     geometryInstances: new Cesium.GeometryInstance({
  //       geometry: polylineVolumeGeometry,

  //     }),
  //     appearance: new Cesium.EllipsoidSurfaceAppearance({
  //       aboveGround: false,
  //       material: material
  //     })
  //   })
  // );

  // 多条管
  let instance=[]
  for (let index = 0; index < 50000; index++) {
    const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
    let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
      ja1, wa1, 100,
      ja2, wa2, 100,
    ])
   let instance1 = PolylineVolumeGeometry2(ps1)
    instance.push(instance1)
  }
  var primitive = new Cesium.Primitive({
    geometryInstances: instance, // 多个instance组成的集合
    appearance: new Cesium.PerInstanceColorAppearance({
      translucent: false,
      closed: true
    }),
  });
  viewer.scene.primitives.add(primitive);


  // var volume = new Cesium.PolylineVolumeGeometry({
  //   polylinePositions: Cesium.Cartesian3.fromDegreesArrayHeights([
  //     104.141991, 22.117029, 42000,
  //     104.341991, 21.917029, 42000,
  //   ]),
  //   shapePositions: computeCircleR(700, 20),
  //   id: "PolylineVolumeGeometry",
  // });
  // // 定义 GeometryInstance
  // var instance = new Cesium.GeometryInstance({
  //   geometry: volume,
  //   id: 'wdhjksgjk',
  //   attributes: {
  //     color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
  //   },
  // });
  // Primitive加载
  // var primitive = new Cesium.Primitive({
  //   geometryInstances: instance, // 多个instance组成的集合
  //   appearance: new Cesium.PerInstanceColorAppearance({
  //     translucent: false,
  //     closed: true
  //   }),
  //   // appearance: new Cesium.EllipsoidSurfaceAppearance({
  //   //   // aboveGround: false,
  //   //   // material,
  //   // })
  // });
  // viewer.scene.primitives.add(primitive);


  // viewer.scene.primitives.add(primitive1);

  /**
    * polylineVolume 半径和边数
    **/
   
  function computeCircleR(radius, itemp) {
    let result = [];
    for (let i = 0; i < 360; i += itemp) {
      let radians = Cesium.Math.toRadians(i);
      result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
    }
    console.log('result', result)
    return result;
  }



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
