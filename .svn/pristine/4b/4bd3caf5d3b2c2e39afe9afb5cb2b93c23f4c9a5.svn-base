import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
import { radius } from '../random'
import { maps } from '../material/material'
/**
 * 多段线
 * @param arrays 
 * @returns 
 */
export function PolylineGeometry(arrays: any,width: number | undefined) {

    const geometryline = new Cesium.PolylineGeometry({
        positions: arrays,
        width,
        // width:new Cesium.CallbackProperty(getPolylinewidth, false),

    })
    // console.log("11",new Cesium.CallbackProperty(getPolylinewidth, false));
    
    // function getPolylinewidth() {
    //     var zoomlevel = viewer.scene.screenSpaceCameraController.zoomLevel;
    //     var linewidth = 5 / zoomLevel;
    //     return linewidth;
    // }
    let randoms= Math.random()
    const geometryInstance = new Cesium.GeometryInstance({
        geometry: geometryline,
        id: `id${randoms}`,
    })

    const aaa = new Cesium.Color(1.0, 1.0, 1.0, 1)
// GroundPrimitive
// Primitive
    const primitive= new Cesium.Primitive({
        geometryInstances: geometryInstance,
        appearance: maps.PolylineMaterialAppearance('../../../public/img/dd.png', aaa)
    })
    // viewer.scene.primitives.add(Primitive);
    return { geometryline, geometryInstance,primitive}
}

export function PolylineGeometry1(arrays: any, viewer: { scene: { primitives: { add: (arg0: Cesium.Primitive) => void } } }) {
    let geometryInstances = []
    let numbers = ref(1000)

    for (let index = 0; index < numbers.value; index++) {
        const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()

        let ps1 = Cesium.Cartesian3.fromDegreesArray([
            ja1, wa1,
            ja2, wa2,
        ])

        const geometryline = new Cesium.PolylineGeometry({
            positions: ps1,
            width: 30.0,
        })
        const geometryInstance = new Cesium.GeometryInstance({
            geometry: geometryline,
        })
        geometryInstances.push(geometryInstance)

    }
    const aaa = new Cesium.Color(1.0, 1.0, 1.0, 1)
    viewer.scene.primitives.add(
        new Cesium.Primitive({
            geometryInstances: geometryInstances,
            appearance: maps.PolylineMaterialAppearance('../../../public/img/dd.png', aaa)
        })
    );

    return {
        primitive,
        instance,
        // instance.id,
    }
}