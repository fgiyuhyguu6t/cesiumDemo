import * as Cesium from 'cesium'
// 4
export default class Bubble {
    constructor(val){
        this.viewer = val.viewer
        this.div=document.createElement("div");
    }
    addDynamicLabel(data){
        // console.log("data",data.name);
        let div = this.div
        div.id = data.id;
        // div.style.display="inline"
        div.style.position = "absolute";
        div.style.width = "300px";
        div.style.height = "30px";
        let HTMLTable = `
            <div style="background:#00ffef66;height:200px;border:"1px soild #08f8a7">${data.name}
                <div style="">
            </div>
        `;
        div.innerHTML = HTMLTable;
        this.viewer.cesiumWidget.container.appendChild(div);
        let gisPosition = data.position._value
        this.viewer.scene.postRender.addEventListener(() => {
            const canvasHeight = this.viewer.scene.canvas.height;
            const windowPosition = new Cesium.Cartesian2();
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                this.viewer.scene,
                gisPosition,
                windowPosition
            );
            div.style.bottom = canvasHeight - windowPosition.y +220 + "px";
            const elWidth = div.offsetWidth;
            div.style.left = windowPosition.x - elWidth / 2 + "px";
        }, this);
    }
    clearDiv(id){
        if(this.div){
            var parent = this.div.parentElement;
            parent.removeChild(this.div);
            // this.div.removeNode(true);
            this.viewer.scene.postRender.removeEventListener(this.addDynamicLabel,this)
        }
        
    }
}
