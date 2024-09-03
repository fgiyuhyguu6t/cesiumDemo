<template>
  <div id="cesiumViewer">
    <input
      type="button"
      value="自定义html"
      @click="addHtml"
      style="
        position: absolute;
        left: 50px;
        top: 50px;
        background: blue;
        color: white;
        z-index: 9999;
        font-size: 24px;
      "
    />

    <div
      id="tooltip-view"
      class="cesium-popup"
      style="z-index: 9999; display: none; pointer-events: none"
    >
      <a
        class="cesium-popup-close-button cesium-popup-color"
        onclick="document.getElementById('tooltip-view').style.display='none';"
        >×</a
      >
      <div class="cesium-popup-background" style="padding: 1px 0">
        <div
          id="tooltip-content"
          class="cesium-popup-content cesium-popup-color"
        >
          <table style="width: 200px; color: white">
            <tr>
              <th
                scope="col"
                colspan="4"
                style="text-align: center; font-size: 15px"
              >
                七天酒店
              </th>
            </tr>
            <tr>
              <td>住用单位：</td>
              <td>XX单位</td>
            </tr>
            <tr>
              <td>建筑面积：</td>
              <td>43平方米</td>
            </tr>
            <tr>
              <td>建筑层数：</td>
              <td>2</td>
            </tr>
            <tr>
              <td>建筑结构：</td>
              <td>钢混</td>
            </tr>
            <tr>
              <td>建筑年份：</td>
              <td>2006年</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right">
                <a
                  style="color: aqua; pointer-events: auto"
                  href="javascript:showXQ()"
                  >详情</a
                >
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="cesium-popup-tip-container">
        <div class="cesium-popup-tip cesium-popup-background"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as Cesium from "cesium";
var mapOption = {
  //url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  url: "https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}", //高德地图
};
var imgProvider = new Cesium.UrlTemplateImageryProvider(mapOption);

let viewer = null;
onMounted(async () => {
  var viewerOption = {
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    scene3DOnly: false, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    baselLayerPicker: false, // 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true, //是否显示背影
    shouldAnimate: true,
  };
  viewer = new Cesium.Viewer("cesiumViewer", viewerOption);
  viewer.imageryLayers.get(0).show = false; //不加载cesium默认地图
  viewer._cesiumWidget._creditContainer.style.display = "none"; //去除版权信息
  viewer.imageryLayers.addImageryProvider(imgProvider);
  console.log("viewer.imageryLayers", viewer.imageryLayers);

  await addTerrain("http://data.marsgis.cn/terrain");

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      118.0850887298584,
      24.379001083374023,
      8000
    ),
    orientation: {
      // 指向
      heading: Cesium.Math.toRadians(0, 0),
      // 视角
      pitch: Cesium.Math.toRadians(-50),
      roll: 0.0,
    },
  });

  console.log("viewer1", viewer);

  var riverHandle = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  // 对鼠标按下事件的监听
  riverHandle.setInputAction(function (event) {
    //获取加载地形后对应的经纬度和高程：地标坐标
    var ray = viewer.camera.getPickRay(event.position);
    var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (Cesium.defined(cartesian)) {
      // 转换为经纬度
      const cartographic =
        viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
      const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
      const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
      const height = viewer.scene.globe.getHeight(cartographic);
      // 输出点击的经纬度和高度
      console.log("采集坐标：" + longitudeString + "," + latitudeString);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});

//添加地形服务
const addTerrain = async (url) => {
  try {
    var terrainLayer = await Cesium.CesiumTerrainProvider.fromUrl(url, {});
    viewer.scene.terrainProvider = terrainLayer;
    return terrainLayer;
  } catch (error) {
    console.log(`Error loading tileset: ${error}`);
  }
};

/**
 * 获取某个点的地形高度
 * 输入：[118,24]
 * 输出：100.0
 * @param {*} LngLat
 * @returns
 */
const getHeightAtPoint = async (LngLat) => {
  let cartographics = [Cesium.Cartographic.fromDegrees(LngLat[0], LngLat[1])];
  console.log("getHeightAtPoint--cartographics", cartographics);

  try {
    const updatedPositions = await Cesium.sampleTerrain(
      viewer.terrainProvider,
      15,
      cartographics,
      true
    );
    console.log("updatedPositions23232", updatedPositions);
    let height = updatedPositions[0].height;
    return height;
  } catch (error) {
    console.log(error);
  }
};

const addHtml = async () => {
  let height = await getHeightAtPoint([118.10104218566121, 24.44603604444978]);
  console.log("高度值：", height);
  let lngLatHeight = [118.10104218566121, 24.44603604444978, height];
  let offset = { top: 0, left: 0 };
  //获取html元素对象也可用ref方式，如：this.$refs.myButton
  let htmlOverlay = document.getElementById("tooltip-view");
  htmlOverlay.lngLatHeight = lngLatHeight;
  //htmlOverlay.name = element.name;
  addHtmlForVue(lngLatHeight, htmlOverlay, offset);
};

const addHtmlForVue = (lngLatHeight, htmlOverlay, offset) => {
  if (htmlOverlay.removeListener) {
    htmlOverlay.removeListener();
  }

  htmlOverlay.style.position = "absolute";
  var scratch = new Cesium.Cartesian2();
  htmlOverlay.removeListener = viewer.scene.preRender.addEventListener(
    function () {
      var position = Cesium.Cartesian3.fromDegrees(
        lngLatHeight[0],
        lngLatHeight[1],
        lngLatHeight[2]
      );
      var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(
        position,
        scratch
      );
      if (Cesium.defined(canvasPosition)) {
        let top = htmlOverlay.offsetHeight + offset.top;
        let left = htmlOverlay.offsetWidth / 2 + offset.left;
        htmlOverlay.style.top = canvasPosition.y - top + "px";
        htmlOverlay.style.left = canvasPosition.x - left + "px";
      } else {
      }

      if (htmlOverlay.style.display == "none") {
        window.setTimeout(() => {
          htmlOverlay.style.display = "block";
        }, 50);
      }
    }
  );
  return htmlOverlay;
};
</script>

<style scoped>
#cesiumViewer {
  width: 100%;
  height: 100%;
}

.cesium-popup {
  position: absolute;
  left: 0;
  top: 5px;
  text-align: left;
}

.cesium-popup-background {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
}

.cesium-popup-content-wrapper {
  text-align: center;
  max-height: 600px;
  overflow-y: auto;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  text-align: left;
  border-radius: 3px;
}

.cesium-popup-color {
  color: white;
}

.cesium-popup-content {
  margin: 15px 10px 10px;
  line-height: 1.4;
  font-size: 13px;
  max-width: 439px;
  min-width: 50px;
}

.cesium-popup-tip-container {
  margin: 0 auto;
  width: 40px;
  height: 13px;
  position: relative;
  overflow: hidden;
}

.cesium-popup-tip {
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  width: 17px;
  height: 17px;
  padding: 1px;
  margin: -10px auto 0;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.cesium-popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 4px 0 0;
  text-align: center;
  width: 18px;
  height: 14px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  text-decoration: none;
  font-weight: 700;
  background: transparent;
  z-index: 9999;
}

.cesium-popup-close-button:hover {
  cursor: pointer;
  color: #23527c;
}
</style>
