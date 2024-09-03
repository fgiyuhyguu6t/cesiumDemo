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
    // animation: false,//动画小部件
    // timeline: false,//时间轴
    // 加载别的图层
    // imageryProvider: new Cesium.IonImageryProvider({ assetId: 3812 }),
    baseLayerPicker: false,//地图图层组件
    // fullscreenButton: false,//全屏组件
    // geocoder: false,//地理编码搜索组件
    // homeButton: false,//首页组件
    // // infoBox: false,//信息框 //弹窗
    // sceneModePicker: false,//场景模式
    // selectionIndicator: false,//选取指示器组件
    // navigationHelpButton: false,//帮助按钮
    // navigationInstructionsInitiallyVisible: false,
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
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-75, 40, 1550),
    // destination: Cesium.Cartesian3.fromDegrees(116.45, 39.9, 753),
  })

  viewer.clock.shouldAnimate = true;
  viewer.clock.multiplier = 1000;
  let start = Cesium.JulianDate.fromIso8601('2023-11-15');
  let end = Cesium.JulianDate.fromIso8601('2023-11-21');
  viewer.timeline.zoomTo(start, end);

  const position= Cesium.Cartesian3.fromDegrees(-75, 40, 1500);
  var entity=viewer.entities.add({
    position:position,
    orientation:Cesium.Transforms.headingPitchRollQuaternion(position,new Cesium.HeadingPitchRoll(-90,0,0)),
    model:{
      uri:'../../public/Models/ferrari2.gltf',
      minimPixlSize:100,
      maximumScale:10000,
      show:true,
    }
  });
  // 相机视角
  // viewer.camera.viewBoundingSphere(new Cesium.BoundingSphere(position,20),new Cesium.HeadingPitchRange(0,0,0))

  viewer.scene.primitives.add(new Cesium.ParticleSystem({
    image: '../../public/img/f.png',
    imageSize: new Cesium.Cartesian2(20, 20),
    startScale: 1.0,//开始大小
    endScale: 4.0,//结束大小
    particleLife: 1.0,//粒子生命
    speed: 5.0,//发射速度
    emitter: new Cesium.CircleEmitter(0.5),//生成区域
    // emitter : new Cesium.CircleEmitter(0.5),//圆形
    // emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(5.0, 5.0, 5.0)),//方形
    // emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30.0)),
    emissionRate: 5.0,//粒子数/s
    // sizeInMeters:true,
    // modelMatrix: computeModelMatrix({ log: 116.45, lat: 39.9, alt: 4 }, Cesium.JulianDate.now()),
    // emitterModelMatrix : computeEmitterModelMatrix(),
    lifetime: 16.0,//粒子系统发射粒子的时间
    modelMatrix:entity.computeModelMatrix(viewer.clock.startTime,new Cesium.Matrix4()),
    emitterModelMatrix : computeEmitterModelMatrix(),
  }))

  function computeEmitterModelMatrix() {
   let hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
    trs.translation = Cesium.Cartesian3.fromElements(-4.0, 0.0, 1.4, translation);
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

    return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
}


  //  const fire= new Cesium.ParticleSystem({
  //   image: '../../public/img/f.png',
  //   startColor:Cesium.Color.RED.widthAlpha(0.1),
  //   endColor:Cesium.Color.YELLOW.widthAlpha(0.5),
  //   imageSize: new Cesium.Cartesian2(20, 20),//粒子大小
  //   startScale: 1.0,//开始大小
  //   endScale: 4.0,//结束大小
  //   minimumParticleLife:1.5,
  //   maximumParticleLife:2,
  //   minimumSpeed:29,
  //   maximumSpeed:30,
  //   particleLife: 1.0,//粒子生命
  //   speed: 5.0,//发射速度
  //   sizeInMeters:true,
  //   emitter: new Cesium.CircleEmitter(0.5),//生成区域
  //   emissionRate: 5.0,//粒子数/s
  //   modelMatrix: computeModelMatrix({ log: 116.45, lat: 39.9, alt: 4 }, Cesium.JulianDate.now()),
  //   emitterModelMatrix : computeEmitterModelMatrix(),
  //   // modelMatrix:entity.computeModelMatrix(viewer.clock.startTime,new Cesium.Matrix4()),
  //   lifetime: 16.0,//粒子系统发射粒子的时间
  // })
  // viewer.scene.primitives.add(fire)



})
</script>
<!-- modelMatrix: computeModelMatrix(entity, Cesium.JulianDate.now()) -->

<style scoped>
#cesiumContainer {
  /* width: 100%;
    height: 100%; */
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
