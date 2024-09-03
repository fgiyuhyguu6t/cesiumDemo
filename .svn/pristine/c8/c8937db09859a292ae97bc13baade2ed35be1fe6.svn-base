import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
/**
 * 圆柱
 * @returns 
 */

var material = Cesium.Material.fromType('Color');
material.uniforms.color = new Cesium.Color(1.0, 0.0, 1.0, 0.3);//白色透明度0.3
var center = Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)

export function addCircleGeometry() {
    const primitive = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.CircleGeometry({
                center: center,
                // radius: new Cesium.CallbackProperty(()=>{return 2000},false),
                radius: 2000,
                // height: 120000, //矩形离椭球体的高度
                // numberOfVerticalLines: 16 // 圆的边线条数，越多圆的形状越光滑
            }),
            id: "CircleGeometry"
        }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            material: material
        })
    })
    return primitive
}


export function addCircleOutlineGeometry() {
    // 创建circleOutline几何
    var circleOutlineGeometry = new Cesium.CircleOutlineGeometry({
        center:center, // 圆的中心点
        // center: Cesium.Cartesian3.fromDegrees(-70, 45), // 圆的中心点
        radius: 100000.0, // 圆的半径
        // 圆所在的椭球体
        ellipsoid: Cesium.Ellipsoid.WGS84,
        height: 0.0,
        granularity: 0.02, // 圆弧上的点之间的弧度角
        extrudedHeight: 0.0,
        numberOfVerticalLines: 16, // 圆拉伸后顶部和底部之间线条的个数
    });
    // 创建CircleOutline的几何实例
    var circleOutlineInstance = new Cesium.GeometryInstance({
        geometry: circleOutlineGeometry,
        // modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        //   Cesium.Transforms.eastNorthUpToFixedFrame(
        //     Cesium.Cartesian3.fromDegrees(-72, 40)
        //   ),
        //   new Cesium.Cartesian3(0.0, 0.0, 1000.0),
        //   new Cesium.Matrix4()
        // ),
        id: "circleOutline",
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.RED
            ),
            // show: new Cesium.ShowGeometryInstanceAttribute(true), //显示或者隐藏
        },
    });
    const primitive = new Cesium.Primitive({
        geometryInstances: circleOutlineInstance,
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: false,
        }),
    })
    return primitive
}
// export function addCircleOutlineGeometry() {
//     const primitive = new Cesium.Primitive({
//         geometryInstances: new Cesium.GeometryInstance({
//             geometry: new Cesium.CircleOutlineGeometry({
//                 // center : center,
//                 center: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347),
//                 radius: 3000.0,
//                 height: 1200,
//                 // 圆所在的椭球体
//                 ellipsoid: Cesium.Ellipsoid.WGS84,
//                 granularity: 0.02, // 圆弧上的点之间的弧度角
//                 extrudedHeight: 0.0,
//                 numberOfVerticalLines: 16, // 圆拉伸后顶部和底部之间线条的个数
//             }),
//             id: "CircleGeometry"
//         }),
//         appearance: new Cesium.EllipsoidSurfaceAppearance({
//             aboveGround: false,
//             material: material
//         })
//     })
//     return primitive
// }
