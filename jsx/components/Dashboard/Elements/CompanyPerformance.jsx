import React from "react";
import ReactApexChart from "react-apexcharts";

const  CompanyPerformance = () => {
    const  series = [
        {
            name: 'series1',
            data: [200, 400, 300, 400, 200, 400]
        }, 
        {
            name: 'series2',
            data: [500, 300, 400, 200, 500, 200]
        }
    ];
    const  options = {
        chart: {
            type: 'area',
            height: 280,           
            toolbar: {
                show: false
            },           
        },
        dataLabels: {
            enabled: false
        },
        colors:["var(--rgba-primary-1)","#f5a792"],
        stroke: {
            curve: 'smooth',
            width:3,
            colors:["var(--primary)","var(--secondary)"],
        },
        legend: {
			show: false,
		},
        grid:{
			show:false,
			strokeDashArray: 6,
			borderColor: '#dadada',
		},
		yaxis: {
		  labels: {
			style: {
				colors: '#B5B5C3',
				fontSize: '12px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			},
			formatter: function (value) {
			  return value + "k";
			}
		  },
		},
        
        xaxis: {
            categories: ["Week 01","Week 02","Week 03","Week 04","Week 05","Week 06"],
            labels:{
                style: {
                    colors: '#B5B5C3',
                    fontSize: '12px',
                    fontFamily: 'Poppins',
                    fontWeight: 400                  
                },
            }
        },
        fill:{
            type:'solid',
            opacity:0.05
        },
        tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
        },
    }     
    return (
        <div id="marketChart">
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={280}
            />
        </div>
    );
  
}
export default CompanyPerformance;
