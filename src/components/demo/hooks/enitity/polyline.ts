import * as Cesium from 'cesium'
export function polyline(viewer: Cesium.Viewer,positions) {
    var entity = viewer.entities.add({
        polyline: {
            positions:positions,
            // positions: Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]),
            width: 5,
            material: Cesium.Color.RED
        }
    });
    return entity
    // viewer.zoomTo(viewer.entities);
}
export function tdpline(viewer) {
    var entity = viewer.entities.add({
        corridor: {
            positions: Cesium.Cartesian3.fromDegreesArray([112.82436,
                23.071506,
                112.82742,
                23.067512,
                112.828878,
                23.064659,
                112.830799,
                23.060947,
                112.832166,
                24.058329]),
            width: 5,
            material: Cesium.Color.RED
        }
    });
    return entity
}
export function polylines(viewer){
const redLine = viewer.entities.add({
    name: "Red dashed line",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75,
            38,
            0,
            -125,
            38,
            0,
        ]),
        width: 5,
        material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.RED,
        }),
    },
});
const blueLine = viewer.entities.add({
    name: "Wide blue dashed line with a gap color",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75,
            40,
            250000,
            -125,
            40,
            250000,
        ]),
        width: 30,
        material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.BLUE,
            // gapColor: Cesium.Color.YELLOW,
        }),
    },
});
const orangeLine = viewer.entities.add({
    name: "Orange dashed line with a short dash length",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75,
            42,
            250000,
            -125,
            42,
            250000,
        ]),
        width: 5,
        material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.ORANGE,
            dashLength: 8.0,
        }),
    },
});
const cyanLine = viewer.entities.add({
    name: "Cyan dashed line with a dash pattern.",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75,
            44,
            250000,
            -125,
            44,
            250000,
        ]),
        width: 10,
        material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.CYAN,
            dashPattern: parseInt("110000001111", 2),
        }),
    },
});
const yellowLine = viewer.entities.add({
    name: "Yellow dashed line with a dash pattern.",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75,
            46,
            250000,
            -125,
            46,
            250000,
        ]),
        width: 10,
        material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.YELLOW,
            dashPattern: parseInt("1010101010101010", 2),
        }),
    },
});

const redLine2 = viewer.entities.add({
    name: "Red line on terrain",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
      width: 5,
      material: Cesium.Color.RED,
      clampToGround: true,
    },
  });
  
  const greenRhumbLine = viewer.entities.add({
    name: "Green rhumb line",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
      width: 5,
      arcType: Cesium.ArcType.RHUMB,
      material: Cesium.Color.GREEN,
    },
  });
  
  const glowingLine = viewer.entities.add({
    name: "Glowing blue line on the surface",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
      width: 10,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.2,
        taperPower: 0.5,
        color: Cesium.Color.CORNFLOWERBLUE,
      }),
    },
  });
  
  const orangeOutlined = viewer.entities.add({
    name:
      "Orange line with black outline at height and following the surface",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -75,
        39,
        250000,
        -125,
        39,
        250000,
      ]),
      width: 5,
      material: new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.ORANGE,
        outlineWidth: 2,
        outlineColor: Cesium.Color.BLACK,
      }),
    },
  });
  
  const purpleArrow = viewer.entities.add({
    name: "Purple straight arrow at height",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -75,
        43,
        500000,
        -125,
        43,
        500000,
      ]),
      width: 10,
      arcType: Cesium.ArcType.NONE,
      material: new Cesium.PolylineArrowMaterialProperty(
        Cesium.Color.PURPLE
      ),
    },
  });
  
  const dashedLine = viewer.entities.add({
    name: "Blue dashed line",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -75,
        45,
        500000,
        -125,
        45,
        500000,
      ]),
      width: 4,
      material: new Cesium.PolylineDashMaterialProperty({
        color: Cesium.Color.CYAN,
      }),
    },
  });
    
}