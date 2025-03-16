 import React from "react";
import ReactApexChart from "react-apexcharts";

class FinanceMapBar extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {    
        series: [{
                name: "New Clients",
                data: [20, 40, 60, 35, 50, 70, 30, 15, 35, 40, 50, 60, 75, 40, 25, 70, 20, 40, 65, 50]
            },
            {
                name: "Retained Clients",
                data: [-28, -32, -12, -5, -35, -10, -30, -29, -18, -25, -38, -12, -22, -39, -35, -30, -10, -20, -35, -38]
            } 
        ],
        options: {
            chart: {
              type: 'bar',
              height: 300,
              stacked: true,
              toolbar: {
                  show: false,
              },
              backgroundBarRadius: 5,
              offsetX: -10,
            },
            colors:['var(--primary)', 'var(--secondary)'],
            plotOptions: {
              bar: {
                columnWidth: "45%",                
              },
            },
            dataLabels: {
              enabled: false
            },
            
            grid: {
                show: true,
            },
            legend: {
               show: false
           },
           fill: {
              opacity: 1
           },
            xaxis: {
              categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
              labels: {
                    style: {
                        colors: '#787878',
                        fontSize: '13px',
                        fontFamily: 'Poppins',
                        fontWeight: 400                    
                    },
                },
                crosshairs: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
              },
              yaxis: {            
                  labels: {
                      style: {
                          colors: '#787878',
                          fontSize: '13px',
                          fontFamily: 'Poppins',
                          fontWeight: 400                    
                      },
                  },
              },
            tooltip: {
                  x: {
                      show: true
                  }
            },
          },
        
        
        };
      }
  render() {
    return (
      <div id="chart" className="line-chart-style bar-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={300}
        />
      </div>
    );
  }
}

export default FinanceMapBar;
    