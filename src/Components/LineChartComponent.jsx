import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import  React,{ useState,useEffect }  from 'react';
import zoomline from "fusioncharts/fusioncharts.zoomline";
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFusioncharts.fcRoot(FusionCharts,charts,zoomline,FusionTheme);
// Resolves charts dependancy
charts(FusionCharts);



function LineChartComponent({values}) {

    const [config,setConfig]=useState();

    useEffect(()=>{
          let timestamps="";
          let x="";
          let z="";
        for(let key in values){
            if(values.hasOwnProperty(key)){
                timestamps+=values[key].timestamp+"|";
                x+=values[key].x+"|";
                z+=values[key].z+"|";
            }
        }
        setConfig({
            chart: {
              caption: "Accelerometer vs Timestamp",
              subcaption: "Click & drag on the plot area to zoom & then scroll",
              yaxisname: "Acceleration(m/s2)",
              xaxisname: "Timestamp",
              forceaxislimits: "1",
              pixelsperpoint: "0",
              pixelsperlabel: "30",
              compactdatamode: "1",
              dataseparator: "|",
              theme: "fusion"
            },
            categories: [
              {
                category:timestamps.slice(0,-1)
                  
              }
            ],
            dataset: [
              {
                seriesname: "x",
                data:x.slice(0,-1)
                  
              },
              {
                seriesname: "z",
                data:z.slice(0,-1)
              }
            ]
          })
    },[values])
    return (
        config?
        <ReactFusioncharts
        type="zoomline"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={config}
      />:<div></div>
    )
}

export default LineChartComponent
