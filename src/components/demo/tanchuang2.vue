<template>
    <div id="cesiumContainer">
    </div>
</template>
  
<script lang='ts' setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { point } from './hooks/enitity/enititys';
import DivLabel from './hooks/tanchuang/divLabel.ts';

onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZjYwMjllYy1kMGQ3LTQxMDAtOGI2Yi0wMzdlN2MxZjg5MmIiLCJpZCI6MTczNDU3LCJpYXQiOjE2OTgxMTA3MTR9.vjsj0kDdgvMCzloUNQRKA56NAWPxzdsqgqPUGikUqzY'

    const viewer = new Cesium.Viewer('cesiumContainer', {
        homeButton: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        infoBox: false
    })
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(108.09876, 37.200787, 1400000),
        // destination: Cesium.Cartesian3.fromDegrees(116.4568, 39.8926, 10000),
        // destination: Cesium.Cartesian3.fromDegrees(117.4603186710001, 31.14388249900003, 30000),
    })

    let { point: p1 } = point(viewer, Cesium.Cartesian3.fromDegrees(117.4603186710001, 31.14388249900003))
    viewer.entities.add(p1)
    let { point: p2 } = point(viewer, Cesium.Cartesian3.fromDegrees(117.4703186710001, 31.14388249900003))
    viewer.entities.add(p2)
    viewer.zoomTo(p1)


    console.log("TypeScript Number 属性: ");
    console.log("最大值为: " + Number.MAX_VALUE);
    console.log("最小值为: " + Number.MIN_VALUE);
    console.log("负无穷大: " + Number.NEGATIVE_INFINITY);
    console.log("正无穷大:" + Number.POSITIVE_INFINITY);
    console.log("Number.NaN" + Number.NaN);
    const s = 'hello'
    const s2 = 'good'
    console.log("找索引", s.charAt(1));
    console.log("值", s.charCodeAt(1));
    console.log("拼接", s.concat(s2));
    console.log("查找", s.indexOf('o'));

    interface namelist {
        firsName: string,
        lastName: string,
    }
    interface agelist {
        birthday: number,
    }
    const p: namelist = {
        firsName: '34',
        lastName: '35',
    }
    console.log("p", p)
    interface musician extends namelist {
        instrument: string
    }
    const aaa = <musician>{}
    aaa.firsName = 'hhh'

    const ccc: musician = {
        firsName: 'abc',
        lastName: 'def',
        instrument: 'g'
    }
    console.log("ccc", ccc);

    interface all extends namelist, agelist { }
    const alldemo: all = {
        firsName: 'abc',
        lastName: 'def',
        birthday: 20
    }
    console.log('alldemo', alldemo);

    // class

    class shape {
        area: number
        constructor(a: number) {
            this.area = a
        }
    }
    class circle extends shape {
        disp(): void {
            console.log("面积：", this.area);
        }
    }
    var cindex = new circle(45)
     cindex.disp()

    class printerclass{
        doprint(){
            console.log("father");
            
        }
    }
    class son extends printerclass{
        doprint(): void {
            super.doprint()//调用父类
            console.log('子类的doprint');
            
        }
    }
    const hehe= new son()
    hehe.doprint()

    class staticmen{
        static num:number
        static disp():void{
            console.log("num:",staticmen.num);
        }
    }
    staticmen.num=12
    staticmen.disp()
    class person{}
    const obj = new person()
    const isp = obj instanceof person;

    class e{
        str:string='hello'
        private str2:string='world'
    }
    const obje = new e()
    console.log('obje',obje.str);
    console.log('obje2',obje.str2);

    interface iloan{
        interest:number
    }
    class ag implements iloan{
        interest: number
        rebate:number
        constructor(interest:number,rebate:number){
            this.interest=interest
            this.rebate=rebate
        }
    }
    var obja = new ag(10,1)
    console.log("obja",obja.interest);
    
    // object
    var objname={
        key1:'va1',
        key2:'va2',
        key3:function(){

        },
    }
    // 泛型
    function identity<T>(arg:T):T{
        return arg;
    }
    interface keyvakue<K,T>{
        key:K;
        value:T;
    }
    








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

.botton {
    position: relative;
    top: -200px;
    left: 0;
}
</style>
  