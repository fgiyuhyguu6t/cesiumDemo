import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
import { maps,materialall } from './material/material.ts'
/**
 * 多段柱体
 * @param arrays 
 * @returns 
 */
/**
 * primitive
 * @param arrays 
 * @returns 
 */
export function PolylineVolumeGeometry(arrays: any) {
    // console.log("array",arrays);
    // 定义Geometry
    var volume = new Cesium.PolylineVolumeGeometry({
        polylinePositions: arrays,
        // 第一个参是宽度
        shapePositions: computeCircleR(20, 20),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
    });
    // 定义 GeometryInstance
    let randoms = Math.random()
    var instance = new Cesium.GeometryInstance({
        geometry: volume,
        id: `11line${randoms}`,
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        },
    });
    var material = Cesium.Material.fromType('Color');
    material.uniforms.color = new Cesium.Color(0.0, 0.0, 1.0, 0.5);
    // Primitive加载
    var primitive = new Cesium.Primitive({
        releaseGeometryInstances: false,//显示geometryInstances
        geometryInstances: instance, // 多个instance组成的集合
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: true
        }),
        // appearance: new Cesium.EllipsoidSurfaceAppearance({
        //     aboveGround: false,
        //     material,
        // })
    });

    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }
    return {
        primitive: primitive,
        instance: instance,
        // instance.id,
    }
}
export function Polylineprimitive(arrays: any) {
    // console.log("array",arrays);
    // 定义Geometry
    var volume = new Cesium.PolylineVolumeGeometry({
        polylinePositions: arrays,
        // 第一个参是宽度
        shapePositions: computeCircleR(200, 2),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
    });
    // 定义 GeometryInstance
    let randoms = Math.random()
    var instance = new Cesium.GeometryInstance({
        geometry: volume,
        id: `11line${randoms}`,
        // attributes: {
        //     color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        // },
    });
    var material = Cesium.Material.fromType('Color');
    material.uniforms.color = new Cesium.Color(0.0, 1.0, 1.0, 0.5);
    // console.log("464646",materialall.materialimgld('../../../../public/img/111.png'));
    
    // Primitive加载
    var primitive = new Cesium.Primitive({
        releaseGeometryInstances: false,//显示geometryInstances
        geometryInstances: instance, // 多个instance组成的集合

        // appearance: new Cesium.MaterialAppearance({
        //     // aboveGround: false,
        //     // material: materialall.materialimg2('../../../../public/img/111.png')
        //     material: materialall.materialimg3('../../../../public/img/111.png',-100,1)
        //     // material:materialall.materialimg1
        //     // material:materialall.materialimg('../../../../public/img/red.png'),
        // })

        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            // material: materialall.materialimgld('../../../../public/img/111.png'),
            // material:materialall.materialimgtime(),//流动
            material: materialall.materialimg2('../../../../public/img/mood.jpg',100,1),
            // material: materialall.materialimg3('../../../../public/img/111.png',-100,1)
        })
        //  appearance: maps.EllipsoidSurfaceAppearance('../../../public/img/dd.png')
    });

    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }
    return {
        primitive: primitive,
        instance: instance,
        // instance.id,
    }
}
export function PolylineVolumeGeometry1(arrays: any, ys: Cesium.ColorGeometryInstanceAttribute, id: string, width: number) {
    // 定义Geometry
    var volume = new Cesium.PolylineVolumeGeometry({
        polylinePositions: arrays,
        // 第一个参是宽度
        shapePositions: computeCircleR(width, 20),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
    });
    // 定义 GeometryInstance
    // let randoms= Math.random()
    var instance = new Cesium.GeometryInstance({
        geometry: volume,
        // id: id,
        id:`1id${id}`,
        // id: `11line${randoms}`,
        attributes: {
            color: ys,
            // color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0, 1, 0, 0.5))
        },
    });

    var material = Cesium.Material.fromType('Color');
    material.uniforms.color = new Cesium.Color(0.0, 0.0, 1.0, 0.5);
    // Primitive加载
    // var primitive = new Cesium.Primitive({
    //     releaseGeometryInstances: false,//显示geometryInstances
    //     geometryInstances: instance, // 多个instance组成的集合
    //     appearance: new Cesium.PerInstanceColorAppearance({
    //         translucent: false,
    //         closed: true
    //     }),

    //     // appearance: new Cesium.EllipsoidSurfaceAppearance({
    //     //   aboveGround: false,
    //     //   material,
    //     // })
    // });

    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }

    return {
        // primitive,
        instance
        // instance.id,
    }
}
export function PolylineVolumeGeometry3(arrays: any, ys: Cesium.ColorGeometryInstanceAttribute, width: number) {
    // 定义Geometry
    var volume = new Cesium.PolylineVolumeGeometry({
        polylinePositions: arrays,
        // 第一个参是宽度
        shapePositions: computeCircleR(width, 20),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,//要计算的顶点属性
    });
    // 定义 GeometryInstance
    let randoms = Math.random()
    var instance = new Cesium.GeometryInstance({
        geometry: volume,
        // id:id,
        id: `11line${randoms}`,
        attributes: {
            color: ys,
            // color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0, 1, 0, 0.5))
        },
    });
    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }

    return { instance }
}
function computeCircleR(radius: number, itemp: number) {
    let result = [];
    for (let i = 0; i < 360; i += itemp) {
        let radians = Cesium.Math.toRadians(i);
        result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
    }
    return result;
}