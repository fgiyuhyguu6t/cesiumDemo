import * as Cesium from 'cesium'
//贴地primitive线
export const abc = new Cesium.GroundPolylinePrimitive({
    geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.GroundPolylineGeometry({//贴地线几何
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([118.120679, 24.515347, 300, 118.220679, 24.515347, 30]),
            width: 10.0,
            // positions: Cesium.Cartesian3.fromDegreesArray([118.120679, 24.515347,118.220679, 24.515347])
        })
    }),
    appearance: new Cesium.PolylineMaterialAppearance({
        material: Cesium.Material.fromType('Color', {
            color: Cesium.Color.RED
        })
    })
})