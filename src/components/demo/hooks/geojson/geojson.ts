import * as Cesium from 'cesium'
/**
 * 加载geojson
 * @param viewer 
 * @param url 
 * @returns 
 */
export function geojson(viewer,url:string) {
    var geojson = viewer.dataSources.add(Cesium.GeoJsonDataSource.load(url, 
    {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK,
        strokeWidth: 3,
        // markerSymbol: '?'
    }))
    return geojson
}

export function tileset(viewer,url?:string) {
      // 官方json  Cesium中加载3DTiles数据
  var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) }));
  var defaultStyle = new Cesium.Cesium3DTileStyle({
    color: "color('white', 0.5)", // 让建筑变透明
    show: true
  });
  city.style = defaultStyle;
}

