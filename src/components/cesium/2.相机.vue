<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";

//cesium初始化必须写在mounted生命周期里面，否则会报错"Element with id "cesiumContainer" does not exist in the document."
onMounted(() => {
  // var custom = new Cesium.ArcGisMapServerImageryProvider({
  //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
  // })
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY";

  const viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false, //动画小部件
    baseLayerPicker: false, //地图图层组件
    fullscreenButton: false, //全屏组件
    geocoder: false, //地理编码搜索组件
    homeButton: false, //首页组件
    infoBox: false, //信息框
    sceneModePicker: false, //场景模式
    selectionIndicator: false, //选取指示器组件
    timeline: false, //时间轴
    navigationHelpButton: false, //帮助按钮
    navigationInstructionsInitiallyVisible: false,
  });
  // 隐藏logo信息
  viewer._cesiumWidget._creditContainer.style.display = "none";
  // 经纬度fromDegrees转笛卡尔坐标
  const position = Cesium.Cartesian3.fromDegrees(109.477656, 36.6517925, 2500);
  const position2 = Cesium.Cartesian3.fromDegrees(
    118.0658439,
    24.5915414,
    2500
  );

  viewer.camera.setView({
    destination: position2, //目的地
    orientation: {
      heading: Cesium.Math.toDegrees(0), //左右平移0
      pitch: Cesium.Math.toDegrees(90), //上下点头90
      roll: Cesium.Math.toDegrees(0), //歪头0
    },
  });
  //相机飞行
  // setTimeout(() => {
  //     viewer.camera.flyTo({
  //         destination: position,
  //         orientation: {//和上面一样三个参数
  //             // heading: Cesium.Math.toDegrees(0),//左右平移0
  //             // pitch: Cesium.Math.toDegrees(0),//上下点头90
  //             // roll: Cesium.Math.toDegrees(0),//歪头0
  //         },
  //         duration:3//飞行时间
  //     });
  // }, 3000);

  // lookAt
  const position3 = Cesium.Cartesian3.fromDegrees(118.0658439, 24.5915414);
  viewer.camera.lookAt(
    position3, //位置锁定
    new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(-90),
      20000
    )
  );
});
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
