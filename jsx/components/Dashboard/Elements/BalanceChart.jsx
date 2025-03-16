import React from "react";
import ReactApexChart from "react-apexcharts";

const  BalanceChart = () => {
    const  series = [
        {
            name: 'Net Profit',
            data: [70, 150, 100, 200, 100, 150, 150,70],
        }, 
    ];
    const  options = {
        chart: {
            type: 'area',
            height: 100,           
            toolbar: {
                show: false
            },           
            zoom: {
                enabled: false
            },
            sparkline: {
                enabled: true
            }
        },
       
        colors:['#2696FD'],
        legend: {
			show: false,
		},
        stroke: {
            show: true,
            width: 3,
            curve:'smooth',
            colors:['#4CBC9A'],
        },
       
        xaxis: {
            categories: ['Jan', 'feb', 'Mar', 'Apr', 'May'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false,
                style: {
                    fontSize: '12px',
                }
            },
            crosshairs: {
                show: false,
                position: 'front',
                stroke: {
                    width: 2,
                    dashArray: 3
                }
            },
            tooltip: {
                enabled: true,
                formatter: undefined,
                offsetY: 0,
                style: {
                    fontSize: '12px',
                }
            }
        },
        yaxis: {
            show: false,
        },
        fill: {
            type:'solid',
            opacity: 0.1,
            colors:'#4CBC9A'
        },
        tooltip: {
            enabled:false,
            
        },
    }     
    return (
        <div id="NewCustomers">
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={100}
            />
        </div>
    );
  
}
export default BalanceChart;
