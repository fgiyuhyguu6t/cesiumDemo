<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import {
    CylinderGeometry, PolylineVolumeGeometry,
    PolylineVolumeGeometry2, guans,
    SpolylineVolumeGeometry, radius,
    addGLTFModeleitity, addGLTFprimitive, addModel,
    clickmoodel, clickmoodel2, clickmoodel3
} from './hooks'
// 118.028693,24.425362
// 118.317875,24.626291

let geometrys = []
function indirectRefresh(viewer, total, number) {
    //total -> 渲染数据总数 onceCount -> 一次渲染条数
    let count = 0 //初始渲染次数值
    let loopCount = total / number //渲染次数
    let timer = 0;

    function refreshAnimation() {
        let instance = []
        for (let i = 0; i < number; i++) {
            const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
            let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
                ja1, wa1, 100,
                ja2, wa2, 100,
                // 118.133263,24.504288,100,
                // 118.193263,24.504288,100,
            ])
            let { primitive, instance } = PolylineVolumeGeometry(ps1)
            let id = instance.id

            const myMap = new Map();
            const keyid = "";
            const keyprimitive = {};
            const keyinstance = {};
            myMap.set(keyid, instance.id)
            myMap.set(keyprimitive, primitive)
            myMap.set(keyinstance, instance)

            // console.log("11", myMap.get(keyid));

            viewer.scene.primitives.add(primitive);

            // let instance1 = PolylineVolumeGeometry2(ps1)
            // instance.push(instance1)
            // viewer.scene.primitives.add(new Cesium.Primitive({
            //     geometryInstances: instance, // 多个instance组成的集合
            //     appearance: new Cesium.PerInstanceColorAppearance({
            //         translucent: false,
            //         closed: true
            //     }),
            // }));
        }

        if (count > loopCount) {
            cancelAnimationFrame(timer)
        } else {
            count++
            timer = requestAnimationFrame(refreshAnimation)
        }
    }
    refreshAnimation()
}

onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 3000),
    })

    indirectRefresh(viewer, 500, 200);

    let number = ref(1000)

    // 载模型
    for (let index = 0; index < number.value; index++) {
        const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
        const position = Cesium.Cartesian3.fromDegrees(ja1, wa1, 0)
        // console.log("1");
        addGLTFModeleitity('../../../public/Models/ybz.glb', position, viewer)
        // 暂时没行
        // addGLTFprimitive('../../../public/Models/ybz.glb', position, viewer)
        // addModel('../../../public/Models/ybz.glb', position,viewer)
    }

    var material = Cesium.Material.fromType('Color');
    material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 1);
    let instance = []
    let myMapnew = {}
    for (let index = 0; index < number.value; index++) {
        // console.log("blue",index);
        const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
        let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
            ja1, wa1, 100,
            ja2, wa2, 100,
        ])
        let colorMaterial1 = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        let { instance: instance1, myMap: myMapnew } = PolylineVolumeGeometry2(ps1, colorMaterial1)
        instance.push(instance1)
        // console.log("ma",typeof(myMapnew));
        console.log("ma", myMapnew);

    }

    viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: instance, // 多个instance组成的集合
        // appearance: new Cesium.PerInstanceColorAppearance({
        //     translucent: false,
        //     closed: true
        // }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            material,
        })
    }));




    // 集合加管，单独改变不了材质
    //     var material = Cesium.Material.fromType('Color');
    //     material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 1);
    //    let myMapnew = guans(number, viewer, material)
    //    console.log("mmmm",myMapnew);

    // 集合加管，单独改变不了材质
    // var material = Cesium.Material.fromType('Color');
    // material.uniforms.color = new Cesium.Color(1.0, 0.0, 0.0, 1);
    // guans(number, viewer, material)

    // console.log("1111", viewer.scene.primitives);

    // debugger

    // 点击事件
    clickmoodel(viewer)
    // clickmoodel2(viewer)
    // clickmoodel3(viewer)

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
  