import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
export function clickmoodel(viewer: Cesium.Viewer, myMap?: undefined) {
    let pickid = ''
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement: { position: any; }) {
        var pickedFeature = viewer.scene.pick(movement.position);
        if (typeof (pickedFeature) != "undefined")   //鼠标是否点到线上
        {
            console.log("pickid", pickedFeature.primitive.geometryInstances[3].attributes.color);
            pickid = pickedFeature.id
            // console.log("pickid",pickid);

            // if()
            // let arr2 = myMap.filter((value, index) => pickid===value.id)
            // const newcolor = new Cesium.ColorGeometryInstanceAttribute(1, 0, 0, 1)
            // pickedFeature.primitive.geometryInstances[3].attributes.color=newcolor
            // console.log("222",pickedFeature.primitive.geometryInstances[3].attributes.color);
            //    const newcolor = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
            // console.log('0',arr2[0]) 
            // console.log('old',arr2[0].attributes.color) 
            // arr2[0].attributes.color.value[0]=255
            // arr2[0].attributes.color=newcolor
            // console.log("new",arr2[0].attributes.color);
            //将本次选中元素的原颜色保存
            var precolor = pickedFeature.primitive.appearance.material;
            const abc = new Cesium.Color(0.0, 1.0, 0.0, 0.5);

            let changeColor = function (factor: { primitive: { appearance: { material: { uniforms: { color: any; }; }; }; }; }, color: Cesium.Color) {
                factor.primitive.appearance.material.uniforms.color = color;
            }
            changeColor(pickedFeature, abc);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    return pickid
}

export function clickmoodel1(viewer: { screenSpaceEventHandler: { setInputAction: (arg0: (movement: any) => void, arg1: Cesium.ScreenSpaceEventType) => void; }; scene: { pick: (arg0: any) => any; }; }, myMap: any[]) {
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement: { position: any; }) {
        var pickedFeature = viewer.scene.pick(movement.position);
        if (typeof (pickedFeature) != "undefined")   //鼠标是否点到线上
        {
            // 当前点击的id返回该对象
            let arr2 = myMap.filter((value: { id: any; }) => pickedFeature.id === value.id)
            const newcolor = new Cesium.ColorGeometryInstanceAttribute(1, 0, 0, 1)
            arr2[0].attributes.color = newcolor
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

}
export function clickmoodel2(viewer: Cesium.Viewer) {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick)) {
            let newgeo = pick

            // var precolor = pickedFeature.primitive.appearance.material;
            const abc = new Cesium.Color(0.0, 1.0, 0.0, 0.5);
            let changeColor = function (factor: { primitive: { appearance: { material: { uniforms: { color: any; }; }; }; }; }, color: Cesium.Color) {
                factor.primitive.appearance.material.uniforms.color = color;
            }
            // console.log("pick.id",pick.id,pick.id.indexOf("line"));

            if (pick.id.indexOf("line") == 2) {
                // console.log("111");
                changeColor(newgeo, abc);

                // var instance = new Cesium.GeometryInstance({
                //     attributes: {
                //         color:Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE),
                //     },
                // });
                //     newgeo.primitive.geometryInstances = instance;
            } else {
                console.log("my");
            }
            // console.log('Mouse clicked rectangle. (pick.id.id === 'wdhjksgjk')');
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
// 管，多选
export function clickmoodel4(viewer: Cesium.Viewer, primitive: Cesium.Primitive) {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick)) {
            var attributes = primitive.getGeometryInstanceAttributes(pick.id);
            attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
            attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(false);
            // attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(new Cesium.Color(1, 0, 0, 1));
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
export function clickmoodel5(viewer: Cesium.Viewer, primitive: Cesium.Primitive) {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position);
        let changeColor = function (factor: { primitive: { appearance: { material: { uniforms: { color: any; }; }; }; }; }, color: Cesium.Color) {
            factor.primitive.appearance.material.uniforms.color = color;
        }
        if (Cesium.defined(pick)) {
            const colornew = new Cesium.Color(0.0, 1.0, 0.0, 0.5);
            changeColor(pick, colornew);
            // var attributes = primitive.getGeometryInstanceAttributes(pick.id);
            // attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
            // attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(false);
            // attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(new Cesium.Color(1, 0, 0, 1));
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
/**
 * 修改材质
 * @param viewer 
 * @param primitive 
 */
export function clickmoodel8(viewer: Cesium.Viewer, primitive: Cesium.Primitive) {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position);
        let changeColor = function (factor: { primitive: { appearance: { material: { uniforms: { color: any; }; }; }; }; }, urlimg) {
            // factor.primitive.appearance.material.uniforms.color = color;
            factor.primitive.appearance.material.uniforms.image = urlimg;
            // factor.primitive.appearance.material.uniforms.image = '../../../../public/img/red.png';
        }
        if (Cesium.defined(pick)) {
            const imgurl = '../../../../public/img/111.png'
            changeColor(pick, imgurl);
            // var attributes = primitive.getGeometryInstanceAttributes(pick.id);
            // attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
            // attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(false);
            // attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(new Cesium.Color(1, 0, 0, 1));
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
export function clickmoodel9(viewer: Cesium.Viewer, primitive: Cesium.Primitive) {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position);
        let changeColor = function (factor: { primitive: { appearance: { material: { uniforms: { color: any; }; }; }; }; }, urlimg) {
            // factor.primitive.appearance.material.uniforms.color = color;
            factor.primitive.appearance.material.uniforms.image = urlimg;
            // factor.primitive.appearance.material.uniforms.image = '../../../../public/img/red.png';
        }
        if (Cesium.defined(pick)) {
            const imgurl = '../../../../public/img/red.png'
            changeColor(pick, imgurl);
            // var attributes = primitive.getGeometryInstanceAttributes(pick.id);
            // attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
            // attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(false);
            // attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(new Cesium.Color(1, 0, 0, 1));
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
// 管，单选
export function clickmoodel6(viewer: { scene: { canvas: HTMLCanvasElement | undefined; pick: (arg0: any) => any; }; }, primitive: { getGeometryInstanceAttributes: (arg0: number) => { (): any; new(): any; color: any; }; }) {
    var curPoint: number = 0
    let oldcolor: null = null
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick)) {
            console.log('选中啦', pick.id.id);

            if (curPoint) {
                // 复原上一个的颜色
                primitive.getGeometryInstanceAttributes(curPoint).color = oldcolor
                // 赋予当前的颜色
                var attributes = primitive.getGeometryInstanceAttributes(pick.id);
                attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
                curPoint = pick.id
            } else {
                var attributes = primitive.getGeometryInstanceAttributes(pick.id);
                oldcolor = attributes.color
                attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
                curPoint = pick.id
            }
        } else {
            if (curPoint) {
                primitive.getGeometryInstanceAttributes(curPoint).color = oldcolor
            }

        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
export function clickmoodel7(viewer: { scene: { canvas: HTMLCanvasElement | undefined; pick: (arg0: any) => any; }; }, primitive: { getGeometryInstanceAttributes: (arg0: number) => { (): any; new(): any; color: any; }; }) {
    var curPoint: number = 0
    let oldcolor: null = null
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position);
        // 流动材质进不来
        if (Cesium.defined(pick) && !(pick.id.indexOf("id"))) {
            if (curPoint) {
                // 复原上一个的颜色
                primitive.getGeometryInstanceAttributes(curPoint).color = oldcolor
                // 赋予当前的颜色
                var attributes = primitive.getGeometryInstanceAttributes(pick.id);
                attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
                curPoint = pick.id
            } else {
                var attributes = primitive.getGeometryInstanceAttributes(pick.id);
                oldcolor = attributes.color
                attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
                curPoint = pick.id
            }
        } else {
            // 点别发地方就恢复
            if (curPoint) {
                primitive.getGeometryInstanceAttributes(curPoint).color = oldcolor
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
// 
export function clickmoodelall(viewer: Cesium.Viewer, primitive: Cesium.Primitive) {
    var curPoint: number = 0
    let oldcolor: null = null

    var curmodel: number = 0
    let oldsilhouetteColor: null = null
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position);
        // 流动材质进不来
        if (Cesium.defined(pick)) {
            console.log('5154', pick.id.indexOf('id'));
            switch (pick.id.indexOf('id')) {

                case 1:
                    if (curPoint) {
                        // 复原上一个的颜色
                        primitive.getGeometryInstanceAttributes(curPoint).color = oldcolor
                        // 赋予当前的颜色
                        var attributes = primitive.getGeometryInstanceAttributes(pick.id);
                        attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
                        curPoint = pick.id
                    } else {
                        // 第一次点
                        var attributes = primitive.getGeometryInstanceAttributes(pick.id);
                        oldcolor = attributes.color
                        attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUAMARINE);
                        curPoint = pick.id
                    }
                    break;
                case 2:
                    if (curmodel) {
                        // var gltfaaa = primitive.getGeometryInstanceAttributes(pick.id);
                        // console.log("第二个了",oldsilhouetteColor);
                        curmodel.primitive.silhouetteColor = oldsilhouetteColor
                        curmodel.primitive.silhouetteSize = 0.0;
                        pick.primitive.silhouetteColor = new Cesium.Color(0.0, 1.0, 0.0, 1);//primitive
                        pick.primitive.silhouetteSize = 8.0;
                        if (curmodel.id === pick.id) {
                            // console.log("同");
                            curmodel.primitive.silhouetteColor = oldsilhouetteColor
                            curmodel.primitive.silhouetteSize = 0.0;
                        }
                        curmodel = pick

                    } else {
                        // 第一次
                        oldsilhouetteColor = pick.primitive.silhouetteColor
                        console.log("pick.primitive.silhouetteColor", oldsilhouetteColor);
                        pick.primitive.silhouetteColor = new Cesium.Color(0.0, 1.0, 0.0, 1);//primitive
                        pick.primitive.silhouetteSize = 8.0;
                        curmodel = pick
                    }
                    break;
                default:
                    console.log('流动');
                    break;
            }
        } else {
            if (curPoint) {
                console.log("curPoint", curPoint);
                // 复原管道
                primitive.getGeometryInstanceAttributes(curPoint).color = oldcolor
            }
            if (curmodel) {
                // 复原管道
                curmodel.primitive.silhouetteColor = oldsilhouetteColor
                curmodel.primitive.silhouetteSize = 0.0;
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
export function clickmoodel3(viewer: { scene: { canvas: HTMLCanvasElement | undefined; pick: (arg0: any) => any; }; }) {
    var curPipeline: { polylineVolume: { material: Cesium.Color; }; } | null = null;
    var curPoint: { color: Cesium.Color; silhouetteColor: Cesium.Color; silhouetteSize: number; } | null = null;
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    //选中管线，弹出消息框，选中雨篦子，显示外边框效果
    handler.setInputAction(function (movement: { position: any; }) {
        var pick = viewer.scene.pick(movement.position); //endPosition position
        //确定信息是否为空，当前获取的对象是否和之前绑定的一致
        if (Cesium.defined(pick)) // && pick.id.id==="redModel"
        {
            console.log("点击", pick);
            // console.log("pick.id.id",pick.id.id.indexOf("gltf"));
            console.log("pick.id", pick.id.indexOf("line"));

            if (curPipeline != null) {
                curPipeline.polylineVolume.material = Cesium.Color.fromCssColorString("#0099ff").withAlpha(0.7);
                console.log("1", curPipeline);
            }
            if (curPoint != null) {
                curPoint.color = new Cesium.Color(1, 1, 1, 1.0);
                curPoint.silhouetteColor = new Cesium.Color(1, 1, 1, 1);
                curPoint.silhouetteSize = 0;
                console.log("2", curPipeline, curPoint);
            }
            if (pick.id == undefined) {
                return;
            }
            if (typeof (pick.id) == "string" && pick.id.indexOf("gltf") >= 0) {

                pick.primitive.silhouetteColor = Cesium.Color.fromCssColorString("#ff33ff").withAlpha(0.7);
                pick.primitive.silhouetteSize = 8.0;
                curPoint = pick.primitive;
                console.log("3", curPipeline);
            }
            //管线
            else if (pick.id.id != undefined && pick.id.indexOf("line") >= 0) {
                console.log("111");

                // pick.id.polylineVolume.material = Cesium.Color.fromCssColorString("#ff33ff").withAlpha(0.7);
                // curPipeline = pick.id;
                // var cPoint = Cesium.BoundingSphere.fromPoints(pick.id.polylineVolume.positions._value).center;
                // var centerPoint = tMap3d.cartesianToWGS84(cPoint.x, cPoint.y, cPoint.z);
                // console.log(centerPoint);
                //弹窗
                // createPopupImage(pick.id.id, "images/gates/normal_popup.png", "normal", pick.id.id + "段", centerPoint);

            }
            else {

            }
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);//MOUSE_MOVE  LEFT_CLICK
}
export function clickmoodelbill(viewer: { scene: { canvas: HTMLCanvasElement | undefined; pick: (arg0: any) => any; }; }) {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement: { position: any; }) {
        var pickedPrimitive = viewer.scene.pick(movement.position);
        console.log("pickedPrimitive", pickedPrimitive);
        var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
        console.log("pickedEntity", pickedEntity);
        // Highlight the currently picked entity
        if (Cesium.defined(pickedEntity)) {
            console.log("111");

            pickedEntity.billboard.scale = 2.0;
            pickedEntity.billboard.color = Cesium.Color.ORANGERED;
        }
        // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);//MOUSE_MOVE  LEFT_CLICK
}
// var headers = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
// headers.setInputAction(function (event) {
//   console.log("1545");
// }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
export function clickmoodelpoint(viewer: Cesium.Viewer, myMap?: undefined) {
    //点击地图事件
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click) => {
        // 屏幕坐标转世界坐标——关键点
        const ellipsoid = viewer.scene.globe.ellipsoid;
        const cartesian = viewer.camera.pickEllipsoid(click.position, ellipsoid);
        if (cartesian) {     //判断点击的是否是地球
            //将笛卡尔坐标转换为地理坐标
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            //将弧度转为度的十进制度表示
            const lon = Cesium.Math.toDegrees(cartographic.longitude);
            const lat = Cesium.Math.toDegrees(cartographic.latitude);
            const click_point = { longitude: lon, latitude: lat };
            console.log(click_point)
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // return pickid
}

export function getposition(viewer) {
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (event) {
        console.log('窗口坐标', event.position);
        // 鼠标射线
        var ray = viewer.camera.getPickRay(event.position);
        console.log('射线', ray);
        // 鼠标与地球的射线，交点
        var position = viewer.scene.globe.pick(ray, viewer.scene)
        console.log('交点xyz', position);
        // 交点转经纬度
        var wgs84 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position)
        console.log('经纬', wgs84);
        let clickPosition = viewer.scene.camera.pickEllipsoid(event.position)
        let radiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
        // console.log('radiansPos', radiansPos);
        var pick = viewer.scene.pick(event.position)
        // debugger
        // const Cartesian1 = Cesium.Cartesian3.fromDegrees(86.889, 27.991, 10000)
        // const Cartesian2 = Cesium.Cartesian3.fromDegrees(100, 200, 300)
        // console.log("Cartesian1", Cartesian1);
        // console.log("Cartesian1", Cartesian2);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

// 点击事件
export function clickall(viewer) {
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
        var height = viewer.camera.positionCartographic.height;//我这里举个例子点击鼠标左键获取当前高度
        // console.log("h",height);
        // 获取点击的实体
        const pick = viewer.scene.pick(movement.position);
        const ellipsoid = viewer.scene.globe.ellipsoid;
        const cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
        if (Cesium.defined(pick)) {
            if (pick.id && pick.id instanceof Cesium.Entity) {
                console.log("选中entity");
                // viewer.trackedEntityChanged.addEventListener(function (pick) {
                //     console.log("jjjj", pick.id);
                // })
                handler.setInputAction(function (movement) {
        // 从相机位置创建一条射线，这条射线通过世界中movement.position像素所在的坐标
        // let ray = viewer?.camera.getPickRay(movement.position) // 鼠标射线
        // // 找到射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。
        // let positions = viewer?.scene.globe.pick(ray, viewer?.scene)
        // console.log("position",positions);
        var cartesian = viewer?.scene.pickPosition(movement.position); // 坐标
        // console.log("cartesian",cartesian);
        //   // 屏幕坐标转世界坐标——关键点
        //   const ellipsoid = viewer?.scene.globe.ellipsoid;
        //   const dq = viewer?.camera.pickEllipsoid(movement.position,ellipsoid);
        //   console.log("dq",dq);
          
        //   let clickPosition = viewer?.scene.camera.pickEllipsoid(movement.position)
        //   var height = viewer?.camera.positionCartographic.height;//我这里举个例子点击鼠标左键获取当前高度
        //  console.log("height",height,'2',clickPosition);
        var ppp = viewer?.scene.pick(movement.position);//实体
      //   console.log("ppp",ppp);



       if(defined(ppp)){
        let data ={
        id:13,
        name:'嘎嘎',
        age:1,
        word:'fhnsdbndks',
      }
         console.log("有/");
         popu(cartesian,data,viewer)
       }
       
      }, ScreenSpaceEventType.LEFT_CLICK)

            }
            if (pick.primitive instanceof Cesium.Primitive) {
                console.log("选中Primitive");
            }
            if (pick.primitive instanceof Cesium.Model) {
                console.log("选中Model");
            }
            if (pick.primitive instanceof Cesium.Cesium3DTileFeature) {
                console.log("选中Cesium3DTileFeature");
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // console.log("1111");
}
// Cesium.ScreenSpaceEventType.LEFT_CLICK //鼠标左击事件
// Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK //鼠标左键双击事件
// Cesium.ScreenSpaceEventType.LEFT_DOWN //左键鼠标按下事件
// Cesium.ScreenSpaceEventType.LEFT_UP //左键鼠标抬起事件
// Cesium.ScreenSpaceEventType.MIDDLE_CLICK //中键单机
// Cesium.ScreenSpaceEventType.MIDDLE_DOWN //中键按下
// Cesium.ScreenSpaceEventType.MIDDLE_UP //中键抬起
// Cesium.ScreenSpaceEventType.MOUSE_MOVE //鼠标移动
// Cesium.ScreenSpaceEventType.PINCH_END //表示两指事件在触摸面上的结束。
// Cesium.ScreenSpaceEventType.PINCH_MOVE //两指移动
// Cesium.ScreenSpaceEventType.PINCH_START //表示在触摸面上发生两指事件的开始。
// Cesium.ScreenSpaceEventType.RIGHT_CLICK //鼠标右击事件
// Cesium.ScreenSpaceEventType.RIGHT_DOWN  //鼠标右键按下
// Cesium.ScreenSpaceEventType.RIGHT_UP    //鼠标右键抬起
// Cesium.ScreenSpaceEventType.WHEEL //鼠标滚轮事件
// handler.setInputAction(function (movement) {
//     // 从相机位置创建一条射线，这条射线通过世界中movement.position像素所在的坐标
//     // let ray = viewer?.camera.getPickRay(movement.position) // 鼠标射线
//     // // 找到射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。
//     // let positions = viewer?.scene.globe.pick(ray, viewer?.scene)
//     // console.log("position",positions);
//     var cartesian = viewer?.scene.pickPosition(movement.position); // 坐标
//     // console.log("cartesian",cartesian);
//     //   // 屏幕坐标转世界坐标——关键点
//     //   const ellipsoid = viewer?.scene.globe.ellipsoid;
//     //   const dq = viewer?.camera.pickEllipsoid(movement.position,ellipsoid);
//     //   console.log("dq",dq);
      
//     //   let clickPosition = viewer?.scene.camera.pickEllipsoid(movement.position)
//     //   var height = viewer?.camera.positionCartographic.height;//我这里举个例子点击鼠标左键获取当前高度
//     //  console.log("height",height,'2',clickPosition);
//     var ppp = viewer?.scene.pick(movement.position);//实体
//   //   console.log("ppp",ppp);



//    if(defined(ppp)){
//     let data ={
//     id:13,
//     name:'嘎嘎',
//     age:1,
//     word:'fhnsdbndks',
//   }
//      console.log("有/");
//      popu(cartesian,data,viewer)
//    }
   
//   }, ScreenSpaceEventType.LEFT_CLICK)