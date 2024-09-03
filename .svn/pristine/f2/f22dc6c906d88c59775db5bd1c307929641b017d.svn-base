import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
/**
 * 管道
 * @param arrays 经纬度 加半径
 * @returns 
 */
export function SpolylineVolumeGeometry(arrays: any) {
    let arrgeometry = []
    for (let i = 0; i < arrays.length; i++) {
        const raduis = arrays[i][1]
        // 定义Geometry
        var volume = new Cesium.PolylineVolumeGeometry({
            polylinePositions: arrays[i][0],
            shapePositions: computeCircleR(raduis, 20),
            // id: "dhhsbv",
        });
        // 定义 GeometryInstance
        var instance = new Cesium.GeometryInstance({
            geometry: volume,
            id: 'wdhjksgjk',
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
            },
        });
        arrgeometry.push(instance)
    }
    // 颜色材质
    var material = Cesium.Material.fromType('Color');
    material.uniforms.color = new Cesium.Color(0.0, 0.0, 1.0, 1);

    // Primitive加载
    var primitive = new Cesium.Primitive({
        geometryInstances: arrgeometry, // 多个instance组成的集合
        // appearance: new Cesium.PerInstanceColorAppearance({
        //     translucent: false,
        //     closed: true
        // }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            material,
        })
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
