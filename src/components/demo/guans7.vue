<template>
  <div id="cesiumContainer"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, onBeforeUpdate } from "vue";
import * as Cesium from "cesium";
import gsap from "gsap";
import {
  CylinderGeometry,
  PolylineVolumeGeometry,
  Polylineprimitive,
  PolylineVolumeGeometry2,
  guans,
  SpolylineVolumeGeometry,
  radius,
  addGLTFModeleitity,
  addGLTFprimitive,
  clickmoodel,
  clickmoodel1,
  clickmoodel2,
  clickmoodel3,
  clickmoodel5,
  clickmoodel8,
  RectangleGeometry,
  RectangleGeometry1,
} from "./hooks";
// 118.028693,24.425362
// 118.317875,24.626291
import { maps, materialall } from "./hooks/material/material.ts";
import { materials } from "./hooks/material/materialall.ts";
import { polylinematerial } from "./hooks/material/PolylineMaterialAppearance";

import { PolylineGeometry } from "./hooks/new2024/PolylineGeometry.ts";
// import { polylinematerial } from "./hooks/new2024/PolylineMaterialAppearance.ts";

onMounted(() => {
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY";
  const viewer = new Cesium.Viewer("cesiumContainer");
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(118.120679, 24.515347, 50000),
  });
  class CustomMatrial {
    constructor() {
      Cesium.Material._materialCache.addMaterial("CustomMatrial", {
        fabric: {
          type: "CustomMatrial",
          uniforms: {
            uImg: "../../../public/img/111.png",
            uTime: 0,
          },
          source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput){
                    czm_material material=czm_getDefaultMaterial(materialInput); 
                    vec2 msterialUV =materialInput.st;//获取帧数  0-1  
                    float animation =(czm_frameNumber/60.0);
                    vec4 imgColor = texture2D(uImg,vec2(fract(msterialUV.x-uTime),msterialUV.y));
                    material.diffuse=vec3(imgColor.rgb);
                    return material;
                    // vec4 imgColor = texture2D(uImg,vec2(fract(msterialUV.x-uTime),fract(msterialUV.y-uTime)));
                    // vec4 imgColor = texture2D(uImg,vec2(msterialUV.x,msterialUV.y));
                    // vec4 imgColor = texture2D(uImg,materialInput.st);
                    // material.diffuse=vec3(materialInput.st,0.0);
                    // material.diffuse=vec3(1.0,0.0,0.0);
                    // material.alpha=0.5;
                }
                `,
        },
      });
    }
    getType() {
      return "CustomMatrial";
    }
    getValue(time, result) {
      result.uTime = performance.now() / 1000;
      return result;
    }
  }
  let materialzdy = new CustomMatrial();

  const rectangle = viewer.entities.add({
    id: "222",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(118.0, 24.56, 118.1, 24.575),
      // extrudedHeight:20000,
      // height:10000,
      material: materialzdy,
      // material:Cesium.Color.BLUEVIOLET,
      // material:'../../public/img/earthquake-fill.png',
    },
  });
  // viewer.zoomTo(rectangle)

  let alpha = materialall.materialsource();
  alpha.uniforms.my_var = 0.5;

  // 多边形
  let heightTemp = 1499;
  let instance = new Cesium.GeometryInstance({
    geometry: new Cesium.PolygonGeometry({
      height: heightTemp,
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArrayHeights([
          118.0,
          24.5,
          heightTemp,
          118.0,
          24.52,
          heightTemp,
          118.1,
          24.52,
          heightTemp,
          118.15,
          24.48,
          heightTemp,

          // 118.07573422306112, 37.85189337152966, heightTemp,
          // 118.063611097236, 37.82484947523914, heightTemp,
          // 118.0882108702266, 37.80158393294866, heightTemp,
          // 118.11120312890293, 37.821622172625915, heightTemp,
          // 118.07573422306112, 37.85189337152966, heightTemp,
        ])
      ),
      vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
    }),
  });

  // 矩形
  // let { instance } = RectangleGeometry1()

  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: instance, // 多个instance组成的集合
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        translucent: true,
        aboveGround: false,
        // material:materialzdy,
        // material:alpha,
        // material:materialall.materialyuan2()
        //  material:materialall.materialimgtime(),//流动
        // material: materialall.materialimgGrid(),
        material: materialall.Water("../../../public/img/waterfx.jpg"),
        // material: materialall.materialimgDiffuseMap('../../../../../public/img/111.png'),
        // material: materialall.materialimg2('../../../../../public/img/111.png',1,1),
        // material: materialall.materialimg3('../../../../../public/img/111.png',2,1),
        // material: materialall.materialimg5('../../../public/img/dd.png')
        // material: materialall.materialsourceimg('../../../public/img/dd.png')
        // material: materialall.materialimg4('../../../public/img/箭头.png', new Cesium.Color(1.0, 1.0, 1.0, 1),100,1)
        // material: materialall.materialimg7('../../../public/img/111.png', new Cesium.Color(1.0, 1.0, 1.0, 1),100,1)
        // material: materialall.materialimg6('../../../public/img/111.png',5,1)

        // material: materials.imgfromType('../../../../../public/img/111.png',1,10),
        // material: materials.imgfabric('../../../../../public/img/111.png',1,1),
        // material: materials.imgalpha('../../../../../public/img/dd.png',new Cesium.Color(1.0, 1.0, 1.0, 1)),
        // material: materials.imgsource('../../../../../public/img/111.png',3,1),
        // material: materials.rgbgsapuTime(),
        // material: materials.rgbmaterial(new Cesium.Color(0.0, 0.0, 1.0, 1)),
      }),

      // appearance: maps.EllipsoidSurfaceAppearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
      // appearance:maps.aper2,
      // appearance: maps.ma,
      // appearance:maps.EllipsoidSurfaceAppearance1('../../../../public/img/箭头.png',10,1)
      // appearance:maps.materialAppearance1('../../../../public/img/111.png',2,1)
    })
  );
  // 折线
  // let po = Cesium.Cartesian3.fromDegreesArrayHeights([
  //   118.160679, 24.515347, 300, 118.220679, 24.515347, 30,
  // ]);
  // const { geometryInstance: pp } = PolylineGeometry(po, 60);
  // viewer.scene.primitives.add(
  //   new Cesium.Primitive({
  //     geometryInstances: pp, // 多个instance组成的集合
  //     appearance: new Cesium.PolylineMaterialAppearance({
  //       material: polylinematerial.Polylineimgflow(
  //         "../../../public/img/dd.png",
  //         new Cesium.Color(1.0, 1.0, 1.0)
  //       ),
  //     }),
  //   })
  // );

  let po = Cesium.Cartesian3.fromDegreesArrayHeights([
    118.160679, 24.515347, 300, 118.220679, 24.515347, 30, 118.240679,
    24.515347, 30,
  ]);
  const { geometryInstance: pp } = PolylineGeometry(po, 60);
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: pp, // 多个instance组成的集合
      // appearance: maps.PolylineMaterialAppearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
      appearance: new Cesium.PolylineMaterialAppearance({
        // material: materialall.materialimg6('../../../public/img/111.png',-5,1)
        // material: polylinematerial.Polylineimgflow(
        //   "../../../public/img/dd.png",
        //   new Cesium.Color(1.0, 1.0, 1.0)
        // ),
        material: polylinematerial.Polylineglow(
          new Cesium.Color(0.0, 1.0, 1.0)
        ),
        // material: polylinematerial.Polylineglowflow(
        //   new Cesium.Color(1.0, 1.0, 1.0)
        // ),
      }),
    })
  );
  // let po1 = Cesium.Cartesian3.fromDegreesArrayHeights([118.160679, 24.535347, 300, 118.220679, 24.535347, 30])
  // const { geometryInstance: ppp } = PolylineGeometry(po1, 60)
  // viewer.scene.primitives.add(new Cesium.Primitive({
  //     geometryInstances: ppp, // 多个instance组成的集合
  //     // appearance: maps.PolylineMaterialAppearance('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1))
  //     appearance: new Cesium.PolylineMaterialAppearance({
  //         // material: materialall.materialimg6('../../../public/img/111.png',-5,1)
  //         // material: polylinematerial.Polylineimgflow('../../../public/img/dd.png',new Cesium.Color(1.0,1.0,1.0))
  //     // material: polylinematerial.Polylineglow(new Cesium.Color(1.0,1.0,1.0))
  //     material: polylinematerial.Polylineglowflow(new Cesium.Color(0.0,0.0,1.0))
  //     })
  // }))

  // 圆柱
  let { circleInstance } = CylinderGeometry();
  var circleInstanceprimitive = new Cesium.Primitive({
    geometryInstances: circleInstance,
    appearance: new Cesium.EllipsoidSurfaceAppearance({
      // aboveGround: false,
      // material: materialzdy,
      // material: materialall.materialimg2('../../../../public/img/111.png', 10, 10),
      // material:materialall.materialimgtime(),//流动
      // material: materialall.materialimg3('../../../../public/img/111.png',-100,1)
      // material: materialall.materialimg5('../../../public/img/dd.png')
      material: materialall.materialimg6("../../../public/img/111.png", -5, 1),
      // material: materialall.materialimg4('../../../public/img/dd.png', new Cesium.Color(1.0, 1.0, 1.0, 1), 1, 1)
    }),
    // appearance: maps.ma
  });
  // viewer.scene.primitives.add(circleInstanceprimitive);
  // 多段柱体
  let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
    118.220679, 24.535347, 100, 118.130679, 24.535347, 100,
  ]);
  let { instance: ddins } = Polylineprimitive(ps1);
  var primitive1 = new Cesium.Primitive({
    releaseGeometryInstances: false, //显示geometryInstances
    geometryInstances: ddins, // 多个instance组成的集合

    // appearance: new Cesium.EllipsoidSurfaceAppearance({
    //     aboveGround: false,
    //     // material: materialall.materialimgld('../../../../public/img/111.png'),
    //     // material:materialall.materialimgtime(),//流动
    //     material: materialall.materialimg2('../../../../public/img/mood.jpg', 100, 1),
    //     // material: materialall.materialimg3('../../../../public/img/111.png',-100,1)
    // })
    appearance: maps.EllipsoidSurfaceAppearance("../../../public/img/dd.png"),
  });
  // viewer.scene.primitives.add(primitive1);

  var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(118.120679, 24.515347)
  );
  //    let  model= addGLTFprimitive('../../../public/Models/ybz.glb',modelMatrix,154)
  let model = addGLTFprimitive(
    "../../../public/Models/cement2.glb",
    modelMatrix,
    155
  );
  viewer.scene.primitives.add(model);
  console.log("model", model);

  // const position1 = Cesium.Cartesian3.fromDegrees(118.120679, 24.515349, 0)
  // let models = addGLTFModeleitity('../../../public/Models/ybz.glb', position1, '55',viewer)
  // viewer.entities.add(models)

  // viewer.zoomTo(model)
});
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
