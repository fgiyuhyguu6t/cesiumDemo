<template>
    <div id="cesiumContainer"></div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref, watch, onBeforeUpdate } from 'vue'
import * as Cesium from 'cesium'
import {
    CylinderGeometry, PolylineVolumeGeometry,
    PolylineVolumeGeometry2,
    PolylineVolumeGeometry4,
    PolylineVolumeGeometry5,
    PolylineVolumeGeometry3,
    PolylineVolumeGeometry1, guans,
    PolylineGeometry,
    SpolylineVolumeGeometry, radius,
    addGLTFModeleitity, addGLTFprimitive, addModel,
    clickmoodel, clickmoodel2, clickmoodel3, clickmoodel4
} from './hooks'
import { maps } from './hooks/material/material.ts'
// 118.028693,24.425362
// 118.317875,24.626291

onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'
    const viewer = new Cesium.Viewer('cesiumContainer')
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(100, 42.0, 50000),
    })

    var wallInstance = new Cesium.GeometryInstance({
        geometry: Cesium.WallGeometry.fromConstantHeights({
            positions: Cesium.Cartesian3.fromDegreesArray([
                97.0,
                43.0,
                107.0,
                43.0,
                107.0,
                40.0,
                97.0,
                40.0,
                97.0,
                43.0,
            ]),
            maximumHeight: 100000.0,
            vertexFormat: Cesium.MaterialAppearance.VERTEX_FORMAT,
        }),
    })

    let ps2 = Cesium.Cartesian3.fromDegreesArrayHeights([
        100, 42.0, 0,
        100, 42.5, 0,
    ])
    let widthline = 200
    let { instance: pp } = PolylineVolumeGeometry5(ps2, widthline)
    var primitiveld = new Cesium.Primitive({
        // releaseGeometryInstances: false,//显示geometryInstances
        geometryInstances: pp, // 多个instance组成的集合
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: true,
            closed: true
        }),
    });
    // viewer.scene.primitives.add(primitiveld)
    viewer.scene.primitives.add(
        new Cesium.Primitive({
            // geometryInstances:primitiveld,
            geometryInstances: wallInstance,
            appearance: maps.wallMaterialAppearance(),
        })
    )
    // 333333333333333333333333333
    // 创建一个顶点着色器
    const vertexShader = `
  attribute vec3 position;
  attribute vec3 normal;
  uniform mat4 modelMatrix;
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  varying vec3 vNormal;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
  }
`;
    // 创建一个片元着色器
    const fragmentShader = `
  precision mediump float;
  varying vec3 vNormal;
  void main() {
    // 计算纹理坐标
    vec2 texCoords = vec2((vNormal.x + 1.0) * 0.5, (vNormal.y + 1.0) * 0.5);
    // 根据纹理坐标调整颜色
    vec3 color = vec3(texCoords.x, texCoords.y, 1.0);
    gl_FragColor = vec4(color, 1.0);
  }
`;
    // 创建一个着色器材质
    // const material1 = new Cesium.ShaderMaterial({
    //   vertexShaderSource: vertexShader,
    //   fragmentShaderSource: fragmentShader,
    // });
    const material = new Cesium.MaterialAppearance({
        vertexShaderSource: vertexShader,
        fragmentShaderSource: fragmentShader,
    });
    // 创建一个 PrimitiveCollection
    const primitiveCollection = new Cesium.PrimitiveCollection();
    // 创建一个圆柱体几何体
    const cylinderGeometry = new Cesium.CylinderGeometry({
        length: 1.0,
        topRadius: 0.5,
        bottomRadius: 0.5,
    });
    // 创建一个圆柱体 Primitive，并将着色器材质应用到它上面
    const cylinderPrimitive = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: cylinderGeometry,
            modelMatrix: Cesium.Matrix4.multiplyByTranslation(
                Cesium.Transforms.eastNorthUpToFixedFrame(
                    Cesium.Cartesian3.fromDegrees(100, 42.0)
                ),
                //xyz
                new Cesium.Cartesian3(0.0, 0.0, 0.0),
                new Cesium.Matrix4()
            ),
        }),
        appearance: material,
    });

   

    // 将圆柱体 Primitive 添加到 PrimitiveCollection 中
    // primitiveCollection.add(cylinderPrimitive);
    // viewer.scene.primitives.add(primitiveCollection)

    // viewer.scene.primitives.add(primitiveld)
    // clickmoodel4(viewer, primitive)
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
  