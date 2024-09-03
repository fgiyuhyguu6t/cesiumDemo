
import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
// 118.028693,24.425362
// 118.317875,24.626291
/**
 * 经纬度范围取点
 * @returns 
 */
export function radius() {
    
    let maxw = 626291
    let minw = 425362
    
    let maxj = 317875
    let minj = 28693
    const s = (Math.floor(Math.random() * (maxj - minj + 1) + minj))
    const w = (Math.floor(Math.random() * (maxw - minw + 1) + minw))

    let jing = 118+(s/1000000)
    let wei = 24+(w/1000000)
    

// 随机方向
const long = 1000
const s2 = (Math.floor(Math.random() * ((s+long)- (s-long) + 1) + (s-long)))
const w2 = (Math.floor(Math.random() * ((w+long)- (w-long) + 1) + (w-long)))

// 统一方向
    // const long = 1000
    // const long2 = 500
    // const s2 = (Math.floor(Math.random() * ((s+long)- (s+long2) + 1) + (s+long2)))
    // const w2 = (Math.floor(Math.random() * ((w+long)- (w+long2) + 1) + (w+long2)))

    // console.log("l",s,s+long,s2);
    
    // console.log("l",s,s-0.01);

    let jing2 = 118+(s2/1000000)
    let wei2 = 24+(w2/1000000)

    return {jing,wei,jing2,wei2}
}




// function radius() {
//     let jingnew = ref()
//     let weinew = ref()
//     const jing = Math.random()
//     if (jing > 0.3) {
//         jingnew = jing + 117
//     } else {
//         jingnew = jing + 118
//     }
//     const s = (Math.floor(Math.random() * (3 - 1 + 1) + 1)) / 10
//     const wei = Math.random()
//     if (wei > 0.608421) {
//         weinew = maxw + wei - s
//     } else if (wei < 0.423783) {
//         weinew = maxw + wei + s
//     } else {
//         weinew = maxw + wei
//     }
//     return { jingnew, weinew }
// }
// const { jingnew: j1, weinew: w1 } = radius()
// console.log("111", j1, w1);







// for (let i = 0; i < numbers.value; i++) {

//     // let jingnew1 = ref()
//     // let weinew1 = ref()
//     // const jing1 = Math.random()
//     // const wei1 = Math.random()
//     // if (jing1 > 0.3) {
//     //     jingnew1 = jing1 + minj
//     // } else {
//     //     jingnew1 = jing1 + maxj
//     // }
//     // const s = (Math.floor(Math.random() * (2 - 1 + 1) + 1)) / 10
//     // if (wei1 > 0.608421) {
//     //     weinew1 = maxw + wei1 - s
//     // } else if (wei1 < 0.423783) {
//     //     weinew1 = minw + wei1 + s
//     // } else {
//     //     weinew1 = minw + wei1
//     // }

//     // let jingnew = ref()
//     // let weinew = ref()
//     // const jing = Math.random()
//     // const wei = Math.random()
//     // if (jing > 0.3) {
//     //     jingnew = jing + minj
//     // } else {
//     //     jingnew = jing + maxj
//     // }
//     // // const s = (Math.floor(Math.random() * (3 - 1 + 1) + 1)) / 10
//     // if (wei > 0.608421) {
//     //     weinew = maxw + wei - s
//     // } else if (wei < 0.423783) {
//     //     weinew = minw + wei + s
//     // } else {
//     //     weinew = minw + wei
//     // }

//     let ps1 = Cesium.Cartesian3.fromDegreesArrayHeights([
//         // jingnew, weinew, 100,
//         // jingnew1, weinew1, 100,
//         118.100557, 24.572146, 100,
//         118.110557, 24.572146, 100,
//     ])

//     let geometry = PolylineVolumeGeometry(ps1)
//     geometrys.push(geometry)
// }
// console.log('geometrys',geometrys);
