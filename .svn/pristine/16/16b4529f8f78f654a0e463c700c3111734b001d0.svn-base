import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
import { materialall } from '../material/material';
export function RectangleGeometry(repo) {
    const rectangle = new Cesium.RectangleGeometry({
        ellipsoid : Cesium.Ellipsoid.WGS84,
        // height : 10000.0,
        rectangle: repo,
        // rectangle: Cesium.Rectangle.fromDegrees(118.0, 24.0, 119.0, 25.0),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    });

    // 定义 GeometryInstance
    var instance = new Cesium.GeometryInstance({
        geometry: rectangle,
        // id: 'wdhjksgjk',
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
        // modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        //     Cesium.Transforms.eastNorthUpToFixedFrame(
        //         Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)
        //     ),
        //     new Cesium.Cartesian3(0.0, 0.0, 100.0),
        //     new Cesium.Matrix4()
        // ),

    });
    var instance1 = new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
            rectangle : Cesium.Rectangle.fromDegrees(-85.0, 20.0, -75.0, 30.0),
            vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
          }),
        // id: 'wdhjksgjk',
        attributes: {
            color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 0.0, 0.8)
        },
        })
    var material = Cesium.Material.fromType('Color');
    material.uniforms.color = new Cesium.Color(0.0, 0.0, 1.0, 1);
    // Primitive加载
    var primitive = new Cesium.Primitive({
        geometryInstances: instance, // 多个instance组成的集合
        // geometryInstances: [instance,instance1], // 多个instance组成的集合
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: true
        }),
        // appearance : new Cesium.EllipsoidSurfaceAppearance({
        //     material : Cesium.Material.fromType('Stripe')
        //   })
    });

    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }

    return primitive
}

export function RectangleGeometry1() {
    const rectangle = new Cesium.RectangleGeometry({
        ellipsoid : Cesium.Ellipsoid.WGS84,
        // height : 10000.0,
        rectangle: Cesium.Rectangle.fromDegrees(118.0, 24.5, 118.1, 24.51),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    });

    // 定义 GeometryInstance
    var instance = new Cesium.GeometryInstance({
        geometry: rectangle,
        // id: 'wdhjksgjk',
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE),
            // color: Cesium.ColorGeometryInstanceAttribute.fromColor( Cesium.Color.BLUE.withAlpha(0.5))
        },
        // modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        //     Cesium.Transforms.eastNorthUpToFixedFrame(
        //         Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)
        //     ),
        //     new Cesium.Cartesian3(0.0, 0.0, 100.0),
        //     new Cesium.Matrix4()
        // ),
    });
    var material = Cesium.Material.fromType('Color');
    material.uniforms.color = new Cesium.Color(0.0, 0.0, 1.0, 1);
    // Primitive加载
    var primitive = new Cesium.Primitive({
        geometryInstances: instance, // 多个instance组成的集合
        // appearance: new Cesium.PerInstanceColorAppearance({
        //     translucent: false,
        //     closed: true
        // }),
        appearance : new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            material : materialall.materialimg3('../../../../../public/img/red.png',1,1)
          })
    });
    return {primitive,instance}
}
