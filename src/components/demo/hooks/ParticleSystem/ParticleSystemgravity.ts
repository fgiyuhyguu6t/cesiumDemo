import * as Cesium from 'cesium'
export function ParticleSystemgravity(viewer) {
  function computeModelMatrix(position) {
    const center = Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.alt)
    const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(center)
    return matrix
  }

  function computeEmitterModelMatrix() {
    let hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0);//朝向
    let trs = new Cesium.TranslationRotationScale()
    trs.translation = Cesium.Cartesian3.fromElements(0.0, 0.0, 0.0);
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr);
    let result = Cesium.Matrix4.fromTranslationRotationScale(trs)
    return result
  }
  function applyGravity(particle, dt) {
    const position = particle.position;
    // 粒子坐标
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartographic = ellipsoid.cartesianToCartographic(position)
    let lat = Cesium.Math.toDegrees(cartographic.longitude)
    let lng = Cesium.Math.toDegrees(cartographic.latitude)
    let alt = cartographic.height
    //粒子吹向
    var lat1 = lat
    var lng1 = lng + 0.01
    var position1 = Cesium.Cartesian3.fromDegrees(lng1, lat1, alt)
    var vectorspeed = new Cesium.Cartesian3(position1.x - position.x, position1.y - position.y, position1.z - position.z)
    vectorspeed = Cesium.Cartesian3.normalize(vectorspeed, vectorspeed);
    Cesium.Cartesian3.fromElements(
      vectorspeed.x * 1.5,
      vectorspeed.y * 1.5,
      vectorspeed.z * 1.5,
      vectorspeed
    )
    Cesium.Cartesian3.multiplyByScalar(vectorspeed, -9.8 * dt, vectorspeed);
    particle.velocity = Cesium.Cartesian3.add(particle.velocity, vectorspeed, particle.velocity);

    // const gravityVector = Cesium.Cartesian3.normalize(position, new Cesium.Cartesian3());
    // Cesium.Cartesian3.multiplyByScalar(gravityVector, -9.8 * dt, gravityVector);
    // particle.velocity = Cesium.Cartesian3.add(particle.velocity, gravityVector, particle.velocity);
  }
  let particle = new Cesium.ParticleSystem({
    image: '../../public/img/fire.png',
    startColor: Cesium.Color.RED.withAlpha(0.1),
    endColor: Cesium.Color.YELLOW.withAlpha(0.5),
    imageSize: new Cesium.Cartesian2(1, 1),//图片比例 宽高
    startScale: 4,//开始大小
    endScale: 5,//结束大小
    minimumParticleLife: 5,//最短存活时间
    maximumParticleLife: 6,//最长存活时间
    // lifetime: 16.0,//粒子系统发射粒子的时间
    minimumSpeed: 10,
    maximumSpeed: 15,
    emissionRate: 100.0,//粒子数
    // particleLife: 1.0,//粒子生命
    // speed: 5.0,//发射速度
    emitter: new Cesium.CircleEmitter(10.0),//生成区域
    sizeInMeters: true,//true 米为单位 false 像素为单位，大小不变
    modelMatrix: computeModelMatrix({ lon: 116.49, lat: 39.932, alt: 0 }, Cesium.JulianDate.now()),//位置 （世界矩阵）
    // modelMatrix: entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    emitterModelMatrix: computeEmitterModelMatrix(),//模型矩阵
    updateCallback: applyGravity //重力
  })
      return particle
}