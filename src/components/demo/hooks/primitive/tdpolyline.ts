import * as Cesium from 'cesium'
/**
 * 贴地
 * @param viewer 
 */
export function CorridorGeometry(viewer,corr) {
    var rectanglePrimitive = viewer.scene.primitives.add(new Cesium.GroundPrimitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.CorridorGeometry({
                vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
                positions:corr,
                // positions: Cesium.Cartesian3.fromDegreesArray([
                //     112.82536, 23.071506,
                //     112.832166, 23.058329
                // ]),
                width: 40
            }),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0.0, 1.0, 0.0, 0.5))
            }
        }),
        classificationType: Cesium.ClassificationType.TERRAIN
    }));
}