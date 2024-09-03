<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup>
import { onMounted, ref, watch, onBeforeUpdate } from 'vue'
import * as Cesium from 'cesium'
import {
    CylinderGeometry, PolylineVolumeGeometry,
    PolylineVolumeGeometry2, guans,
    SpolylineVolumeGeometry, radius,
    addGLTFModeleitity, addGLTFprimitive, 
    PolylineGeometry, PolylineVolumeGeometry1,
    clickmoodel, clickmoodel1, clickmoodel2, clickmoodel3,clickmoodel4,clickmoodel5
    // PolylineTrailLinkMaterialProperty,
} from './hooks'
import { maps } from './hooks/material/material.ts'

// import {PolylineTrailLinkMaterialProperty} from '../demo/hooks/PolylineTrailLinkMaterialPropertys.js'
// import { PolylineTrailLinkMaterialProperty } from '../demo/hooks/PolylineTrailLinkMaterialProperty.ts'


// 118.028693,24.425362
// 118.317875,24.626291

// let geometrys = []
// function indirectRefresh(viewer, total, number) {
//     //total -> 渲染数据总数 onceCount -> 一次渲染条数
//     let count = 0 //初始渲染次数值
//     let loopCount = total / number //渲染次数
//     let timer = 0;

//     function refreshAnimation() {
//         // let instance = []
//         const colorld = new Cesium.Color(1.0, 1.0, 1.0, 1)
//         for (let i = 0; i < number; i++) {
//             const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
//             let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
//                 ja1, wa1, 100,
//                 ja2, wa2, 100,
//             ])
//             let { primitive, instance } = PolylineVolumeGeometry(ps1)
//             viewer.scene.primitives.add(primitive);

//             let psld = Cesium.Cartesian3.fromDegreesArray([
//                 ja1, wa1,
//                 ja2, wa2,
//             ])
//             const { geometryInstance: p } = PolylineGeometry(ps1)

//             viewer.scene.primitives.add(
//                 new Cesium.Primitive({
//                     geometryInstances: p,
//                     appearance: maps.flowappearance('../../../public/img/dd.png', colorld)
//                 })
//             );
//         }

//         if (count > loopCount) {
//             cancelAnimationFrame(timer)
//         } else {
//             count++
//             timer = requestAnimationFrame(refreshAnimation)
//         }
//     }
//     refreshAnimation()
// }

let index = ref(1000)
function f(viewer) {
    let geometryInstances = []
    const aaa = new Cesium.Color(1.0, 1.0, 1.0, 1)
    for (let i = 0; i < index.value; i++) {
        const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
        let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
            ja1, wa1, 0,
            ja2, wa2, 0,
        ])
        let { primitive, instance } = PolylineVolumeGeometry(ps1)
        viewer.scene.primitives.add(primitive);

        // let psld = Cesium.Cartesian3.fromDegreesArray([
        //     ja1, wa1,
        //     ja2, wa2,
        // ])
        let ps2 = Cesium.Cartesian3.fromDegreesArrayHeights([
            ja1, wa1, 10,
            ja2, wa2, 10,
        ])
        const { geometryInstance: pp } = PolylineGeometry(ps2)
        geometryInstances.push(pp)
    }
    const primitiveld = new Cesium.Primitive({
        geometryInstances: geometryInstances,
        appearance: maps.flowappearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
    })
    viewer.scene.primitives.add(primitiveld);
}

// let geometryInstances = []
// let numbers = ref(1000)
// for (let index = 0; index < numbers.value; index++) {
//     const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
//     let ps1 = Cesium.Cartesian3.fromDegreesArray([
//         ja1, wa1,
//         ja2, wa2,
//     ])
//     const { geometryInstance: p } = PolylineGeometry(ps1)
//     geometryInstances.push(p)
// }



onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'
    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 30000),
    })
    // indirectRefresh(viewer, 5000, 200);
    // clickmoodel2(viewer)

    f(viewer)
    clickmoodel5(viewer,primitive)
    
    // clickmoodel2(viewer)


    let ps1 = Cesium.Cartesian3.fromDegreesArray([118.120679, 24.515347,118.220679, 24.515347,])
    let ab='ab'
    const blue = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
    const { instance: p1 } = PolylineVolumeGeometry1(ps1, blue,ab)
    
    let ps2 = Cesium.Cartesian3.fromDegreesArray([118.120679, 24.415347,118.220679, 24.415347,])
    let cd='cd'
    const red = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
    const { instance: p2 } = PolylineVolumeGeometry1(ps2, red,cd)

    var primitive = new Cesium.Primitive({
        // releaseGeometryInstances: false,//显示geometryInstances
        // geometryInstances:p2, // 多个instance组成的集合
        geometryInstances: [p1, p2], // 多个instance组成的集合
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: true
        }),
    });

    // viewer.scene.primitives.add(primitive)
    // setTimeout(function () {
    // // setInterval(function () {
    //     var attributes = primitive.getGeometryInstanceAttributes('cd');
    //     attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.WHITE);
    // }, 2000);
    // console.log("32",primitive);

    //     const aaa = new Cesium.Color(1.0, 1.0, 1.0, 1)
    //     viewer.scene.primitives.add(
    //         new Cesium.Primitive({
    //             geometryInstances: geometryInstances,
    //             appearance: maps.flowappearance('../../../public/img/dd.png', aaa)
    //         })
    //     );



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
  