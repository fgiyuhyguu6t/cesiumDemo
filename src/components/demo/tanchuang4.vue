<template>
  <div id="cesiumContainer" class="fullSize">
    <div class="state" id="stateShow">
      <div class="box">
        <div class="box-wrap">
          <div class="close" @click="closeClick">X</div>
          <div class="area">
            <div class="area-title fontColor" id="title"></div>
          </div>
          <div class="content">
            <div class="data-li">
              <div class="data-label textColor">状态：</div>
              <div class="data-value">
                <span class="label-num yellowColor" id="state"></span>
              </div>
            </div>
            <div class="data-li">
              <div class="data-label textColor">类型：</div>
              <div class="data-value">
                <span class="label-num yellowColor" id="type"></span>
                <!-- <span class="label-unit textColor">m³/s</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { point } from './hooks/enitity/enititys';
import Bubble from '../demo/hooks/tanchuang/bubble/index2.ts'
import { addGLTFprimitive } from './hooks/gltf';
import { idText } from 'typescript';
import { Popupposition } from './hooks/tanchuang/popup/popup';
import { tileset } from './hooks/geojson/geojson';
// 弹窗
function closeClick() {
  document.getElementById('stateShow').style.display = "none"
}

onMounted(() => {
  const div = document.getElementById('stateShow')//弹窗
  console.log('div',div);
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
    // destination:  new Cesium.Cartesian3(1332761, -4662399, 4138888),
    destination: Cesium.Cartesian3.fromDegrees(116.39123, 39.90691, 1000),
    // destination: Cesium.Cartesian3.fromDegrees(116.4568, 39.8926, 1000),
    // destination: Cesium.Cartesian3.fromDegrees(117.4603186710001, 31.14388249900003, 30000),
  })
  let { point: p1 } = point(viewer, Cesium.Cartesian3.fromDegrees(117.4603186710001, 31.14388249900003))
  viewer.entities.add(p1)
  let { point: p2 } = point(viewer, Cesium.Cartesian3.fromDegrees(117.4703186710001, 31.14388249900003))
  viewer.entities.add(p2)
  // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  //       Cesium.Cartesian3.fromDegrees(116.4568, 39.8926))
  //      let  modelybz= addGLTFprimitive('../../../public/Models/NoLod_0.glb',modelMatrix,54)
  //      viewer.scene.primitives.add(modelybz)
  //      console.log("cj",viewer.scene.primitives);

  // 创建box的几何实例
  // viewer.zoomTo(modelybz)
  // tileset(viewer)
  // var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) }));
  // var defaultStyle = new Cesium.Cesium3DTileStyle({
  //   color: "color('white', 0.5)", // 让建筑变透明
  //   show: true
  // });
  // city.style = defaultStyle;

//   var tileset =viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//      url : '../../../public/json/scenetree.json',
//     //  url : 'http://localhost:8002/tilesets/Seattle/tileset.json',
//      skipLevelOfDetail : true,
//      baseScreenSpaceError : 1024,
//      skipScreenSpaceErrorFactor : 16,
//      skipLevels : 1,
//      immediatelyLoadDesiredLevelOfDetail : false,
//      loadSiblings : false,
//      cullWithChildrenBounds : true
// }));

// var json = new Cesium.Viewer('cesiumContainer');
// viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../../../public/json/scenetree.json', {
//   stroke: Cesium.Color.HOTPINK,
//   fill: Cesium.Color.PINK,
//   strokeWidth: 3,
//   markerSymbol: '?'
// }));
// console.log("jkds",json);

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
    state: "下线",
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

  function leftDownAction() {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
      var picked = viewer.scene.pick(movement.position)
      if (Cesium.defined(picked) && picked.id.id) {
        console.log("picked", picked);
        Popupposition(picked,div,viewer)//弹窗位置控制
        // 弹窗值回显
        let name = picked.id._name
        let monitoItems = picked.id.monitoItems
        document.getElementById('title').innerHTML = name
        document.getElementById('state').innerHTML = monitoItems.data.state
        document.getElementById('type').innerHTML = monitoItems.data.type
      } else {
        return
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
  leftDownAction()
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

.state {
  display: none;
  width: 200px;
  position: relative;
  bottom: 0;
  left: 0;
}


.close {
  position: absolute;
  color: #fff;
  top: 1px;
  right: 10px;
  text-shadow: 2px 2px 2px #022122;
  cursor: pointer;
  animation: fontColor 1s;
}

.box-wrap {
  position: absolute;
  z-index: 999;
  left: 21%;
  top: 0;
  width: 100%;
  height: 163px;
  border-radius: 50px 0px 50px 0px;
  border: 1px solid #38e1ff;
  background-color: #38e1ff4a;
  box-shadow: 0 0 10px 2px #29baf1;
  animation: slide 2s;
}

.box-wrap .area {
  position: absolute;
  top: 20px;
  right: 0;
  width: 95%;
  height: 30px;
  background-image: linear-gradient(to left, #4cdef9, #4cdef96b);
  border-radius: 30px 0px 0px 0px;
  animation: area 1s;
}

.pine {
  position: absolute;
  /* // left: 0;
  // bottom: -83px; */
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  line-height: 120px;
  text-indent: 5px;
}

.pine::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -83px;
  width: 40%;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #38e1ff;
  transform-origin: bottom center;
  transform: rotateZ(135deg) scale(1.5);
  animation: slash 0.5s;
  filter: drop-shadow(1px 0px 2px #03abb4);
  /* transition: slash 2s; */
}

.area .area-title {
  text-align: center;
  line-height: 30px;
}

.textColor {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}

.yellowColor {
  font-size: 14px;
  font-weight: 600;
  color: #f09e28;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}

.fontColor {
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}

.content {
  padding: 55px 10px 10px 10px;
}

.content .data-li {
  display: flex;
}

@keyframes fontColor {
  0% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }

  40% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }

  100% {
    color: #ffffff;
    text-shadow: 1px 1px 5px #002520d2;
  }
}

@keyframes slide {
  0% {
    border: 1px solid #38e1ff00;
    background-color: #38e1ff00;
    box-shadow: 0 0 10px 2px #29baf100;
  }

  100% {
    border: 1px solid #38e1ff;
    background-color: #38e1ff4a;
    box-shadow: 0 0 10px 2px #29baf1;
  }
}

@keyframes area {
  0% {
    width: 0%;
  }

  25% {
    width: 0%;
  }

  100% {
    width: 95%;
  }
}

/* img{
            position:absolute;
            left:30%;
            top:0;
            width: 100%;
            box-shadow: 0 0 10px 2px #29baf1;
        } */

@keyframes slash {
  0% {
    transform: rotateZ(135deg) scale(0);
  }

  100% {
    transform: rotateZ(135deg) scale(1.5);
  }
}
</style>
  