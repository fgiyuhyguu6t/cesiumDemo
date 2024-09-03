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
    clickmoodel, clickmoodel1, clickmoodel2, clickmoodel3
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



let number = ref(10000)
var material = Cesium.Material.fromType('Color');
material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 1);
let instance = []
for (let index = 0; index < number.value; index++) {
    const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
    let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
        ja1, wa1, 100,
        ja2, wa2, 100,
    ])
    let colorMaterial1 = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
    var volume = new Cesium.PolylineVolumeGeometry({
        polylinePositions: ps1,
        shapePositions: computeCircleR(700, 20),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    });
    let randoms = Math.random()
    // 定义 GeometryInstance
    var instance1 = new Cesium.GeometryInstance({
        geometry: volume,
        id: `1line${randoms}`,
        attributes: {
            color: colorMaterial1,
        },
    });
    instance.push(instance1)

    let aa = {
        id: instance1.id,
        instance, instance1
    }
    const myMap = new Map();
    const keyid = "";
    const keyinstance = {};
    myMap.set(keyid, instance1.id)
    myMap.set(keyinstance, instance1)
}
// function managers(viewer){
//     var manager = new Cesium.PrimitiveCollection();
//     manager.destroyPrimitives = false;
//     viewer.scene.primitives.add(manager);
//     return manager
// }

function primitives(instance) {
    let primitive = new Cesium.Primitive({
        releaseGeometryInstances: false,
        geometryInstances: instance, // 多个instance组成的集合
        // appearance: new Cesium.EllipsoidSurfaceAppearance({
        //     aboveGround: false,
        //     material,
        // })
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: true
        }),
    })

    return primitive
}
function computeCircleR(radius, itemp) {
    let result = [];
    for (let i = 0; i < 360; i += itemp) {
        let radians = Cesium.Math.toRadians(i);
        result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
    }
    return result;
}
onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 50000),
    })
    var manager = new Cesium.PrimitiveCollection();
    manager.destroyPrimitives = false;
    viewer.scene.primitives.add(manager);
    function add(primitive) {
        manager.add(primitive);
        viewer.scene.primitives.add(manager);
        if (viewer.scene.primitives.length <= 1) {
            viewer.scene.primitives.add(manager);
        }
    }
    function deletes(primitive) {
        manager.remove(primitive);
    }
    let primitive = primitives(instance)
    add(primitive)


    // 不能单删个别instance
    // setTimeout(function(){
    //     instance.pop()
    //     console.log("pr",primitive);
    //     deletes(primitive)
    //     console.log("i",instance.length);
    //     // let primitive= primitives(instance)
    //     // add(primitive)
    //     // console.log("pr",primitive);
    //     // console.log("1111");
    // },3000)

    // setTimeout(function(){
    //     add(primitive)
    //     console.log("pr",primitive);
    // },5000)

    // setTimeout(function () {
    //     deletes(primitive)
    //     let updatedPrimitive= primitives(instance)
    //     add(updatedPrimitive)
    // }, 5000)
    // clickmoodel1(viewer, instance)



    // 点击变红重载
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
        var pickedFeature = viewer.scene.pick(movement.position);
        if (typeof (pickedFeature) != "undefined") {
            // 当前点击的id返回该对象
            deletes(primitive)
            let arr2 = instance.filter((value, index) => pickedFeature.id === value.id)
            const newcolor = new Cesium.ColorGeometryInstanceAttribute(1, 0, 0, 1)
            arr2[0].attributes.color = newcolor
            let updatedPrimitive = primitives(instance)
            add(updatedPrimitive)
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


    // appearance  材质统一添加
    let instanceall = []
    for (let index = 0; index < number.value; index++) {
        // console.log("blue",index);
        const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
        let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
            ja1, wa1, 100,
            ja2, wa2, 100,
        ])
        let colorMaterial1 = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        let { instance: instance1, myMap: myMapnew } = PolylineVolumeGeometry2(ps1, colorMaterial1)
        instanceall.push(instance1)

    }

    var materialwhith = Cesium.Material.fromType('Color');
    materialwhith.uniforms.color = new Cesium.Color(1.0, 1.0, 1.0, 1);
    viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: instanceall, // 多个instance组成的集合、
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            material: materialwhith,
        })
    }));
    clickmoodel2(viewer)



    // indirectRefresh(viewer, 500, 200);
    // let number = ref(30)

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

    // var material = Cesium.Material.fromType('Color');
    // material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 1);
    // let instance = []
    // for (let index = 0; index < number.value; index++) {
    //     // console.log("blue",index);
    //     const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
    //     let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
    //         ja1, wa1, 100,
    //         ja2, wa2, 100,
    //     ])
    //     let colorMaterial1 = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
    //     var volume = new Cesium.PolylineVolumeGeometry({
    //         polylinePositions: ps1,
    //         shapePositions: computeCircleR(700, 20),
    //         vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    //     });
    //     let randoms = Math.random()
    //     // 定义 GeometryInstance
    //     var instance1 = new Cesium.GeometryInstance({
    //         geometry: volume,
    //         id: `1line${randoms}`,
    //         attributes: {
    //             color: colorMaterial1,
    //         },
    //     });
    //     instance.push(instance1)

    //     let aa = {
    //         id: instance1.id,
    //         instance, instance1
    //     }
    //     const myMap = new Map();
    //     const keyid = "";
    //     const keyinstance = {};
    //     myMap.set(keyid, instance1.id)
    //     myMap.set(keyinstance, instance1)

    // }


    // var manager = new Cesium.PrimitiveCollection();
    // manager.destroyPrimitives = false;
    // viewer.scene.primitives.add(manager);

    // function primitives(instance) {
    //     let primitive = new Cesium.Primitive({
    //         releaseGeometryInstances: false,
    //         geometryInstances: instance, // 多个instance组成的集合
    //         // appearance: new Cesium.EllipsoidSurfaceAppearance({
    //         //     aboveGround: false,
    //         //     material,
    //         // })
    //         appearance: new Cesium.PerInstanceColorAppearance({
    //             translucent: false,
    //             closed: true
    //         }),
    //     })
    //     return primitive
    // }

    // function add(instance) {
    //     let primitive= primitives(instance)
    //     manager.add(primitive);
    //     viewer.scene.primitives.add(manager);
    //     if (viewer.scene.primitives.length <= 1) {
    //         viewer.scene.primitives.add(manager);
    //     }
    // }
    // function deletes(instance) {
    //     let primitive= primitives(instance)
    //     manager.remove(primitive);
    // }


    // add(instance)

    // // viewer.scene.primitives.add(new Cesium.Primitive({
    // //     releaseGeometryInstances: false,
    // //     geometryInstances: instance, // 多个instance组成的集合
    // //     // appearance: new Cesium.EllipsoidSurfaceAppearance({
    // //     //     aboveGround: false,
    // //     //     material,
    // //     // })
    // //     appearance: new Cesium.PerInstanceColorAppearance({
    // //         translucent: false,
    // //         closed: true
    // //     }),
    // // }));
    // setTimeout(function () {
    //     instance.pop()
    //     console.log("222", instance);
    //     // debugger
    // }, 3000);




    // let pickid = clickmoodel(viewer, instance)
    // clickmoodel2(viewer)



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
    // let pickid = clickmoodel(viewer)
    // console.log("id", pickid);

    // clickmoodel(viewer)
    // clickmoodel2(viewer)
    // clickmoodel3(viewer)
    function computeCircleR(radius, itemp) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }





    // // 1、 创建一个新的 Primitive 对象，并为每个 GeometryInstance 指定不同的外观
    // const primitive = new Cesium.Primitive({
    //     geometryInstances: instances.map((instance) => ({
    //         geometry: instance.geometry,
    //         attributes: instance.attributes,
    //         modelMatrix: instance.modelMatrix,
    //         id: instance.id,
    //         appearance: new Cesium.PerInstanceColorAppearance({
    //             // 外观参数...
    //         }),
    //     })),
    // });

    // viewer.scene.primitives.add(primitive);


    // // 2、修改
    // const instanceToModify = primitive.geometryInstances.find(
    //     (instance) => instance.id === 'instance1'
    // );
    // // 3、这里假设要修改的实例具有 id 为 `'instance1'`。
    // // 在这里，我们使用新的外观对象（例如 `MaterialAppearance`）替换实例的现有外观。
    // instanceToModify.appearance = new Cesium.MaterialAppearance({
    //     // 修改的外观参数...
    // });
    // // 4、重新生成 Primitive 对象以更新修改后的外观
    // // 5、
    // viewer.scene.primitives.remove(primitive); // 从场景中移除原始的 Primitive 对象
    // // 6、
    // const updatedPrimitive = new Cesium.Primitive({
    //     geometryInstances: instances,
    // });
    // viewer.scene.primitives.add(updatedPrimitive); // 将更新后的 Primitive 对象添加到场景中

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
  