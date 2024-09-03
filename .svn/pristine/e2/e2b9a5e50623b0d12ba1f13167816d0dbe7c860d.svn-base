<template>
    <div id="cesiumContainer">

    </div>
</template>
  
<script lang='ts' setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { point } from './hooks/enitity/enititys';

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
        destination: Cesium.Cartesian3.fromDegrees(116.4568, 39.8926, 10000),
        // destination: Cesium.Cartesian3.fromDegrees(117.4603186710001, 31.14388249900003, 30000),
    })

    let { point: p1 } = point(viewer, Cesium.Cartesian3.fromDegrees(117.4603186710001, 31.14388249900003))
    viewer.entities.add(p1)
    let { point: p2 } = point(viewer, Cesium.Cartesian3.fromDegrees(117.4703186710001, 31.14388249900003))
    viewer.entities.add(p2)
    viewer.zoomTo(p1)

    function ddd() {
        let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        let id
        // let bubble = new Bubble(viewer)
        handler.setInputAction(function (movement) {
            let pick = viewer.scene.pick(movement.position); //实体的位置
            if (Cesium.defined(pick) && (pick.id.id)) {
                id = pick.id.id;
                console.log('实体id', id)
                // let entiy =poinEntity[id];
                // bubble.addDynamicLabel(id)
                
            } else {
                const ellipsoid = viewer.scene.globe.ellipsoid;
                const cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
                if (cartesian) {     //判断点击的是否是地球
                    //将笛卡尔坐标转换为地理坐标
                    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    //将弧度转为度的十进制度表示
                    const lon = Cesium.Math.toDegrees(cartographic.longitude);
                    const lat = Cesium.Math.toDegrees(cartographic.latitude);
                    const click_point = { longitude: lon, latitude: lat };
                    console.log('地球的坐标', click_point)
                }
            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    // ddd()

    function addDynamicLabel(data) {
        let div = document.createElement("div");
        div.id = data.id;
        div.style.position = "absolute";
        div.style.width = "100px";
        div.style.height = "30px";
        let HTMLTable = `
		<div style="background:rgba(255,122,0,0.4)">${data.title}</div>
    `;
        div.innerHTML = HTMLTable;
        viewer.cesiumWidget.container.appendChild(div);
        console.log("data",data.x);
        
        let gisPosition = Cesium.Cartesian3.fromDegrees(
            data.x,
            data.y,
            0
            );
            // data.position[0],
            // data.position[1],
        //实时更新位置
        viewer.scene.postRender.addEventListener(() => {
            const canvasHeight = viewer.scene.canvas.height;
            const windowPosition = new Cesium.Cartesian2();
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                viewer.scene,
                gisPosition,
                windowPosition
            );
            div.style.bottom = canvasHeight - windowPosition.y + "px";
            const elWidth = div.offsetWidth;
            div.style.left = windowPosition.x - elWidth / 2 + "px";

            //解决滚动不隐藏问题
            const camerPosition = viewer.camera.position;
            let height = viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height;
            height += viewer.scene.globe.ellipsoid.maximumRadius;
            // console.log(camerPosition, val.position)
            if ((!(Cesium.Cartesian3.distance(camerPosition, gisPosition) > height)) && viewer.camera.positionCartographic.height < 50000000) {
                div.style.display = "block"
            } else {
                div.style.display = "none"
            }
        }, this);
    }

    // addDynamicLabel('dsd')

    const setEvent = () => {
        // 左键点击事件
        let leftclick = Cesium.ScreenSpaceEventType.LEFT_CLICK;
        viewer.screenSpaceEventHandler.removeInputAction(leftclick);
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((movement) => {
            // 返回笛卡尔2坐标系 - 为点击点位置
            // 获取点击的实体
            const pick = viewer.scene.pick(movement.position);
            // console.log('pick', pick);

            if (!pick || !pick.id) {
                // console.log("没选中");
                return false;

            }
            const pick_obj = Cesium.defaultValue(pick.id, pick.primitive.id);
            console.log("pick_obj", pick_obj);
            // 判断是否是Cesium实体
            if (pick_obj instanceof Cesium.Entity) {
                console.log("是不是entity", pick_obj.position?._value.x);
                // 经纬度转笛卡尔3
                const cartesian3 = Cesium.Cartesian3.fromDegrees(
                    Number( pick_obj.position?._value.x),
                    Number( pick_obj.position?._value.y),
                    0.1
                );
                // 获取实体笛卡尔2坐标系
                const screenposition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                    viewer.scene,
                    cartesian3
                );
                console.log("screenposition",cartesian3, screenposition);
                // 这里使用实体的坐标而不是用点击点的坐标，为了防止弹框位置相对于点位置不固定
                // createPopwinOnMap(pick_obj.data, screenposition);
                addDynamicLabel(cartesian3)
            }
        }, leftclick)

    }

    setEvent()

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

.botton {
    position: relative;
    top: -200px;
    left: 0;
}

</style>
  