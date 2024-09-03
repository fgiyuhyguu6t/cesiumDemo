<script setup lang="ts">
// cesium管道测试
import headers from "./components/cesium/1.zb,kj,dx.vue";
import index from "./components/cesium/index.vue";
import entitytext from "./components/cesium/entitytext.vue";
import geojson from "./components/cesium/4geojson.vue";
import entity from "./components/cesium/3entity.vue";
import json from "./components/cesium/6json.vue";
import gltf from "./components/cesium/7gltf.vue";
import primitire from "./components/cesium/9primitire.vue";
import lz from "./components/cesium/12lz.vue";
import cameras from "./components/cesium/13camera.vue";
import lz2 from "./components/cesium/12lz2.vue";
// demo
import Aindex from "./components/demo/index.vue";
import indexold from "./components/demo/indexold.vue";
import primitive from "./components/demo/primitive.vue";
import primitiveall from "./components/demo/primitiveall.vue";
import guans from "./components/demo/guans.vue";
import guan2s from "./components/demo/guans2.vue";
import guans4 from "./components/demo/guans4.vue";
import guans5 from "./components/demo/guans5.vue";
import guans6 from "./components/demo/guans6.vue";
import guans7 from "./components/demo/guans7.vue";
import guansrec from "./components/demo/guans7rec.vue";
import guans8 from "./components/demo/guans8.vue";
import tanchuang1 from "./components/demo/tanchuang1.vue";
import tanchuang2 from "./components/demo/tanchuang2.vue";
import tanchuang3 from "./components/demo/tanchuang3.vue";
import tanchuang4 from "./components/demo/tanchuang4.vue";
import indexss from "./components/demo/hooks/tanchuang/index.vue";

import guandemo from "./components/demo/guandemo.vue";
import guans3 from "./components/demo/guans3.vue";
import guans31 from "./components/demo/guans3-1.vue";
import entity1 from "./components/demo/entity.vue";

import mapaa from "./components/demo/map.vue";
</script>

<template>
  <div style="position: relative">
    <!-- <headers></headers> -->
    <!-- <index></index> -->
    <!-- <entity></entity> -->
    <!-- <entitytext></entitytext> -->
    <!-- <lz></lz> -->
    <!-- <lz2></lz2> -->
    <!-- <cameras></cameras> -->
    <!-- <geojson></geojson> -->
    <!-- <json></json> -->
    <!-- <gltf></gltf> -->
    <!-- <primitire></primitire> -->

    <!-- <Aindex></Aindex> -->
    <!-- <indexold></indexold> -->
    <!-- 管条数测试 -->
    <!-- <guans></guans>  -->
    <!-- <guan2s></guan2s> -->
    <!-- 统一替换 -->
    <!-- <guans3></guans3> -->
    <!-- <guans31></guans31> -->
    <!-- <guans4></guans4> -->
    <!-- 集合primitive改颜色 -->
    <!-- <guans5></guans5>  -->

    <!-- 分开primitive改材质 -->
    <!-- <guans6></guans6> -->
    <!-- 很多流动效果 -->
    <mapaa></mapaa>
    <!-- <guans7></guans7> -->

    <!-- <guansrec></guansrec> -->
    <!-- 弹窗 -->
    <!-- <guans8></guans8> -->
    <!-- <tanchuang1></tanchuang1> -->
    <!-- ts -->
    <!-- <tanchuang2></tanchuang2> -->
    <!-- 点线 -->
    <!-- <tanchuang3></tanchuang3> -->
    <!-- 弹窗 
    <tanchuang4></tanchuang4>
    -->
    <!-- <indexss></indexss> -->
    <!-- <guandemo></guandemo> -->
    <!-- <primitive></primitive> -->
    <!-- <primitiveall></primitiveall> -->

    <!-- entity -->
    <!-- <entity1></entity1> -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
