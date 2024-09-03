import gsap from 'gsap'
import * as Cesium from 'cesium'
// 图片材质 fromType
function imgfromType(imgurl: string, u: number | undefined, v: number | undefined) {
    let img2 = Cesium.Material.fromType("Image", {
        image: imgurl,
        // color:Cesium.Color.RED,
        repeat: new Cesium.Cartesian2(u, v),
    })
    return img2
}
// 图片材质fabric
function imgfabric(imgurl: any, u: number | undefined, v: number | undefined) {
    let img = new Cesium.Material({
        fabric: {
            // type: 'DiffuseMap',
            type: 'Image',
            uniforms: {
                image: imgurl,
                repeat: new Cesium.Cartesian2(u, v),
            },
        }
    })
    return img
}
//img 流动
function imgalpha(urlimg: string, color: any, u: number | undefined, v: number | undefined) {
    let img = new Cesium.Material({
        fabric: {
            uniforms: {
                color,
                image: urlimg,
                speed: 15,
                // repeat: new Cesium.Cartesian2(u, v),
            },
            source: `czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                     czm_material material = czm_getDefaultMaterial(materialInput);
                     vec2 st = materialInput.st;
                     vec4 colorImage = texture2D(image, vec2(fract((st.s - speed * czm_frameNumber * 0.0001)), st.t));
                     material.alpha = colorImage.a * color.a;
                     material.diffuse = color.rgb;
                     return material;
            }`,
        },
        translucent: function () {
            return true
        },
    });
    return img
}
//img 流动source
function imgsource(urlimg: string, u: number, v: number) {
    let img = new Cesium.Material({
        fabric: {
            uniforms: {
                uImg: urlimg,
                uTime: 0,
                repeat: new Cesium.Cartesian2(u, v),
            },
            source: `
            czm_material czm_getMaterial(czm_materialInput materialInput){
            czm_material material=czm_getDefaultMaterial(materialInput); 
            vec2 msterialUV = materialInput.st*repeat;//获取帧数  0-1  
            float animation =(czm_frameNumber/60.0);
            vec4 imgColor = texture2D(uImg,vec2(fract(msterialUV.x-animation),msterialUV.y));
            material.diffuse=vec3(imgColor.rgb);
            return material;
            
            // fract 取小数位
            // vec4 imgColor = texture2D(uImg,vec2(msterialUV.x,msterialUV.y));
            // vec4 imgColor = texture2D(uImg,vec2(fract(msterialUV.x-uTime),fract(msterialUV.y-uTime)));
            // vec4 imgColor = texture2D(uImg,vec2(msterialUV.x,msterialUV.y));
            // vec4 imgColor = texture2D(uImg,materialInput.st);
            // material.diffuse=vec3(materialInput.st,0.0);
            // material.diffuse=vec3(1.0,0.0,0.0);
            // material.alpha=0.5;
        }
        `
        }
    })
    return img
}
// 流动材质rgbgsapuTime
function rgbgsapuTime() {
    let img = new Cesium.Material({
        fabric: {
            // type: 'Image',
            uniforms: {
                uTime: 0,
            },
            source: `
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
              // 生成默认的基础材质
              czm_material material = czm_getDefaultMaterial(materialInput);
              float strength = mod((materialInput.s-uTime) * 1.0, 1.0);
              material.diffuse = vec3(strength, 0.0, 0.0);
            //   material.alpha=0.5;
              return material;
            }
          `,
        },
    });
    //使用gasp实现补间动画，完成动画效果
    gsap.to(img.uniforms, {
        uTime: 1,
        duration: 2,
        repeat: -1,
        ease: "linear",
    });
    return img
}
function rgbmaterial(color) {
    let img = new Cesium.Material({
        fabric: {
            uniforms: {//uniform的参数可在source里面直接使用
                color: color,
                alpha: 1.0,
                speep: 60.0,
            },
            source: /* glsl */ `
            czm_material czm_getMaterial(czm_materialInput materialInput){
                czm_material material=czm_getDefaultMaterial(materialInput);
                material.diffuse = color.rgb;
                float animation =(czm_frameNumber/speep);
                // material.alpha=fract(0.1+materialInput.st.s-animation);
                // material.alpha=fract(0.1-materialInput.st.s-animation);
                // material.alpha=mod(1.0-materialInput.st.s-animation,1.0);
                material.alpha=mod(1.0+materialInput.st.s-animation,alpha);
                return material;
            }
            `
        }
    })
    return img
}
export let materials = {
    imgfromType,
    imgfabric,
    imgalpha,
    imgsource,
    rgbgsapuTime,
    rgbmaterial,

}