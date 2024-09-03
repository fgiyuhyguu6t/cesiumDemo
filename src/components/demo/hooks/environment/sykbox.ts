import * as Cesium from 'cesium'

export function sky(viewer) {
    // 自定义的近地天空盒
    let groundSkybox = new Cesium.SkyBox({
        sources: {
            negativeX: '../../../public/img/sky/nx.png',
            positiveX: '../../../public/img/sky/ny.png',
            negativeY: '../../../public/img/sky/nz.png',
            positiveY: '../../../public/img/sky/px.png',
            negativeZ: '../../../public/img/sky/py.png',
            positiveZ: '../../../public/img/sky/pz.png'
        }
    })

    // 自带的默认天空盒
    let defaultSkybox = viewer.scene.skyBox;

    // 渲染前监听并判断相机位置
    viewer.scene.preUpdate.addEventListener(() => {
        let position = viewer.scene.camera.position;
        let cameraHeight = Cesium.Cartographic.fromCartesian(position).height;
        if (cameraHeight < 240000) {
            viewer.scene.skyBox = groundSkybox;
            viewer.scene.skyAtmosphere.show = false;
        } else {
            viewer.scene.skyBox = defaultSkybox;
            viewer.scene.skyAtmosphere.show = true;
        }
    })
}
