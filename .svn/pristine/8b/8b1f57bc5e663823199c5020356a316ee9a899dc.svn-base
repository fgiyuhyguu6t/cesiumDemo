<template>
    <div id="cesiumContainer" class="fullSize">
    </div>
</template>
  
<script lang='ts' setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { clickall } from './hooks/clickmoodel';
import { point } from './hooks/enitity/enititys';
import { polyline } from './hooks/enitity/polyline';
import { PolylineGeometry, RectangleGeometry, addGLTFprimitive } from './hooks';
import { CorridorGeometry } from './hooks/primitive/tdpolyline';

onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

    const viewer = new Cesium.Viewer('cesiumContainer', {
        homeButton: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        infoBox: false
    })
    viewer.camera.setView({
        // destination: Cesium.Cartesian3.fromDegrees(112.82536, 23.071506, 10000),
        destination: Cesium.Cartesian3.fromDegrees(116.4568, 39.8926, 10000),
        // destination: Cesium.Cartesian3.fromDegrees(117.4603186710001, 31.14388249900003, 30000),
    })

    // viewer.camera.setView({
    //     // fromDegrees()方法，将经纬度和高程转换为世界坐标
    //     destination: {
    //         x: -2182971.083593166,
    //         y: 4388278.203560757,
    //         z: 4068871.884137431
    //     },
    //     // orientation: {
    //     //     // 指向
    //     //     heading: 0.7195577085964127,
    //     //     // 视角
    //     //     pitch: -0.7397293873082695,
    //     //     roll: 0.002953934254479762
    //     // }
    // });

    // entity
    let { point: p1 } = point(viewer, Cesium.Cartesian3.fromDegrees(116.456, 39.892))
    viewer.entities.add(p1)
    // let { point: p2 } = point(viewer, Cesium.Cartesian3.fromDegrees(117.4703186710001, 31.14388249900003))
    // viewer.entities.add(p2)

    const positions = Cesium.Cartesian3.fromDegreesArray([116.46, 39.892, 116.49, 39.892])
    const line = polyline(viewer, positions)
    // viewer.zoomTo(line)

    // primitive
    let posi = Cesium.Cartesian3.fromDegreesArray([116.46, 39.89, 116.49, 39.89])
    const { primitive } = PolylineGeometry(posi, 50)
    viewer.scene.primitives.add(primitive)
    
    let repo = Cesium.Rectangle.fromDegrees(116.46, 39.88, 116.49, 39.885)
    const rectangle = RectangleGeometry(repo)
    viewer.scene.primitives.add(rectangle)
    // 
    let corr = Cesium.Cartesian3.fromDegreesArray([116.46, 39.887, 116.49, 39.887])
    CorridorGeometry(viewer, corr)


    const outlineOnly = viewer.entities.add({
        name: "Yellow plane outline",
        position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 300000.0),
        plane: {
            plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
            dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
            fill: false,
            outline: true,
            outlineColor: Cesium.Color.YELLOW,
        },
    });
    viewer.zoomTo(outlineOnly)
    

    const poin = [{
        id: '12321321',
        name: "颍红测试点",
        type: "固定枪机",
        state: "在线",
        position: {
            x: 116.4568,
            y: 39.8926
        },
        text: '1'
    }, {
        id: '43244324',
        name: "解放修理厂门口",
        type: "固定枪机",
        state: "在线",
        position: {
            x: 116.4568,
            y: 39.8944
        },
        text: '2'
    }, {
        id: '43764324',
        name: "新华路加油站",
        type: "固定枪机",
        state: "在线",
        position: {
            x: 116.4566,
            y: 39.8923
        },
        text: '3'
    }, {
        id: '437543345',
        name: "康佳大药房",
        type: "固定枪机",
        state: "在线",
        position: {
            x: 116.4513,
            y: 39.8923
        },
        text: '4'
    },]

    function addEntity(e) {
        let pinBuilder = new Cesium.PinBuilder()
        // debugger
        e.map(res => {
            let poin = viewer.entities.add({
                id: res.id,
                name: res.name,
                position: Cesium.Cartesian3.fromDegrees(res.position.x, res.position.y),
                billboard: {
                    image: pinBuilder.fromText(res.text, Cesium.Color.ROYALBLUE, 48).toDataURL(),
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                },
                monitoItems: {
                    data: res
                },
            })
        })
        return e
    }
    //加载点
    addEntity(poin)
    // clickall(viewer)
    viewer.selectedEntityChanged.addEventListener(function (entity) {
        console.log("1", entity.id);
    })
    // 重新改变时
    viewer.trackedEntityChanged.addEventListener(function (enitity) {
        console.log("jjjj", enitity.id);
    })
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
  