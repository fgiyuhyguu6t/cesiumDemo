import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
export function boxGeometryprimitive() {
    // var boxGeometry = Cesium.BoxGeometry.fromDimensions({
    var boxGeometry = new Cesium.BoxGeometry({
        minimum: new Cesium.Cartesian3(0, 0, 0), // 最小x，y和z坐标
        maximum: new Cesium.Cartesian3(2500.0, 2500.0, 2500.0), // 最大x，y和z坐标
        // 要计算的顶点属性  type:VertexFormat
        // dimensions: new Cesium.Cartesian3(8.0, 5.0, 8.0),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
    });
    // 创建box的几何实例
    var boxInstance = new Cesium.GeometryInstance({
        geometry: boxGeometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
            Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)
            ),
            new Cesium.Cartesian3(0.0, 0.0, 1000.0),
            new Cesium.Matrix4()
        ),
        id: "box",
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                new Cesium.Color(1, 1, 1, 1)
            ),
            // show: new Cesium.ShowGeometryInstanceAttribute(true),
        },
    });

    const primitive = new Cesium.Primitive({
        geometryInstances: boxInstance,
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: false,
        }),
    })
    return primitive
}
export function boxGeometryprimitive1() {
    const primitive = new Cesium.ClassificationPrimitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: Cesium.BoxGeometry.fromDimensions({
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
                dimensions: new Cesium.Cartesian3(8.0, 5.0, 8.0),
            }),
            modelMatrix: Cesium.Matrix4.multiplyByTranslation(
                Cesium.Transforms.eastNorthUpToFixedFrame(
                    Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)
                ),
                new Cesium.Cartesian3(0.0, 0.0, 1000.0),
                new Cesium.Matrix4()
            ),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                    new Cesium.Color(1.0, 0.0, 0.0, 0.5)
                ),
                show: new Cesium.ShowGeometryInstanceAttribute(true),
            },
            id: "volume",
        }),
        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
    })
    return primitive
}
export function boxGeometryprimitive2() {
    // console.log("array", arrays[0].x);
    // 定义Geometry
    // var volume = new Cesium.PolylineVolumeGeometry({
    //     polylinePositions: arrays,
    //     shapePositions: computeCircleR(700, 20),
    //     // id: "dhhsbv",
    // });

    const box = new Cesium.BoxGeometry({
        maximum: new Cesium.Cartesian3(500.0, 500.0, 500.0),
        minimum: new Cesium.Cartesian3(2500.0, 2500.0, 2500.0),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//贴图影响
    })
    // 定义 GeometryInstance
    var instance = new Cesium.GeometryInstance({
        geometry: box,
        id: 'wdhjksgjk',
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
            Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(118.181679, 24.515347)
            ),
            new Cesium.Cartesian3(0.0, 0.0, 1000.0),
            new Cesium.Matrix4()
        ),
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.BLUE
            ),
        },

    });
    // var material = Cesium.Material.fromType('Color');
    // material.uniforms.color = new Cesium.Color(0.0, 0.0, 1.0, 1);
    // Primitive加载
    var primitive = new Cesium.Primitive({
        geometryInstances: instance, // 多个instance组成的集合
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: false,//当 true 时，几何体应该是关闭的，所以 Appearance#renderState 启用了背面剔除
        }),
        // appearance: new Cesium.EllipsoidSurfaceAppearance({
        //   aboveGround: false,
        //   material,
        // })
    });

    // function computeCircleR(radius: number, itemp: number) {
    //     let result = [];
    //     for (let i = 0; i < 360; i += itemp) {
    //         let radians = Cesium.Math.toRadians(i);
    //         result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
    //     }
    //     return result;
    // }

    return primitive
}

// viewer.scene.primitives.add(new Cesium.Primitive({
//     geometryInstances: new Cesium.GeometryInstance({
//       geometry: new Cesium.BoxGeometry({
//         minimum: new Cesium.Cartesian3(0, 0, 0), // 最小x，y和z坐标
//         maximum: new Cesium.Cartesian3(2500.0, 2500.0, 2500.0), // 最大x，y和z坐标
//         // 要计算的顶点属性  type:VertexFormat
//         // dimensions: new Cesium.Cartesian3(8.0, 5.0, 8.0),
//         vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
//       }),
//       modelMatrix: Cesium.Matrix4.multiplyByTranslation(
//         Cesium.Transforms.eastNorthUpToFixedFrame(
//           Cesium.Cartesian3.fromDegrees(116.4568, 39.8926)
//         ),
//         new Cesium.Cartesian3(0.0, 0.0, 0.0),
//         new Cesium.Matrix4()
//       ),
//       id: "box",
//       attributes: {
//         color: Cesium.ColorGeometryInstanceAttribute.fromColor(
//           new Cesium.Color(1, 1, 1, 1)
//         ),
//       },
//     }),
//     appearance: new Cesium.MaterialAppearance({
//       material: new Cesium.Material({
//         fabric: {
//           type: 'Color',
//           uniforms: {
//             color: new Cesium.Color(1.0, 1.0, 0.0, 1.0)
//           }
//         }
//       })
//     })
//   }))