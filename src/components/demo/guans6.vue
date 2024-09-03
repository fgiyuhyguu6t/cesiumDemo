<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUpdate } from "vue";
import * as Cesium from "cesium";
import gsap from "gsap";
import {
  CylinderGeometry,
  PolylineVolumeGeometry,
  Polylineprimitive,
  PolylineVolumeGeometry2,
  guans,
  SpolylineVolumeGeometry,
  radius,
  addGLTFModeleitity,
  addGLTFprimitive,
  clickmoodel,
  clickmoodel1,
  clickmoodel2,
  clickmoodel3,
  clickmoodel5,
  clickmoodel8,
  RectangleGeometry,
  RectangleGeometry1,
} from "./hooks";
// 118.028693,24.425362
// 118.317875,24.626291
import { maps, materialall } from "./hooks/material/material.ts";

let geometrys = [];
function indirectRefresh(viewer, total, number) {
  //total -> 渲染数据总数 onceCount -> 一次渲染条数
  let count = 0; //初始渲染次数值
  let loopCount = total / number; //渲染次数
  let timer = 0;
  function refreshAnimation() {
    let instance = [];
    for (let i = 0; i < number; i++) {
      const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius();
      let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
        ja1,
        wa1,
        100,
        ja2,
        wa2,
        100,
      ]);
      let { primitive, instance } = Polylineprimitive(ps1);
      var primitive1 = new Cesium.Primitive({
        releaseGeometryInstances: false, //显示geometryInstances
        geometryInstances: instance, // 多个instance组成的集合

        // appearance: new Cesium.EllipsoidSurfaceAppearance({
        //     aboveGround: false,
        //     // material: materialall.materialimgld('../../../../public/img/111.png'),
        //     // material:materialall.materialimgtime(),//流动
        //     material: materialall.materialimg2('../../../../public/img/mood.jpg', 100, 1),
        //     // material: materialall.materialimg3('../../../../public/img/111.png',-100,1)
        // })
        appearance: maps.EllipsoidSurfaceAppearance(
          "../../../public/img/dd.png"
        ),
      });
      viewer.scene.primitives.add(primitive1);
    }
    if (count > loopCount) {
      cancelAnimationFrame(timer);
    } else {
      count++;
      timer = requestAnimationFrame(refreshAnimation);
    }
  }
  refreshAnimation();
}
function computeCircleR(radius, itemp) {
  let result = [];
  for (let i = 0; i < 360; i += itemp) {
    let radians = Cesium.Math.toRadians(i);
    result.push(
      new Cesium.Cartesian2(
        radius * Math.sin(radians),
        radius * Math.cos(radians)
      )
    );
  }
  return result;
}
onMounted(() => {
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY";

  const viewer = new Cesium.Viewer("cesiumContainer");
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 50000),
  });
  indirectRefresh(viewer, 1, 1);
  clickmoodel8(viewer);
  // 圆柱
  let { circleInstance } = CylinderGeometry();
  var circleInstanceprimitive = new Cesium.Primitive({
    geometryInstances: circleInstance,
    appearance: new Cesium.EllipsoidSurfaceAppearance({
      // aboveGround: false,
      // material: materialall.materialimg2('../../../../public/img/111.png',10,10),
      // material:materialall.materialimgtime(),//流动
      // material: materialall.materialimg3('../../../../public/img/111.png',-100,1)
      material: materialall.materialimg4(
        "../../../public/img/dd.png",
        new Cesium.Color(1.0, 1.0, 1.0, 1),
        1,
        1
      ),
    }),
  });

  viewer.scene.primitives.add(circleInstanceprimitive);
  // 矩形
  let { instance } = RectangleGeometry1();
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: instance, // 多个instance组成的集合

      appearance: new Cesium.EllipsoidSurfaceAppearance({
        // translucent: true,
        // aboveGround: false,
        // material: materialall.materialyuan2(),
        material: materialall.materialimgtime(), //流动// material: materialall.materialimg2('../../../../../public/img/111.png',1,1),
        // material: materialall.materialimg3("../../../public/img/111.png", 1, 1),
        // material: materialall.materialimg4(
        //   "../../../public/img/111.png",
        //   new Cesium.Color(1.0, 1.0, 1.0, 1),
        //   1,
        //   12
        // ),
      }),

      // appearance: maps.EllipsoidSurfaceAppearance('../../../public/img/dd.png')
    })
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
