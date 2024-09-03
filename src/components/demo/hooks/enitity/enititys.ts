import * as Cesium from 'cesium'
// enitity增加实体方法1.1
export function rectangle(viewer){
    const rectangle=viewer.entities.add({
        id:'222',
        rectangle:{
            coordinates:Cesium.Rectangle.fromDegrees(120,40,123,45),
            extrudedHeight:20000,
            height:10000,
            material:Cesium.Color.BLUEVIOLET,
            // material:'../../public/img/earthquake-fill.png',
        }
    })
    return rectangle
}
export function rectanglez(viewer){
    let rotation = Cesium.Math.toRadians(30);
    function getRotationValue() {
        rotation += 0.005;
        return rotation;
    }
    const rec= viewer.entities.add({
        name: "Rotating rectangle with rotating texture coordinate",
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(-92.0, 30.0, -76.0, 40.0),
            material: "../../../public/img/checkerboard.png",
            rotation: new Cesium.CallbackProperty(getRotationValue, false),
            stRotation: new Cesium.CallbackProperty(getRotationValue, false),
            classificationType: Cesium.ClassificationType.TERRAIN,
        },
    });
    return rec
}
// enitity增加实体方法1
/**
 * 点
 * @param viewer 
 * @param position 
 * @returns 
 */
export function point(viewer: Cesium.Viewer,position: Cesium.Cartesian3){
     let randoms = Math.random()
    const point = new Cesium.Entity({
        id:`1${randoms}`,
        position:position,
        // position:Cesium.Cartesian3.fromDegrees(109.4776560,36.6517925),
        point:{
            pixelSize:20,
            color:Cesium.Color.BLUE,
        }
    })
    // // 添加到地图里
    // viewer.entities.add(point)
    return {point}
}