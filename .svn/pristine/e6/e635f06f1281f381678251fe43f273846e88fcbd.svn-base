import * as Cesium from 'cesium'
/**
 * 弹窗显示
 * @param e 点击的元素
 * @param div 弹窗内容div
 * @param viewer 
 */
export function Popupposition(e, div, viewer) {
  let data = e.id.monitoItems.data
  console.log("eee",e);
  console.log("data",data);
  
  //经纬度转为世界坐标
  let gisPosition = Cesium.Cartesian3.fromDegrees(
    data.position.x,
    data.position.y,
    0
  );
  // const div = document.getElementById('stateShow')
  div.style.display = 'block' //弹出信息框
  //实时更新位置
  viewer.scene.postRender.addEventListener(() => {
    //转化为屏幕坐标
    var windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, gisPosition);
    // console.log("windowPosition",windowPosition);
    div.style.left = (windowPosition.x - 150) + 'px'
    div.style.top = (windowPosition.y - 220) + 'px'
    // console.log("staeshow",div);

    
    //解决滚动不隐藏问题
    // const camerPosition = viewer.camera.position;
    // let height = viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height;
    // height += viewer.scene.globe.ellipsoid.maximumRadius;
    // if (div.style.display === 'block') {
    //   if ((!(Cesium.Cartesian3.distance(camerPosition, gisPosition) > height)) && viewer.camera.positionCartographic.height < 50000000) {
    //     div.style.display = "block"
    //   } else {
    //     div.style.display = "none"
    //   }
    // }
  })
}