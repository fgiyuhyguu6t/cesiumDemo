import * as Cesium from 'cesium'
export function abc(viewer){
     
    var lujingdata = [[117.4603186710001, 31.14388249900003, 11.147400000001653],
        [117.45946237800001, 31.143739847000063, 11.108399999997346],
        [117.45859906800001, 31.143571198000075, 10.89079999999376],
        [117.45789337300005, 31.143422075000046, 11.12170000000333],
        [117.4571119630001, 31.143350937000037, 11.545700000002398],
        [117.45620292500007, 31.143325030000028, 11.529899999994086],
        [117.45545284400009, 31.143363754000063, 11.038100000005215],
        [117.45473256600008, 31.143448056000068, 10.86380000000645],
        [117.45399052200003, 31.143623321000064, 11.345600000000559],
        [117.45347615200001, 31.14381135600007, 11.687300000005052],
        [117.45292459000007, 31.144031608000034, 12.106100000004517],
        [117.45192097000006, 31.144426226000064, 12.842399999994086],
        [117.45065835500009, 31.144954275000032, 12.712299999999232],
        [117.44980033200011, 31.145266268000057, 12.504899999999907],
        [117.44943370300007, 31.145413392000023, 12.731599999999162],
        [117.44920128900003, 31.145382554000037, 12.967699999993783],
        [117.44897692800009, 31.144980649000047, 14.909599999999045],
        [117.44872415000009, 31.14449598400006, 14.55899999999383],
        [117.44851592000009, 31.144125416000065, 14.410999999992782],
        [117.44848024700002, 31.14392828000007, 14.475800000000163],
        [117.44948683700011, 31.14350793500006, 14.507400000002235],
        [117.45089297600009, 31.142959855000072, 14.290399999998044],
        [117.45149371900004, 31.142693826000027, 14.127099999997881],
        [117.45166848000008, 31.142571364000048, 15.52610000000277],
        [117.4516358520001, 31.142433625000024, 14.0341000000044],
        [117.45082070700005, 31.140899211000033, 13.289099999994505],
        [117.45082070700005, 31.140899211000033, 13.289099999994505]]

    //添加线
   let point = viewer.entities.add({
            name: "line",
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(lujingdata.flat()),
                material: Cesium.Color.RED,
                width: 1
            }
        })
        var property = new Cesium.SampledPositionProperty();
        var starttime = new Date();
        var stoptime;
        var timestamp = starttime.getTime();

        lujingdata.forEach((pos, index) => {
            var time = new Date(timestamp + index * 5000);
            stoptime = time;
            var position = Cesium.Cartesian3.fromDegrees(pos[0], pos[1], pos[2])
            property.addSample(Cesium.JulianDate.fromDate(time), position);
        })
        property.setInterpolationOptions({
            interpolationDegree: 0.0001,
            interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
        });

        var entitydd = viewer.entities.add({
            availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start: Cesium.JulianDate.fromDate(starttime),
                stop: Cesium.JulianDate.fromDate(new Date(stoptime))
            })]),
            position: property, // 点集
            billboard: {
                image: "../../../public/img/position.png",
                scale: 0.05,
                pixelOffset: new Cesium.Cartesian2(0,0),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                clampToGround: true  //是否贴地
            },
            path: {
                leadTime: 0,
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.GREEN
                }),
                width: 10
            }
        });
        viewer.clock.currentTime = Cesium.JulianDate.fromDate(starttime); //修改时间轴的当前时间
        viewer.clock.stopTime = Cesium.JulianDate.fromDate(new Date(stoptime));
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP,
        viewer.clock.shouldAnimate = true; //开始播放
        
        viewer.zoomTo(point)
}