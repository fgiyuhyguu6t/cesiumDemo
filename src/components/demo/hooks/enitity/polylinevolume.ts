import * as Cesium from 'cesium'
export function polylinevolume(viewer) {
    var redTube = viewer.entities.add({
        name: 'Red tube with rounded corners',
        polylineVolume: {
            positions: Cesium.Cartesian3.fromDegreesArray([-85.0, 32.0, -85.0, 36.0, -89.0, 36.0]),
            shape: [
                new Cesium.Cartesian2(-10000, 0),
                new Cesium.Cartesian2(10000, 0),
                new Cesium.Cartesian2(20000, 17340),
                new Cesium.Cartesian2(0, 37340),
                new Cesium.Cartesian2(-20000, 17340)
            ],
            //颜色回调
            material: new Cesium.ColorMaterialProperty(Cesium.Color.BLUE.withAlpha(0.5))

            // material : new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(function() { 
            // return Cesium.Color.fromRandom({
            //     minimumRed : 0.75,
            //     minimumGreen : 0.75,
            //     minimumBlue : 0.75,
            //     alpha : 1.0
            // });
            // }, false))
        }
    });
}
export function polylinevolume1(viewer) {
    
    let poly = {
        name: 'Red',
        polylineVolume: {
            positions : Cesium.Cartesian3.fromDegreesArray([114,38,115,38,115,37]),
            // positions: Cesium.Cartesian3.fromDegreesArray([-85.0, 32.0, -85.0, 36.0, -89.0, 36.0]),
            shape: computeCircleR(100, 20),
            // outline:true,
            // outlineColor:Cesium.Color.PINK,//轮廓
            // outerWidth:20,
            // fill:false,//填充,
            // cornerType:Cesium.CornerType.BEVELED,//拐角
            cornerType:Cesium.CornerType.ROUNDED,//拐角
            // cornerType:Cesium.CornerType.MITERED,//拐角
            //颜色回调
            material: Cesium.Color.RED
            // material : new Cesium.ColorMaterialProperty(Cesium.Color.BLUE.withAlpha(0.5)) 
        }
    };
    var redTube = viewer.entities.add(poly)

    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i++) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians))
            );
            i += itemp;
        }
        return result;
    }
    return redTube
}