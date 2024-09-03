import * as Cesium from 'cesium'
export function label(viewer, word: string) {
    // 文字
    const geometry = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75, 40, 10),
        label: {
            text: word,
            font: '14pt monospace',
            fillColor: Cesium.Color.YELLOWGREEN,//变量
            showBackground: true,
            backgroundColor: new Cesium.Color(255, 0, 0),//实例化类
        }
    })
    return geometry
}

export function billboard(viewer){
    // 广告牌
    const geometry = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75, 40, 10),
        billboard: {
            image: '../../../../../public/img/checkerboard.png',
            width: 64,
            height: 64
        }
    })
    return geometry
}