<template>
    <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'

//cesium初始化必须写在mounted生命周期里面，否则会报错"Element with id "cesiumContainer" does not exist in the document."
onMounted(() => {
    // var custom = new Cesium.ArcGisMapServerImageryProvider({
    //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    // })
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

    const viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false,//动画小部件
        // 加载别的图层
        // imageryProvider: new Cesium.IonImageryProvider({ assetId: 3812 }),
        baseLayerPicker: false,//地图图层组件
        fullscreenButton: false,//全屏组件
        geocoder: false,//地理编码搜索组件
        homeButton: false,//首页组件
        infoBox: false,//信息框
        sceneModePicker: false,//场景模式
        selectionIndicator: false,//选取指示器组件
        timeline: false,//时间轴
        navigationHelpButton: false,//帮助按钮
        navigationInstructionsInitiallyVisible: false,
        // terrainProvider: new Cesium.createWorldTerrain({
        //     requestVertexNormals: true, //开启地形光照
        //     requestWaterMask: true, // 开启水面波纹
        // }),
    })
    // 隐藏logo信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    // 纽约坐标
    // viewer.camera.setView({
    //     destination: new Cesium.Cartesian3(1332761, -4662399, 4138888),
    //     orientation: {
    //         heading: 0.60,
    //         pitch: -0.66
    //     }
    // })

    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(118.07573422306112, 37.85189337152966, 50000),
        // destination: Cesium.Cartesian3.fromDegrees(-75, 40, 50000),
    })

    // PolygonGeometry
    viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
                height: heightTemp,
                polygonHierarchy: new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArrayHeights([
                        118.07573422306112, 37.85189337152966, heightTemp,
                        118.063611097236, 37.82484947523914, heightTemp,
                        118.0882108702266, 37.80158393294866, heightTemp,
                        118.11120312890293, 37.821622172625915, heightTemp,
                        118.07573422306112, 37.85189337152966, heightTemp,
                    ])
                ),
                vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
        }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: true,
            material: new Cesium.Material({
                fabric: {
                    type: 'Water',
                    uniforms: {
                        //baseWaterColor:new Cesium.Color.AQUA.withAlpha(0.5),
                        normalMap: Cesium.buildModuleUrl('../../../public/img/waterfx.jpg'),
                        frequency: 1000.0,//频率
                        animationSpeed: 0.01,//动画速度
                        amplitude: 10//振幅
                    }
                }
            })
        }),
        show: true
    }));


    // // 创建box几何
    // var boxGeometry = new Cesium.BoxGeometry({
    //     minimum: new Cesium.Cartesian3(0, 0, 0), // 最小x，y和z坐标
    //     maximum: new Cesium.Cartesian3(2500.0, 2500.0, 2500.0), // 最大x，y和z坐标
    //     // 要计算的顶点属性  type:VertexFormat
    //     vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    // });
    // // var geometry = Cesium.BoxGeometry.createGeometry(boxGeometry);

    // // 创建box的几何实例
    // var boxInstance = new Cesium.GeometryInstance({
    //     geometry: boxGeometry,
    //     modelMatrix: Cesium.Matrix4.multiplyByTranslation(
    //         Cesium.Transforms.eastNorthUpToFixedFrame(
    //             Cesium.Cartesian3.fromDegrees(-75, 40)
    //         ),
    //         new Cesium.Cartesian3(0.0, 0.0, 1000.0),
    //         new Cesium.Matrix4()
    //     ),
    //     id: "box",
    //     attributes: {
    //         color: Cesium.ColorGeometryInstanceAttribute.fromColor(
    //             Cesium.Color.BLUE
    //         ),
    //         // show: new Cesium.ShowGeometryInstanceAttribute(true),
    //     },
    // });

    // viewer.scene.primitives.add(
    //     new Cesium.Primitive({
    //         geometryInstances: boxInstance,
    //         appearance: new Cesium.PerInstanceColorAppearance({
    //             translucent: false,
    //             closed: false,
    //         }),
    //     })
    // );

    // 3创建boxOutline几何
    //  var boxOutlineGeometry = new Cesium.BoxOutlineGeometry({
    //   minimum: new Cesium.Cartesian3(0, 0, 0), // 最小x，y和z坐标
    //   maximum: new Cesium.Cartesian3(25000.0, 25000.0, 25000.0), // 最大x，y和z坐标
    // });
    // // 2创建boxOutline的几何实例
    // var boxOutlineInstance = new Cesium.GeometryInstance({
    //   geometry: boxOutlineGeometry,
    //   modelMatrix: Cesium.Matrix4.multiplyByTranslation(
    //     Cesium.Transforms.eastNorthUpToFixedFrame(
    //       Cesium.Cartesian3.fromDegrees(-65, 40)
    //     ),
    //     new Cesium.Cartesian3(0.0, 0.0, 1000.0),
    //     new Cesium.Matrix4()
    //   ),
    //   id: "boxOutline",
    //   attributes: {
    //     color: Cesium.ColorGeometryInstanceAttribute.fromColor(
    //       Cesium.Color.RED
    //     ),
    //   },
    // });
    // 1创建图元
    // var primitive = new Cesium.Primitive({
    //     geometryInstances: boxOutlineInstance,

    //     appearance: new Cesium.PerInstanceColorAppearance({
    //         // 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑光照
    //         flat: false,

    //         // 如果为 true ，则片段着色器会根据需要翻转表面法线，以确保法线面对观察者以避免黑斑。
    //         // 当几何图形的两侧都应像 WallGeometry 一样着色时，这很有用。
    //         faceForward: true,

    //         // 如果为true，则几何图形显示为半透明
    //         translucent: false,

    //         // 如果为true，则开启背面剔除
    //         closed: false,

    //         // 顶点着色器
    //         // vertexShaderSource: "",

    //         // 片元着色器
    //         // fragmentShaderSource: "",

    //         // 渲染状态
    //         // renderState: {
    //         //   lineWidth: Math.min(6.0, viewer.scene.maximumAliasedLineWidth),
    //         // },
    //     }),

    //     // 在深度测试失败时，用于遮盖此图元的外观
    //     // depthFailAppearance: new Cesium.PerInstanceColorAppearance(),

    //     show: true,

    //     // 将图元（所有几何实例）从模型转换为世界坐标
    //     modelMatrix: Cesium.Matrix4.IDENTITY,

    //     // 是否优化顶点着色器之前和之后的缓存几何顶点
    //     vertexCacheOptimize: false,

    //     // 当 true 时，将交错几何图形顶点属性，这可以稍微改善渲染性能，但会增加加载时间
    //     interleave: false,

    //     // 当 true 时，将压缩几何顶点，这将节省内存
    //     compressVertices: true,

    //     // 如果为 true ，则该原语不保留对输入的 geometryInstances 的引用以节省内存
    //     releaseGeometryInstances: true,

    //     // 如果为 true ，则只能使用 Scene＃pick 来拾取每个几何实例。如果 false ，则保存GPU内存
    //     allowPicking: true,

    //     // 如果为 true ，则渲染器视锥体会根据其边界体积来剔除图元和命令。如果您手动剔除原语，请将其设置为 false 可获得较小的性能
    //     cull: true,

    //     // 确定图元是异步创建还是阻塞直到准备就绪
    //     asynchronous: true,

    //     // 仅用于调试。确定是否显示该图元的命令的边界球
    //     debugShowBoundingVolume: false,

    //     // 确定此图元是否投射或接收来自光源的阴影  type:ShadowMode
    //     // DISABLED	对象不投射或接收阴影；ENABLED	对象投射并接收阴影；CAST_ONLY	对象仅投射阴影；RECEIVE_ONLY 该对象仅接收阴影
    //     shadows: Cesium.ShadowMode.DISABLED,
    // });
    // viewer.scene.primitives.add(primitive);


    // 创建box几何
    // var boxGeometry = new Cesium.BoxGeometry({
    //   minimum: new Cesium.Cartesian3(0, 0, 0), // 最小x，y和z坐标
    //   maximum: new Cesium.Cartesian3(2500.0, 2500.0, 2500.0), // 最大x，y和z坐标
    //   // 要计算的顶点属性  type:VertexFormat
    //   vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    // });
    // 创建box的几何实例
    // var boxInstance = new Cesium.GeometryInstance({
    //   geometry: boxGeometry,
    //   modelMatrix: Cesium.Matrix4.multiplyByTranslation(
    //     Cesium.Transforms.eastNorthUpToFixedFrame(
    //       Cesium.Cartesian3.fromDegrees(-75, 40)
    //     ),
    //     new Cesium.Cartesian3(0.0, 0.0, 1000.0),
    //     new Cesium.Matrix4()
    //   ),
    //   id: "box",
    //   attributes: {
    //     color: Cesium.ColorGeometryInstanceAttribute.fromColor(
    //       Cesium.Color.BLUE
    //     ),
    //     // show: new Cesium.ShowGeometryInstanceAttribute(true),
    //   },
    // });
    // viewer.scene.primitives.add(
    //   new Cesium.Primitive({
    //     geometryInstances: boxInstance,
    //     appearance: new Cesium.PerInstanceColorAppearance({
    //       translucent: false,
    //       closed: false,
    //     }),
    //   })
    // );

    // var boxGeometry = new Cesium.EllipseGeometry({
    //   center: Cesium.Cartesian3.fromDegrees(-100.0, 20.0),
    //   semiMinorAxis: 500000.0,
    //   semiMajorAxis: 1000000.0,
    //   rotation: Cesium.Math.PI_OVER_FOUR,
    //   vertexFormat: Cesium.VertexFormat.POSITION_AND_ST
    // }),

    // var instance = new Cesium.GeometryInstance({
    //   geometry: boxGeometry,
    //   // modelMatrix:
    //   id: 'object',
    // });
    // viewer.scene.primitives.add(
    //   new Cesium.Primitive({
    //     geometryInstances: instance,
    //     appearance: new Cesium.EllipsoidSurfaceAppearance({
    //       material: Cesium.Material.fromType('Checkerboard')
    //     })
    //   })
    // );
    //   const radius= ref(2000)
    //   const length=ref(10000)

    //   const CircleGeometry = new Cesium.CircleGeometry({
    //     center: Cesium.Cartesian3.fromDegrees(-95.0, 43.0),
    //     radius: 2005.0,
    //     vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
    //   })

    //   const cylinder = new Cesium.CylinderGeometry({
    //     length: 10000, // 圆柱体的长度
    //     topRadius: 2000, // 圆柱体顶部半径
    //     bottomRadius: 2000, // 圆柱体底部半径
    //     // length: 10000, // 圆柱体的长度
    //     // topRadius: 2000, // 圆柱体顶部半径
    //     // bottomRadius: 2000, // 圆柱体底部半径
    //     slices: 128, // 圆柱体周边的边数
    //     vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    //   })

    // //旋转角度
    // let hpr = new Cesium.HeadingPitchRoll(0, 0,Math.PI/2);
    // //位置点
    // let point = new Cesium.Cartesian3(-95, 43,100);
    // let origin = Cesium.Cartesian3.fromDegrees(point.x,point.y,point.z);
    // //初始的矩阵
    // const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(origin,hpr);

    //   var circleInstance = new Cesium.GeometryInstance({
    //     geometry: cylinder,
    //     attributes: {
    //       color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 1.0, 0.0, 0.5)),
    //       // show : new Cesium.ShowGeometryInstanceAttribute( true ) //显示或者隐藏
    //     },
    //     id: 'circle',
    //     // modelMatrix: Cesium.Matrix4.multiplyByTranslation(
    //     //   Cesium.Transforms.eastNorthUpToFixedFrame(
    //     //     Cesium.Cartesian3.fromDegrees(-95, 43)
    //     //   ),
    //     //   //xyz
    //     //   new Cesium.Cartesian3(0.0, 0.0, 0.0),
    //     //   new Cesium.Matrix4()
    //     // ),
    //     modelMatrix,
    //   });
    //   var primitive = new Cesium.Primitive({
    //     geometryInstances: circleInstance,
    //     appearance: new Cesium.PerInstanceColorAppearance({
    //       translucent: false,
    //       closed: true
    //     })
    //   });
    // viewer.scene.primitives.add(geometryccc);


})
</script>



<style scoped>
#cesiumContainer {
    /* width: 100%;
    height: 100%; */
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
