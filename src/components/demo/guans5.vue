<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup>
import { onMounted, ref, watch, onBeforeUpdate } from 'vue'
import * as Cesium from 'cesium'
import {
    CylinderGeometry, PolylineVolumeGeometry,
    PolylineVolumeGeometry2,
    PolylineVolumeGeometry4,
    PolylineVolumeGeometry5,
    PolylineVolumeGeometry3,
    PolylineVolumeGeometry1, guans,
    PolylineGeometry,
    SpolylineVolumeGeometry, radius,
    addGLTFModeleitity,addGLTFprimitive,
    clickmoodel, clickmoodel2, clickmoodel3, clickmoodel4, clickmoodel6, clickmoodel7, clickmoodelall,
    clickmoodelbill,
} from './hooks'
import { maps } from './hooks/material/material.ts'
// 118.028693,24.425362
// 118.317875,24.626291
onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'
    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 10000),
    })
    let number = ref(1000)
    let instance = []
    let geometryInstances = []
    let models = []
    for (let index = 0; index < number.value; index++) {
        // 管道
        const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
        let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
            ja1, wa1, 0,
            ja2, wa2, 0,
        ])
        let width = 20
        const color = Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0, 0, 1, 0.5))
        const { instance: p2 } = PolylineVolumeGeometry1(ps1, color, index, width)
        instance.push(p2)
        // 流动
        let height = width
        let ps2 = Cesium.Cartesian3.fromDegreesArrayHeights([
            ja1, wa1, height,
            ja2, wa2, height,
        ])
        let widthline = 60
        // const { instance: pp } = PolylineVolumeGeometry5(ps2,widthline)
        // console.log('234243',pp);
        // const color2 = Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0, 1, 0, 0.5))
        // const { instance: pp} = PolylineVolumeGeometry3(ps2,color2,widthline)
        // const { instance: pp} = PolylineVolumeGeometry4(ps2,index)

        const { geometryInstance: pp } = PolylineGeometry(ps2, widthline)
        geometryInstances.push(pp)

        // gltf模型
        // const position = Cesium.Cartesian3.fromDegrees(ja1, wa1, 0)
        // let model = addGLTFModeleitity('../../../public/Models/ybz.glb', position, index)
        // viewer.entities.add(model)
        // models.push(model)

        var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(ja1, wa1))
       let  modelybz= addGLTFprimitive('../../../public/Models/ybz.glb',modelMatrix,index)
       viewer.scene.primitives.add(modelybz)
    }
    // 管
    var primitive = new Cesium.Primitive({
        // releaseGeometryInstances: false,//显示geometryInstances
        geometryInstances: instance, // 多个instance组成的集合
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: true,
            closed: true
        }),
        // allowPicking: true,
        // asynchronous: false,
    });
    // 2
    // var primitiveld = new Cesium.Primitive({
    //     // releaseGeometryInstances: false,//显示geometryInstances
    //     geometryInstances: geometryInstances, // 多个instance组成的集合
    //     appearance: new Cesium.PerInstanceColorAppearance({
    //         translucent: true,
    //         closed: true
    //     }),
    // });

    // 流动多段线
    // GroundPolylinePrimitive
    const primitiveld = new Cesium.Primitive({
        geometryInstances: geometryInstances,
        // appearance: new Cesium.PolylineMaterialAppearance({
        //     material: Cesium.Material.fromType('Color', {
        //         color: Cesium.Color.RED
        //     })
        // })
        appearance: maps.PolylineMaterialAppearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
        // appearance: maps.MaterialAppearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
    })
    let po = Cesium.Cartesian3.fromDegreesArrayHeights([118.120679, 24.515347, 300, 118.220679, 24.515347, 30])
    function computeCircleR(radius, itemp) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }
    // const primitivebox= boxGeometryprimitive1() 
    // const primitivebox= boxGeometryprimitive() 
    // viewer.scene.primitives.add(primitivebox)
    // viewer.scene.primitives.add(abc)

    viewer.scene.primitives.add(primitive)
    viewer.scene.primitives.add(primitiveld)
    clickmoodelall(viewer, primitive)
    // clickmoodelbill(viewer, primitive)
    // clickmoodel7(viewer, primitive)

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
  