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

  var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
  });

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(114.305469, 30.593355, 10000.0),
    // duration: 5
  });
  // 隐藏logo信息
  viewer._cesiumWidget._creditContainer.style.display = 'none'
  var particleSystem = new Cesium.ParticleSystem({
    image: '../../public/img/fire.png',
    startScale: 1.0,
    endScale: 0.2,
    particleLife: 5.0,
    speed: 10.0,
    emissionRate: 1000.0,
    startColor: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
    endColor: new Cesium.Color(1.0, 1.0, 1.0, 0.0),
    minimumParticleSize: 8.0,
    maximumParticleSize: 8.0,
    imageSize: new Cesium.Cartesian2(64, 64),
    emitter: new Cesium.CircleEmitter(0.5),
    bursts: [
        new Cesium.Burst(0.0, 100),
        new Cesium.Burst(1.0, 100)
    ]
    // updateCallback: applyGravity
});

viewer.scene.primitives.add(particleSystem);
var position = Cesium.Cartesian3.fromDegrees(114.3052, 30.5928, 100.0);
particleSystem.modelMatrix = Cesium.Matrix4.fromTranslation(position);

particleSystem.emitRate = particleSystem.emissionRate;
particleSystem.emitter.radius = 0.5;
particleSystem.updateParticleEmitterPositions = true;
// function applyGravity(particles, dt) {
//     for (var i = 0; i < particles.length; ++i) {
//         var particle = particles[i];
//         particle.position.z -= dt * particle.velocity.z;
//         particle.velocity.z -= dt * 9.8;
//     }
// }
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
