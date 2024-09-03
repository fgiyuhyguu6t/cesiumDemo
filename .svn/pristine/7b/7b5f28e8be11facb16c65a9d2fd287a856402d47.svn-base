import * as Cesium from 'cesium'
// 发光
const pm1=new Cesium.PolylineGlowMaterialProperty({
    glowPower : 0.5,
    color : Cesium.Color.BLUE
//     属性说明如下：
// – color 发光的颜色(中心颜色为白色)
// – glowPower 发光的长度，值为线宽的百分比(0~1.0)
});
const pm2=new Cesium.PolylineOutlineMaterialProperty({
    color : Cesium.Color.ORANGE,
    outlineWidth : 3,
    outlineColor : Cesium.Color.BLACK
// – color 线的颜色
// – outlineWidth 线纹理宽度
// – outlineColor 线纹理颜色
});
// 虚线
const pm3 =new Cesium.PolylineDashMaterialProperty({
    color: Cesium.Color.CYAN,
  })
//   箭头
const pm4 =new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE)

export let polylinematerialall={
    pm1,pm2,pm3,pm4
}