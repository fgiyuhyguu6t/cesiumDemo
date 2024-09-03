import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
import { radius } from './random';
/**
 * 多段柱体 instance
 * @param arrays 
 * @returns 
 */
export function PolylineVolumeGeometry2(arrays: any,color: Cesium.ColorGeometryInstanceAttribute | undefined) {
    // console.log("array",color.value);
    // 定义Geometry
    var volume = new Cesium.PolylineVolumeGeometry({
        polylinePositions:arrays,
        shapePositions: computeCircleR(7, 20),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    });
    let randoms= Math.random()
    // 定义 GeometryInstance
    var instance = new Cesium.GeometryInstance({
        geometry: volume,
        id: `1line${randoms}`,
        attributes: {
            color:color,
        },
    });

    const myMap = new Map();
    const keyid = "";
    const keyinstance = {};
    myMap.set(keyid, instance.id)
    myMap.set(keyinstance, instance)
    // const keyprimitive = {};
    // myMap.set(keyprimitive, primitive)
    // console.log('myMap',myMap);
    // console.log("11", myMap.get(keyid));

    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }

    return {instance,myMap}
}
export function PolylineVolumeGeometry5(arrays: any,radius:number) {
    // console.log("array",arrays);
    // 定义Geometry
    var volume = new Cesium.PolylineVolumeGeometry({
        polylinePositions:arrays,
        shapePositions: computeCircleR(radius, 20),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    });
    let randoms= Math.random()
    // 定义 GeometryInstance
    var instance = new Cesium.GeometryInstance({
        geometry: volume,
        id: `1line${randoms}`,
        attributes: {          
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0, 1, 0, 0.5))
            // color:Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE),
        },
    });

    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }

    return {instance}
}

export function PolylineVolumeGeometry4(arrays: any,index: string) {
    // console.log("array",color.value);
    // 定义Geometry
    var volume = new Cesium.PolylineVolumeGeometry({
        polylinePositions:arrays,
        shapePositions: computeCircleR(7, 20),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    });
    // 定义 GeometryInstance
    var instance = new Cesium.GeometryInstance({
        geometry: volume,
        id:index,
        // attributes: {
        //     color:color,
        // },
    });
    function computeCircleR(radius: number, itemp: number) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    }

    return {instance}
}


/**
 * 传入管道数量，和颜色范围内随机生成管道
 * @param number 
 * @param viewer 
 * @param material 
 */
export function guans(number: { value: number; },viewer: { scene: { primitives: { add: (arg0: Cesium.Primitive) => void; }; }; },material: any){
    let instance = []
    let myMapnew={}
    for (let index = 0; index < number.value; index++) {
        // console.log("blue",index);
        const { jing: ja1, wei: wa1, jing2: ja2, wei2: wa2 } = radius()
        let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
            ja1, wa1, 100,
            ja2, wa2, 100,
        ])
        let colorMaterial1 = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
        let { instance: instance1,myMap} = PolylineVolumeGeometry2(ps1, colorMaterial1)
        instance.push(instance1)
        // console.log("ma",typeof(myMapnew));
        console.log("ma",myMap);
        myMapnew=myMap
    }
    let randoms = Math.random()
    // console.log("randoms", randoms);
    // var material = Cesium.Material.fromType('Color');
    // material.uniforms.color = new Cesium.Color(1.0, 0.0, 0.0, 1);

    viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: instance, // 多个instance组成的集合
        // appearance: new Cesium.PerInstanceColorAppearance({
        //     translucent: false,
        //     closed: true
        // }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            material,
        })
    }));
    // console.log("222",myMapnew);
    return myMapnew
}