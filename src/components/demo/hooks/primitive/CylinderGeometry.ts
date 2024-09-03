import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
/**
 * 圆柱
 * @returns 
 */
var material = Cesium.Material.fromType('Color');
material.uniforms.color = new Cesium.Color(1.0, 0.0, 1.0, 0.3);//白色透明度0.3
var center = Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)

export function CylinderGeometry() {
    //旋转角度
    let hpr = new Cesium.HeadingPitchRoll(0, 0, Math.PI / 2);
    //位置点
    let origin = Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 100);
    //初始的矩阵
    const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(origin, hpr);

    const cylinder = new Cesium.CylinderGeometry({
        length: 10000, // 圆柱体的长度
        topRadius: 2000, // 圆柱体顶部半径
        bottomRadius: 2000, // 圆柱体底部半径
        slices: 128, // 圆柱体周边的边数
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    })
    var circleInstance = new Cesium.GeometryInstance({
        geometry: cylinder,
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 1.0, 0.0, 0.5)),
            // show : new Cesium.ShowGeometryInstanceAttribute( true ) //显示或者隐藏
        },
        id: 'circle',
        modelMatrix,
        // modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        //   Cesium.Transforms.eastNorthUpToFixedFrame(
        //     Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)
        //   ),
        //   //xyz
        //   new Cesium.Cartesian3(0.0, 0.0, 0.0),
        //   new Cesium.Matrix4()
        // ),
    });
    var primitive = new Cesium.Primitive({
        geometryInstances: circleInstance,
        // appearance: new Cesium.PerInstanceColorAppearance({
        //     translucent: false,
        //     closed: true
        // }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            material: material
        })
    });
    return {primitive,circleInstance}
}

var material = Cesium.Material.fromType('Color');
material.uniforms.color = new Cesium.Color(1.0, 0.0, 1.0, 0.3);//白色透明度0.3
var center = Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)

export function addCylinderGeometry () {
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
    var hprRotation = Cesium.Matrix3.fromHeadingPitchRoll(
        new Cesium.HeadingPitchRoll(0.0, Cesium.Math.toRadians(30), 0.0)// 中心点水平旋转90度
    );
    var hpr = Cesium.Matrix4.fromRotationTranslation(
        hprRotation,
        new Cesium.Cartesian3(0.0, 0.0, 20000.0)// 不平移
    );
    Cesium.Matrix4.multiply(modelMatrix, hpr, modelMatrix);
    
    const primitive =   new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.CylinderGeometry({
                    length: 20000,
                    topRadius: 5000,
                    bottomRadius: 10000
                }),
                id: "CircleGeometry"
            }),
            modelMatrix: modelMatrix,//提供位置与姿态参数
            appearance: new Cesium.EllipsoidSurfaceAppearance({
                aboveGround: false,
                material: material
            })
        })
        return primitive
}
export function addCylinderOutlineGeometry () {
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
    var hprRotation = Cesium.Matrix3.fromHeadingPitchRoll(
        new Cesium.HeadingPitchRoll(0.0, Cesium.Math.toRadians(30), 0.0)// 中心点水平旋转90度
    );
    var hpr = Cesium.Matrix4.fromRotationTranslation(
        hprRotation,
        new Cesium.Cartesian3(0.0, 0.0, 20000.0)// 不平移
    );
    Cesium.Matrix4.multiply(modelMatrix, hpr, modelMatrix);

    const primitive =   new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.CylinderOutlineGeometry({
                    length: 20000,
                    topRadius: 5000,
                    bottomRadius: 10000
                }),
                id: "CircleGeometry"
            }),
            modelMatrix: modelMatrix,//提供位置与姿态参数
            appearance: new Cesium.EllipsoidSurfaceAppearance({
                aboveGround: false,
                material: material
            })
        })
        return primitive
}
