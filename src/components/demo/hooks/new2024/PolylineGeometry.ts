import * as Cesium from 'cesium'
/**
 * 
 * @param arrays  坐标
 * @param width 线宽
 * @returns 
 */
export function PolylineGeometry(arrays: any,width: number) {

    const geometryline = new Cesium.PolylineGeometry({
        positions: arrays,
        width,

    })
    let randoms= Math.random()
    const geometryInstance = new Cesium.GeometryInstance({
        geometry: geometryline,
        id: `id${randoms}`,
    })
    return {geometryInstance}
}