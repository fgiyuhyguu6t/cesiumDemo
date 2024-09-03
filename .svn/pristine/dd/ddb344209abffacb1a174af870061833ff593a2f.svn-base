import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
export function addGLTFModeleitity(url: string, positions: Cesium.Cartesian3, index: string, viewer?: Cesium.Viewer) {
  // Entity方法加载gltf
  // viewer.entities.removeAll() //加载之前先清楚所有entity
  // const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 0)
  const position = positions
  const heading = Cesium.Math.toRadians(0) //135度转弧度
  const pitch = Cesium.Math.toRadians(0);
  const roll = 0
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  )
  // let randoms = Math.random()

  let models = {
    name: `gltf`,
    id: `aagltf${index}`,
    position: position,
    orientation: orientation,
    model: {
      uri: url,//注意entitits.add方式加载gltf文件时，这里是uri，不是url，并且这种方式只能加载.glb格式的文件
      scale: 1000.0,//缩放比例
      minimumPixelSize: 128,//最小像素大小，可以避免太小看不见
      maximumScale: 128,//模型的最大比例尺大小。minimumPixelSize的上限  
      incrementallyLoadTextures: true,//加载模型后纹理是否可以继续流入
      runAnimations: false,//是否启动模型中制定的gltf动画
      clampAnimations: true,//制定gltf动画是否在没有关键帧的持续时间内保持最后一个姿势
      shadows: Cesium.ShadowMode.ENABLED,
      heightReference: Cesium.HeightReference.NONE,
      silhouetteColor: new Cesium.Color(1.0, 0.0, 1.0, 1),
      silhouetteSize: 8.0,
    }
  }
  // if (viewer) {
  //   // console.log("111125542");
    const entity = viewer.entities.add(models)
  // }


  return models
  // viewer.trackedEntity = entity; // 聚焦模型
  // viewer.zoomTo(entity)
}
export function addGLTFprimitive(url: string, positions: Cesium.Matrix4,index:number) {
  var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(118.120679, 24.515347));
  const modelybz = Cesium.Model.fromGltf({
    url: url,
    id: `11id${index}`,
    modelMatrix: positions,
    scale: 10.0,
  })
  return modelybz
}