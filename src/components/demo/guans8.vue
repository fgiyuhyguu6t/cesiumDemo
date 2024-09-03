<template>
    <div id="cesiumContainer"></div>
    <div class="botton">
        <!-- <a-button type="primary" @click="onclick"> Button</a-button> -->
    </div>
</template>
  
<script lang='ts' setup>
import { onMounted, ref, watch, onBeforeUpdate } from 'vue'
import * as Cesium from 'cesium'
import gsap from 'gsap'
import {
    CylinderGeometry, PolylineVolumeGeometry,
    Polylineprimitive, PolylineGeometry1,
    PolylineVolumeGeometry2, guans,
    SpolylineVolumeGeometry, radius,
    addGLTFModeleitity, addGLTFprimitive,
    clickmoodel, clickmoodel1, clickmoodel2, clickmoodel3, clickmoodel5,
    RectangleGeometry, RectangleGeometry1
} from './hooks';
import { clickmoodel8 } from './hooks/clickmoodel.ts';
// 118.028693,24.425362
// 118.317875,24.626291
import { maps, materialall } from './hooks/material/material.ts'
import { addPolygonGeometry } from './hooks/primitive/PolygonGeometry';
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
            let { primitive } = Polylineprimitive(ps1)
            viewer.scene.primitives.add(primitive);
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
function computeCircleR(radius, itemp) {
    let result = [];
    for (let i = 0; i < 360; i += itemp) {
        let radians = Cesium.Math.toRadians(i);
        result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
    }
    return result;
}

function onclick() {
    console.log("dkfjvn");
    let div = document.createElement('div')
    div.setAttribute('class', 'cesium')
    div.style.width = '250px'
    div.style.height = '250px'
    div.style.position = 'absolute';
    div.style.backgroud = 'pink';
    let app = document.getElementById('cesiumContainer')
    app.appendChild(div)
}
onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
        // destination: Cesium.Cartesian3.fromDegrees(-72.0, 40.0, 10000),
        destination: Cesium.Cartesian3.fromDegrees(117.4603186710001, 31.14388249900003, 10000),
        // destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 50000),
    })
    function abc(position) {
        viewer.entities.add({
            id: 'pick_id_',
            name: 'point',
            position: Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude),
            // position: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347),
            point: { //点
                pixelSize: 5,
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2
            },
            label: { //文字标签
                text: 'I am a point',
                font: '14pt monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
                pixelOffset: new Cesium.Cartesian2(0, -9)   //偏移量
            },
            billboard: { //图标
                image: '../../../public/img/f.png',
                width: 64,
                height: 64,
                pixelOffset: new Cesium.Cartesian2(0, -32)   //偏移量
            },
        })
    }

    function dji() {
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((click) => {
            // 屏幕坐标转世界坐标——关键点
            const ellipsoid = viewer.scene.globe.ellipsoid;
            const cartesian = viewer.camera.pickEllipsoid(click.position, ellipsoid);
            if (cartesian) {     //判断点击的是否是地球
                //将笛卡尔坐标转换为地理坐标
                const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                //将弧度转为度的十进制度表示
                const lon = Cesium.Math.toDegrees(cartographic.longitude);
                const lat = Cesium.Math.toDegrees(cartographic.latitude);
                const click_point = { longitude: lon, latitude: lat };
                //    abc(click_point)
                createPopupImage('idnumber', "../../../public/img/normal_popup.png", "normal", 'idnumber' + "段", click_point);
                console.log(click_point)
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    var curPopupEntity = null;
    function createPopupImage(id, imgUrl, status, title, centerPoint) {
        const canvas = document.createElement("canvas");
        canvas.width = 182;
        canvas.height = 175;
        const ctx = canvas.getContext("2d");
        const backgroundImage = new Image();
        backgroundImage.src = imgUrl;
        backgroundImage.onload = () => {
            if (ctx) {
                ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#FFFFFF";
                ctx.font = "400 18px SourceHanSansSC-Bold, SourceHanSansSC";
                ctx.fillText(title, 15, 25);
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "16px SourceHanSansSC-Bold, SourceHanSansSC";
                ctx.fillText("是否流动", 15, 60);
                ctx.fillText("当前水压", 15, 90);
                ctx.fillText("瞬时流量", 15, 120);
                ctx.fillText("累积流量", 15, 150);

                // 红
                ctx.fillStyle = "#FFFFFF";
                if (status === "warn") {
                    ctx.fillStyle = "#FF6265";
                // 绿
                } else if (status === "normal") {
                    ctx.fillStyle = "#00F9C2";
                }
                ctx.font = "bold 16px SourceHanSansSC-Bold, SourceHanSansSC";
                ctx.fillText("是", 100, 60);
                ctx.fillText(Math.random().toFixed(2), 100, 90);
                ctx.fillText((Math.random() * 10).toFixed(2), 100, 120);
                ctx.fillText((Math.random() * 100).toFixed(2), 100, 150);

                ctx.fillStyle = "#FFFFFF";
                ctx.font = "16px SourceHanSansSC-Bold, SourceHanSansSC";
                ctx.fillText("", 140, 60);
                ctx.fillText("mpa", 140, 90);
                ctx.fillText("m³/s", 140, 120);
                ctx.fillText("m³", 140, 150);

                if (curPopupEntity != null) {
                    console.log("已存在");
                    viewer.entities.remove(curPopupEntity);
                    // 
                    curPopupEntity = null;
                }
                curPopupEntity = viewer.entities.add({
                    id: "popup_" + id,
                    position: Cesium.Cartesian3.fromDegrees(centerPoint.longitude, centerPoint.latitude, 12),
                    billboard: {
                        image: canvas.toDataURL(),
                        width: 182,
                        height: 175,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        scaleByDistance: new Cesium.NearFarScalar(300, 1, 400, 0.6),
                    },
                    show: true,
                });

                //resolve(canvas.toDataURL());
            } else {
                //reject(new Error("无法获取Canvas上下文"));
            }
        };
        backgroundImage.onerror = () => {
            //reject(new Error("背景图片加载失败"));
        };
    }
    
    dji()

    // const model = addPolygonGeometry()
    // viewer.scene.primitives.add(model)

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
  