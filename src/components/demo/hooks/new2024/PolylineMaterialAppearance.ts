import * as Cesium from 'cesium'
// 流动图形
/**
 * 
 * @param urlimg 图片材质路径
 * @param color 颜色
 * @returns 
 */
export function Polylineimgflow(urlimg:string, color) {
    let material = new Cesium.Material({
        fabric: {
            uniforms: {
                color,
                image: urlimg,
                speed: 10,
            },
            source: `czm_material czm_getMaterial(czm_materialInput materialInput)
            {
               czm_material material = czm_getDefaultMaterial(materialInput);
               vec2 st = materialInput.st;
               vec4 colorImage = texture2D(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
               material.alpha = colorImage.a * color.a;
               material.diffuse = color.rgb;
               return material;
            }`,
        },
    });
    return material
}
export let polylinematerial={Polylineimgflow}