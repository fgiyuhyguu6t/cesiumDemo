
import * as Cesium from 'cesium'
// 不能用
export function addPolygonGeometry() {
    const polygon = new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -72.0, 40.0,
                -70.0, 35.0,
                -75.0, 30.0,
                -70.0, 30.0,
                -68.0, 40.0
            ])
        )
    });
    // const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
    const instance = new Cesium.GeometryInstance({
        geometry: polygon
    });
    const primitive= new Cesium.Primitive({
        geometryInstances: instance,
        appearance: new Cesium.MaterialAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: 'Image',
                    uniforms: {   
                        image:'../../../../../public/img/checkerboard.png',
                        repeat:new Cesium.Cartesian2(10,10)
                    }
                }
            })

        })
    })
    return primitive
}