import gsap from 'gsap'
import * as Cesium from 'cesium'
import { ref } from 'vue'
// 颜色1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// attributes颜色
const newcolor = new Cesium.ColorGeometryInstanceAttribute(1, 0, 0, 1)
const colorMaterial = Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 1, 1, 1))
const colorMaterial1 = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
// appearance颜色
const ccc = Cesium.Color.fromCssColorString('#7ffeff')
const aaa = new Cesium.Color(1.0, 1.0, 1.0, 1)

// 材质 material 333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
var material1 = Cesium.Material.fromType('Color');
//     material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 1);

// 颜色材质
var materialcolor = Cesium.Material.fromType('Color');
materialcolor.uniforms.color = new Cesium.Color(0.0, 0.0, 1.0, 0.5);
function materialsourceimg(Nurlimg) {
    let material = new Cesium.Material({
        fabric: {
            uniforms: {
                color: new Cesium.Color(1.0, 1.0, 1.0, 1),
                image: Nurlimg,
                speed: 10,
            },
            source:`czm_material czm_getMaterial(czm_materialInput materialInput)
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

// 图片材质 fromType
function materialimg2(imgurl: string, u: number | undefined, v: number | undefined) {
    let img2 = Cesium.Material.fromType("Image", {
        image: imgurl,
        // color:Cesium.Color.RED,
        repeat: new Cesium.Cartesian2(u, v),
    })
    return img2
}
// 图片材质fabric
function materialimg3(imgurl: any, u: number | undefined, v: number | undefined) {
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
function materialimg4(urlimg: string, color: any, u: number | undefined, v: number | undefined) {
    let img = new Cesium.Material({
        fabric: {
            uniforms: {
                color,
                image: urlimg,
                speed: 15,
                repeat: new Cesium.Cartesian2(u, v),
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
        translucent: function () {
            return true
        },
    });
    return img
}
function materialimg5(urlimg: string) {
    let img = new Cesium.Material({
        fabric: {
            uniforms: {
                image: urlimg,
                alpha: 1.0,
            },
            source: /* glsl */ `
                czm_material czm_getMaterial(czm_materialInput materialInput){
                    czm_material material=czm_getDefaultMaterial(materialInput);
                    material.diffuse=texture2D(image,materialInput.st).rgb;
                    return material;
                }
            `
        }
    })
    return img
}
//img 流动source
function materialimg6(urlimg: string, u: number, v: number) {
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
            vec2 msterialUV =repeat * materialInput.st;//获取帧数  0-1  
            float animation =(czm_frameNumber/60.0);
            vec4 imgColor = texture2D(uImg,vec2(fract(msterialUV.x-animation),msterialUV.y));
            // vec4 imgColor = texture2D(uImg,vec2(msterialUV.x,msterialUV.y));
            material.diffuse=vec3(imgColor.rgb);
            return material;

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
// repeat 还没好
function materialimg7(urlimg: string) {
    let img = new Cesium.Material({
        fabric: {
            type: "FlowLine",
            uniforms: {
                color: new Cesium.Color(1, 0, 0, 1.0),
                image:urlimg,
                time: 0,
                repeat: new Cesium.Cartesian2(2.0, 1.0)
            },
     
            source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                        {\n\
                            czm_material material = czm_getDefaultMaterial(materialInput);\n\
                            vec2 st = repeat * materialInput.st;\n\
                            vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                            if(color.a == 0.0)\n\
                            {\n\
                                material.alpha = colorImage.a;\n\
                                material.diffuse = colorImage.rgb; \n\
                            }\n\
                            else\n\
                            {\n\
                                material.alpha = colorImage.a * color.a;\n\
                                material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb); \n\
                            }\n\
                            return material;\n\
                        }"
        }
    })
    return img
}
// 流动材质
function materialimgtime() {
    let img = new Cesium.Material({
        fabric: {
            // type: 'Image',
            uniforms: {
                uTime: 0,
                // image:'../../../../../public/img/checkerboard.png'
            },
            source: `
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
              // 生成默认的基础材质
              czm_material material = czm_getDefaultMaterial(materialInput);
              float strength = mod((materialInput.s-uTime) * 10.0, 1.0);
              material.diffuse = vec3(strength, 0.0, 0.0);
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
function materialimgld(Nurlimg) {
    let img = new Cesium.Material({
        fabric: {
            uniforms: {
                color: new Cesium.Color(1.0, 1.0, 1.0, 1),
                image: Nurlimg,
                speed: 10,
                // repeat: new Cesium.Cartesian2(2, 1),
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
        translucent: function () {
            return true
        },
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
// 着色器练习
function materialsource() {
    let img = new Cesium.Material({
        fabric: {
            // type: 'Image',
            uniforms: {
                my_var: 1.0,//可以通过js修改
            },
            source: `
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
              czm_material material = czm_getDefaultMaterial(materialInput);
              material.diffuse = vec3(materialInput.str);
            //   material.diffuse = vec3(materialInput.st,0.0);
            //   material.diffuse = vec3(materialInput.s,0.0,0.0);
            //   material.diffuse = vec3(0.5,0.5,0.0);
              material.alpha = my_var;
            //   material.specular = 1.0;
            //   material.shininess = 0.8;
            // material.emission = vec3(0.0, 0.66666666, 0.0);
              return material;
            }
          `,
        },
    });
    return img
}
// 漫反射
function materialimgDiffuseMap(imgurl: string) {
    let img = Cesium.Material.fromType("DiffuseMap", {
        image: imgurl,
    });
    return img
}
// 网格
function materialimgGrid() {
    let img = Cesium.Material.fromType("Grid", {
        color: Cesium.Color.AQUA.withAlpha(0.5),
        cellAlpha: 0.2,
        lineCount: new Cesium.Cartesian2(4, 4),
        lineThickness: new Cesium.Cartesian2(4.0, 4.0),
    })
    return img
}
// 水
function materialimgWater(urlimg: string) {
    let img = Cesium.Material.fromType("Water", {
        baseWaterColor: Cesium.Color.AQUA.withAlpha(0.8),
        distortion: 0.25,
        normalMap: urlimg,
    })
    return img
}
// 水
function Water(urlimg: string) {
    let img = new Cesium.Material({
        fabric: {
            type: 'Water',
            uniforms: {
                baseWaterColor:new Cesium.Color(64/255,157/255,253/255,0.5),//水的颜色
                normalMap: urlimg,//法线图片
                frequency:200,//控制波数的数字。
                animationSpeed:0.05,//控制水的动画速度的数字。
                amplitude:4, //控制水波幅度的数字。
                specularIntensity:0.5,//控制镜面反射强度的数字
                // repeat: new Cesium.Cartesian2(u, v),
            },
        }
    })
    return img
}
// 圆扩散材质
function materialyuan() {
    let img = new Cesium.Material({
        fabric: {
            uniforms: {
                color: Cesium.Color.fromCssColorString('#00E8FF'),
                time: 10
            },
            source: `czm_material czm_getMaterial(czm_materialInput materialInput)
                   {
                       czm_material material = czm_getDefaultMaterial(materialInput);
                       material.diffuse = 1.5 * color.rgb;
                       vec2 st = materialInput.st;
                       float dis = distance(st, vec2(0.5, 0.5));
                       float per = fract(czm_frameNumber * time / 1000.0);
                       if(dis > per * 0.5) {
                         material.alpha = 0.0;
                         discard;
                       }else{
                         material.alpha = color.a * dis / per / 1.0;
                       }
                       return material;
                   }`
        }
    })
    return img
}
function materialyuan2() {
    let img = new Cesium.Material({
        fabric: {
            uniforms: {
                color: Cesium.Color.fromCssColorString('#00E8FF'),
                time: 10,
                count: 2,
                gradient: 0.2
            },
            source: `czm_material czm_getMaterial(czm_materialInput materialInput)
                   {
                       czm_material material = czm_getDefaultMaterial(materialInput);
                       material.diffuse = 1.5 * color.rgb;
                       vec2 st = materialInput.st;
                       float dis = distance(st, vec2(0.5, 0.5));
                       float per = fract(czm_frameNumber * time / 1000.0);
                       if(count == 1.0){
                            if(dis > per * 0.5){
                                discard;
                            }else {
                                material.alpha = color.a  * dis / per / 2.0;
                            }
                        } else {
                            vec3 str = materialInput.str;
                            if(abs(str.z)  > 0.001){
                                discard;
                            }
                            if(dis > 0.5){
                                discard;
                            }else {
                                float perDis = 0.5 / count;
                                float disNum;
                                float bl = 0.0;
                                for(int i = 0; i <= 999; i++){
                                    if(float(i) <= count){
                                        disNum = perDis * float(i) - dis + per / count;
                                        if(disNum > 0.0){
                                            if(disNum < perDis){
                                                bl = 1.0 - disNum / perDis;
                                            }else if(disNum - perDis < perDis){
                                                bl = 1.0 - abs(1.0 - disNum / perDis);
                                            }
                                            material.alpha = pow(bl,(1.0 + 10.0 * (1.0 - gradient)));
                                        }
                                    }
                                }
                            }
                        }
                       return material;
                   }`
        }
    })
    return img
}

// function materialyuan(){}
export let materialall = {
    materialcolor,
    materialimg2,
    materialimg3,
    materialsourceimg,
    materialimg5,
    materialimg4,
    materialimg6,
    materialimg7,
    materialimgDiffuseMap,
    materialimgGrid,
    materialimgWater,
    Water,
    materialimgtime,
    materialimgld,
    materialsource,
    materialyuan,
    materialyuan2,
    rgbmaterial,
}

function materiala2() {
    let aper = new Cesium.MaterialAppearance({
        material: new Cesium.Material({
            fabric: {
                type: 'Image',
                uniforms: {
                    color_2: new Cesium.Color(1, 1, 1, 1),
                    image_0: "./img/fsb.png",
                    image_1: "./img/ggj.png",
                    repeat_1: new Cesium.Cartesian2(1, 1),
                },
                source: `
          uniform vec4 color_2;
          uniform vec2 repeat_1;
          uniform sampler2D image_0;
          uniform sampler2D image_1;
          czm_material czm_getMaterial(czm_materialInput materialInput, float imgIdx)
          {
          czm_material material = czm_getDefaultMaterial(materialInput);
          if(abs(imgIdx - 1.0)<0.1){
            material.diffuse = texture2D(image_0, fract(repeat_1 * materialInput.st)).rgb;
          }else if(abs(imgIdx - 2.0)<0.1){
            material.diffuse = texture2D(image_1, fract(repeat_1 * materialInput.st)).rgb;
          }else{
            material.diffuse = vec3(1,0,0);
          }
          material.alpha = 1.0;
          return material;
          }
        `,
            }
        }),
        vertexShaderSource: `
        attribute vec3 position3DHigh;
        attribute vec3 position3DLow;
        attribute vec3 normal;
        attribute vec2 st;
        attribute float imgIdx;
        attribute float batchId;
        varying vec3 v_positionEC;
        varying vec3 v_normalEC;
        varying vec2 v_st;
        varying float v_imgIdx;
        void main()
        {
            vec4 p = czm_computePosition();
            v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
            v_normalEC = czm_normal * normal;                         // normal in eye coordinates
            v_st = st;
            v_imgIdx = imgIdx;
            gl_Position = czm_modelViewProjectionRelativeToEye * p;
        }
                    `,
        fragmentShaderSource: `
varying vec3 v_positionEC;
varying vec3 v_normalEC;
varying vec2 v_st;
varying float v_imgIdx;
void main()
{
vec3 positionToEyeEC = -v_positionEC;
vec3 normalEC = normalize(v_normalEC);
#ifdef FACE_FORWARD
normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);
#endif
czm_materialInput materialInput;
materialInput.normalEC = normalEC;
materialInput.positionToEyeEC = positionToEyeEC;
materialInput.st = v_st;
czm_material material = czm_getMaterial(materialInput,v_imgIdx);
#ifdef FLAT
gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);
#else
gl_FragColor = czm_phong(normalize(positionToEyeEC), material);
#endif
}
                `,
    });
}

// appearance 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
// 着色器，修改正负，和速度
function clockwise() {
    return `czm_material czm_getMaterial(czm_materialInput materialInput)
    {
       czm_material material = czm_getDefaultMaterial(materialInput);
       vec2 st = materialInput.st;
       vec4 colorImage = texture2D(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
       material.alpha = colorImage.a * color.a;
       material.diffuse = color.rgb;
       return material;
    }`
}
/**流动
 * 
 * @param urlimg 图片 
 * @param color 颜色
 * @returns 
 */
function PolylineMaterialAppearance(urlimg, color) {
    let source = clockwise()
    let Nurlimg = urlimg
    let material = new Cesium.Material({
        fabric: {
            uniforms: {
                color,
                image: Nurlimg,
                speed: 10,
            },
            source: source,
        },
        translucent: function () {
            return true
        },
    });
    var flowappearance = new Cesium.PolylineMaterialAppearance();
    flowappearance.material = material;
    return flowappearance
}

/**流动
 * 
 * @param urlimg 图片 
 * @param color 颜色
 * @returns 
 */
function EllipsoidSurfaceAppearance(urlimg: string) {
    let Nurlimg = urlimg
    let material = new Cesium.Material({
        fabric: {
            uniforms: {
                color: new Cesium.Color(1.0, 1.0, 1.0, 1),
                image: Nurlimg,
                repeat: {
                    x: 10,
                    y: 2
                },
                // repeat: new Cesium.Cartesian2(1, 1),
                speed: 10,
            },
            source: `czm_material czm_getMaterial(czm_materialInput materialInput)
            {
               czm_material material = czm_getDefaultMaterial(materialInput);
               vec2 st = materialInput.st;
            //    czm_frameNumber 获取帧数
               vec4 colorImage = texture2D(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
               material.alpha = colorImage.a * color.a;
               material.diffuse = color.rgb;
               return material;
            }`,
        },
        // translucent: function () {
        //     return true
        // },
    });
    var flowappearance = new Cesium.EllipsoidSurfaceAppearance();
    flowappearance.material = material;
    return flowappearance
}

function MaterialAppearance(urlimg: string, color: any) {
    let source = clockwise()
    let Nurlimg = urlimg
    let material = new Cesium.Material({
        fabric: {
            uniforms: {
                color,
                image: Nurlimg,
                speed: 10,
            },
            source: source,
        },
        translucent: function () {
            return true
        },
    });
    var MaterialA = new Cesium.MaterialAppearance();
    MaterialA.material = material;

    // var appearance = new Cesium.PolylineVolumeAppearance({
    //     material : material
    // });

    return MaterialA
}
const materialAppearance = new Cesium.MaterialAppearance({
    // aboveGround: true,
    // closed: false,
    // material: material,
    renderState: {
        blending: Cesium.BlendingState.DISABLED, //混合
        depthTest: { enabled: true }, //深度测试
        depthMask: true,
    },
    // vertexShaderSource: this.vshader, //顶点着色器写在这里
    // fragmentShaderSource: this.fshader,
})
// 颜色流动
const ma = new Cesium.MaterialAppearance({
    // aboveGround: true,
    faceForward: true,
    material: new Cesium.Material({
        fabric: {
            uniforms: {
                color: 'vec3(1.0,1.0,0.0)',
                alpha: 1.0,
                // image: '../../../../../public/img/red.png',
                // image2: '../../../../../public/img/red.png',
                t: 0.0
            },
            source: /* glsl */ `
            czm_material czm_getMaterial(czm_materialInput materialInput){
                czm_material material=czm_getDefaultMaterial(materialInput);
                material.diffuse=vec3(0.0,1.0,0.0);                                              
                // material.alpha=fract(0.1-materialInput.st.s+t);
                material.alpha=mod(0.001-materialInput.st.s+t,1.0);
                return material;
            }
            `
        }
    })
})
setInterval(() => {
    ma.material.uniforms.t += 0.1;
    if (ma.material.uniforms.t > 1.0) {
        ma.material.uniforms.t = 0.0;
    }
}, 200);

// class CustomMatrial{
//     constructor(){
//         Cesium.Material._materialCache.addMaterial('name',{
//             fabric:{
//                 typr:'cu',
//                 uniforms:{},
//                 source:`
//                 czm_material czm_getMaterial(czm_materialInput materialInput){
//                     czm_material material=czm_getDefaultMaterial(materialInput); 
//                     material.diffuse=vec3(1.0,0.0,0.0);
//                     return material
//                 }
//                 `
//             }
//         }
//         )
//     }
// }
// let materialzdy =new CustomMatrial()
function wallMaterialAppearance() {
    // 墙
    let image = '../../../public/img/red.png' //选择自己的动态材质图片
    let color = Cesium.Color.fromCssColorString('rgba(0, 255, 255, 1)')
    let speed = 1
    let source = 'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
        czm_material material = czm_getDefaultMaterial(materialInput);\n\
        vec2 st = materialInput.st;\n\
        vec4 colorImage = texture2D(image, vec2(fract((st.t - speed*czm_frameNumber*0.005)), st.t));\n\
        vec4 fragColor;\n\
        fragColor.rgb = color.rgb / 1.0;\n\
        fragColor = czm_gammaCorrect(fragColor);\n\
        material.alpha = colorImage.a * color.a;\n\
        material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
        material.emission = fragColor.rgb;\n\
        return material;\n\
    }'
    let wallmaterial = new Cesium.Material({
        fabric: {
            type: 'PolylinePulseLink',
            uniforms: {
                color: color,
                image: image,
                speed: speed,
            },
            source: source,
        },
        translucent: function () {
            return true
        },
    })
    const wallmaterialappearance = new Cesium.MaterialAppearance({
        material: wallmaterial,
    })
    return wallmaterialappearance
}
function materialAppearance1(imgurl: string, u: number, v: number) {
    const wallmaterialappearance = new Cesium.MaterialAppearance({
        material: materialall.materialimg3(imgurl, u, v),
        // material: materialall.materialimg2('../../../../../public/img/checkerboard.png'),
    })
    return wallmaterialappearance
}
function EllipsoidSurfaceAppearance1(imgurl: string, u: number, v: number) {
    const wallmaterialappearance = new Cesium.EllipsoidSurfaceAppearance({
        material: materialall.materialimg3(imgurl, u, v),
        // material: materialall.materialimg2('../../../../../public/img/checkerboard.png'),
    })
    return wallmaterialappearance
}
// 着色器材质aper
const aper = new Cesium.MaterialAppearance({
    fragmentShaderSource:
        ` varying vec3 v_positionEC;
      varying vec3 v_normalEC;
      varying vec2 v_st;
  
      void main()
      {
          vec3 positionToEyeEC = -v_positionEC;
  
          vec3 normalEC = normalize(v_normalEC);
      #ifdef FACE_FORWARD
          normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);
      #endif
  
          czm_materialInput materialInput;
          materialInput.normalEC = normalEC;
          materialInput.positionToEyeEC = positionToEyeEC;
          materialInput.st = v_st;
          czm_material material = czm_getMaterial(materialInput);
  
      #ifdef FLAT
          gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);
      #else
          gl_FragColor = czm_phong(normalize(positionToEyeEC), material, czm_lightDirectionEC);
      #endif
      }
     `
});
const aper2 = new Cesium.MaterialAppearance({
    fragmentShaderSource:
        ` varying vec3 v_positionEC;
      varying vec3 v_normalEC;
      varying vec2 v_st;
  
      void main()
      {
          vec3 positionToEyeEC = -v_positionEC;
  
          vec3 normalEC = normalize(v_normalEC);
      #ifdef FACE_FORWARD
          normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);
      #endif
  
          czm_materialInput materialInput;
          materialInput.normalEC = normalEC;
          materialInput.positionToEyeEC = positionToEyeEC;
          materialInput.st = v_st;
          czm_material material = czm_getMaterial(materialInput);
                  material.diffuse = vec3(0.24313725490196078, 0.7372549019607844, 0.9333333333333333);
                material.emission = vec3(0.0, 0.66666666, 0.0);
          material.specular = 0.5;
          material.shininess = 0.8;
  
      #ifdef FLAT
          gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);
      #else
          gl_FragColor = czm_phong(normalize(positionToEyeEC), material, czm_lightDirectionEC);
      #endif
      }
     `
});

export let maps = {
    PolylineMaterialAppearance,
    MaterialAppearance: MaterialAppearance,//不能用，多段柱体流动没出来
    wallMaterialAppearance,
    materialAppearance1,
    aper,//fragmentShaderSource 材质
    aper2,//fragmentShaderSource 材质
    ma,
    EllipsoidSurfaceAppearance1,//图片
    EllipsoidSurfaceAppearance,
}
