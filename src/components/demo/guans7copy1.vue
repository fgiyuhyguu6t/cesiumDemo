<template>
    <div id="cesiumContainer"></div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref, watch, onBeforeUpdate } from 'vue'
import * as Cesium from 'cesium'
import gsap from 'gsap'
import {
    CylinderGeometry, PolylineVolumeGeometry,
    Polylineprimitive,
    PolylineVolumeGeometry2, guans,
    SpolylineVolumeGeometry, radius,
    addGLTFModeleitity, addGLTFprimitive,
    clickmoodel, clickmoodel1, clickmoodel2, clickmoodel3, clickmoodel5, clickmoodel8,
    RectangleGeometry, RectangleGeometry1
} from './hooks'
// 118.028693,24.425362
// 118.317875,24.626291
import { maps, materialall } from './hooks/material/material.ts'
import { materials } from './hooks/material/materialall.ts'
// import { polylinematerial } from './hooks/material/PolylineMaterialAppearance'

// 引入多段线PolylineGeometry
import {PolylineGeometry} from './hooks/new2024/PolylineGeometry.ts'
// 引入流动材质
import { polylinematerial } from './hooks/new2024/PolylineMaterialAppearance.ts'

onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'
    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 50000),
    })
    // 折线
    let po = Cesium.Cartesian3.fromDegreesArrayHeights([118.160679, 24.515347, 300, 118.220679, 24.515347, 30])
    const { geometryInstance: pp } = PolylineGeometry(po, 60)
    viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: pp, // 多个instance组成的集合
        appearance: new Cesium.PolylineMaterialAppearance({
            material: polylinematerial.Polylineimgflow('../../../public/img/dd.png',new Cesium.Color(1.0,1.0,1.0))
        })
    }))

    // let po = Cesium.Cartesian3.fromDegreesArrayHeights([118.160679, 24.515347, 300, 118.220679, 24.515347, 30])
    // const { geometryInstance: pp } = PolylineGeometry(po, 60)
    // viewer.scene.primitives.add(new Cesium.Primitive({
    //     geometryInstances: pp, // 多个instance组成的集合
    //     // appearance: maps.PolylineMaterialAppearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
    //     appearance: new Cesium.PolylineMaterialAppearance({
    //         // material: materialall.materialimg6('../../../public/img/111.png',-5,1)
    //         material: polylinematerial.Polylineimgflow('../../../public/img/dd.png',new Cesium.Color(1.0,1.0,1.0))
    //     // material: polylinematerial.Polylineglow(new Cesium.Color(1.0,1.0,1.0))
    //     // material: polylinematerial.Polylineglowflow(new Cesium.Color(0.0,0.0,1.0))
    //     })
    // }))
    // let po1 = Cesium.Cartesian3.fromDegreesArrayHeights([118.160679, 24.535347, 300, 118.220679, 24.535347, 30])
    // const { geometryInstance: ppp } = PolylineGeometry(po1, 60)
    // viewer.scene.primitives.add(new Cesium.Primitive({
    //     geometryInstances: ppp, // 多个instance组成的集合
    //     // appearance: maps.PolylineMaterialAppearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
    //     appearance: new Cesium.PolylineMaterialAppearance({
    //         // material: materialall.materialimg6('../../../public/img/111.png',-5,1)
    //         // material: polylinematerial.Polylineimgflow('../../../public/img/dd.png',new Cesium.Color(1.0,1.0,1.0))
    //     // material: polylinematerial.Polylineglow(new Cesium.Color(1.0,1.0,1.0))
    //     material: polylinematerial.Polylineglowflow(new Cesium.Color(0.0,0.0,1.0))
    //     })
    // }))

    // 圆柱
    let { circleInstance } = CylinderGeometry()
    var circleInstanceprimitive = new Cesium.Primitive({
        geometryInstances: circleInstance,
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            // aboveGround: false,
            // material: materialzdy,
            // material: materialall.materialimg2('../../../../public/img/111.png', 10, 10),
            // material:materialall.materialimgtime(),//流动
            // material: materialall.materialimg3('../../../../public/img/111.png',-100,1)
            // material: materialall.materialimg5('../../../public/img/dd.png')
            material: materialall.materialimg6('../../../public/img/111.png',-5,1)
            // material: materialall.materialimg4('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1), 1, 1)
        })
        // appearance: maps.ma
    })

    viewer.scene.primitives.add(circleInstanceprimitive)

    // 多段柱体
    let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
        118.220679, 24.535347, 100,
        118.130679, 24.535347, 100,
    ])
    let { instance: ddins } = Polylineprimitive(ps1)
    var primitive1 = new Cesium.Primitive({
        releaseGeometryInstances: false,//显示geometryInstances
        geometryInstances: ddins, // 多个instance组成的集合

        // appearance: new Cesium.EllipsoidSurfaceAppearance({
        //     aboveGround: false,
        //     // material: materialall.materialimgld('../../../../public/img/111.png'),
        //     // material:materialall.materialimgtime(),//流动
        //     material: materialall.materialimg2('../../../../public/img/mood.jpg', 100, 1),
        //     // material: materialall.materialimg3('../../../../public/img/111.png',-100,1)
        // })
        appearance: maps.EllipsoidSurfaceAppearance('../../../public/img/dd.png')
    });
    // viewer.scene.primitives.add(primitive1);
    
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(118.120679, 24.515347))
        //    let  model= addGLTFprimitive('../../../public/Models/ybz.glb',modelMatrix,154)
        let model = addGLTFprimitive('../../../public/Models/cement2.glb',modelMatrix,155)
        viewer.scene.primitives.add(model);
        console.log("model",model);

        // const position1 = Cesium.Cartesian3.fromDegrees(118.120679, 24.515349, 0)
        // let models = addGLTFModeleitity('../../../public/Models/ybz.glb', position1, '55',viewer)
        // viewer.entities.add(models)
        
        // viewer.zoomTo(model)
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
  