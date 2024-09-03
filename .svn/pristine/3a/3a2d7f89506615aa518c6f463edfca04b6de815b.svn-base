import * as Cesium from 'cesium'
// 流动图形
function Polylineimgflow(urlimg:string, color) {
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
// 发光流动
function Polylineglowflow(color) {
    let material =  new Cesium.Material({
                fabric : {
                    type : Cesium.Material.PolylineGlowType,
                    uniforms: {
                        color,
                        // color:  Cesium.Color.fromCssColorString('#0000ff'),
                        alpha: 1.0,
                        speep: 60.0,
                    },
                    source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput){
                        czm_material material=czm_getDefaultMaterial(materialInput);
                        material.diffuse = color.rgb;
                        float animation =(czm_frameNumber/speep);
                        material.alpha=mod(1.0+materialInput.st.s-animation,alpha);
                        // material.specular = 1.0;
                        // material.shininess = 0.8;
                        material.emission = vec3(0.0, 0.0, 2.0);
                        return material;
                    }
                    `
                }
            })
    return material
}
// 发光
function Polylineglow(color) {
    let material =  new Cesium.Material({
                fabric : {
                    type : Cesium.Material.PolylineGlowType,
                    uniforms: {
                        color,
                        // color:  Cesium.Color.fromCssColorString('#0000ff'),
                        glowPower:0.1,
                    }
                }
            })
    return material
}
export let polylinematerial={
    Polylineimgflow,Polylineglow,Polylineglowflow
}
var flowappearance = new Cesium.PolylineMaterialAppearance();
// flowappearance.material = material;