import * as Cesium from 'cesium'
export function particle() {
    function computeModelMatrix(position: { lon: any; lat: any; alt: any; }) {
        const center = Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.alt)
        const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(center)
        return matrix
      }
    
      function computeEmitterModelMatrix() {
        let hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0);//朝向
        let trs = new Cesium.TranslationRotationScale()
        trs.translation = Cesium.Cartesian3.fromElements(0.0,0.0,0.0);
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr);
        let result = Cesium.Matrix4.fromTranslationRotationScale(trs)
        return result
      }
      let particlefire =  new Cesium.ParticleSystem({
        image: '../../public/img/fire.png',
        startColor:Cesium.Color.RED.withAlpha(0.1),
        endColor:Cesium.Color.YELLOW.withAlpha(0.5),
        imageSize: new Cesium.Cartesian2(5, 5),//图片比例 宽高
        startScale: 0.5,//开始大小
        endScale: 4.0,//结束大小
        minimumParticleLife:1.5,//最短存活时间
        maximumParticleLife:3,//最长存活时间
        // lifetime: 16.0,//粒子系统发射粒子的时间
        minimumSpeed:29,
        maximumSpeed:30,
        emissionRate: 100.0,//粒子数
        // particleLife: 1.0,//粒子生命
        // speed: 5.0,//发射速度
        emitter:new Cesium.CircleEmitter(10.0),//生成区域
        sizeInMeters:true,//true 米为单位 false 像素为单位，大小不变
        modelMatrix:computeModelMatrix({lon:116.491,lat:39.939,alt:0}),//位置 （世界矩阵）
        // modelMatrix: entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
        emitterModelMatrix: computeEmitterModelMatrix(),//模型矩阵
      })
      console.log('particlefire',particlefire);
      return particlefire
}