import React,{useRef, useState} from "react";
import ReactApexChart from "react-apexcharts";
import {Nav, Tab} from 'react-bootstrap';

const chartHeaderData = [
  { title: 'Week', type:'week'},
  { title: 'Month', type:'month'},
  { title: 'Year', type:'year'},
  { title: 'All', type:'all'},
];

const  CompanyOverView = () =>{
   // const [durration, setDurration] = useState('week');
    const chartRef = useRef();
    const  series = [
        {
            name: 'Number of Projects',
            type: 'column',
            data: [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75,100]
        }, {
            name: 'Revenue',
            type: 'area',
            data: [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42]
        }, {
            name: 'Active Projects',
            type: 'line',
            data: [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35,20]
        }
    ]
      
   const options = {
        chart: {
            height: 300,
            type: 'line',
            stacked: false,
            toolbar: {
              show: false,
            },
        },
       
        stroke: {
            width: [0, 1, 1],
            curve: 'straight',
            dashArray: [0, 0, 5]
        },
        legend: {
          fontSize: '13px',
          fontFamily: 'poppins',
          labels: {
            colors:'#888888', 
          }
        },
        plotOptions: {
            bar: {
                columnWidth: '18%',
                borderRadius: 3	,                
            }
        },
        fill: {            
            type : 'gradient',
            gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",           
              colorStops : [
                  [
                      {
                        offset: 0,
                        color: 'var(--primary)',
                        opacity: 1
                      },
                      {
                        offset: 100,
                        color: 'var(--primary)',
                        opacity: 1
                      }
                  ],
                  [
                      {
                        offset: 0,
                        color: '#3AC977',
                        opacity: 1
                      },
                      {
                        offset: 0.4,
                        color: '#3AC977',
                        opacity: .15
                      },
                      {
                        offset: 100,
                        color: '#3AC977',
                        opacity: 0
                      }
                  ],
                  [
                      {
                        offset: 0,
                        color: '#FF5E5E',
                        opacity: 1
                      },
                      {
                        offset: 100,
                        color: '#FF5E5E',
                        opacity: 1
                      }
                  ],
              ],
              stops: [0, 100, 100, 100]
            }
        },
        colors:["var(--primary)","#3AC977","#FF5E5E"],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        markers: {
            size: 0
        },
        xaxis: {
            type: 'month',
            labels: {
                 style: {
                    fontSize: '13px',
                    colors:'#888888',
                 },
            },
        },
        yaxis: {
            min: 0,
            tickAmount: 4,
            labels: {
                style: {
                    fontSize: '13px',
                    colors:'#888888',
                },
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " points";
                }
                return y;          
              }
            }
        }
   }   

    const dataSeries = (seriesType) =>{   
      var columnData = [];
			var areaData = [];
			var lineData = [];
			switch(seriesType) {
          case "week":
            columnData = [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75,100];
            areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42];
            lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35,20];
			break;
          case "month":
            columnData = [20, 50, 80, 52, 10, 80, 50, 30, 90, 10, 60,85];
            areaData = [40, 25, 85, 45, 85, 25, 95, 65, 45, 45, 20,12];
            lineData = [65, 45, 25, 65, 45, 25, 75, 35, 65, 75, 15,65];
			break;
          case "year":
            columnData = [30, 20, 80, 52, 10, 90, 50, 30, 75, 20, 60,85];
            areaData = [40, 25, 40, 45, 85, 25, 50, 65, 45, 60, 20,12];
            lineData = [65, 45, 30, 65, 45, 25, 75, 40, 65, 50, 15,65];
			break;
		  case "all":
            columnData = [20, 50, 80, 60, 10, 80, 50, 40, 85, 20, 60,85];
            areaData = [40, 25, 30, 45, 85, 25, 95, 65, 50, 45, 20,12];
            lineData = [65, 45, 25, 65, 45, 25, 30, 35, 65, 75, 15,65];
			break;
          default:
             columnData = [75, 80, 72, 100, 50, 100, 80, 30, 95, 35, 75,100];
             areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42];
             lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 30, 35,20];
		   }
		   chartRef.current.chart.ctx.updateSeries([
            {
                name: "Number of Projects",
                type: 'column',
                data: columnData
            },{
                name: 'Revenue',
                type: 'area',
                data: areaData
            },{
                name: 'Active Projects',
                type: 'line',
                data: lineData
            }
	    ]);
    }
    
    return (
      <>
          <Tab.Container defaultActiveKey={'Week'}>
            <div className="card-header border-0 pb-0 flex-wrap">
                <h4 className="heading mb-0">Company Overview</h4>                
                  <Nav as="ul" className="nav nav-pills mix-chart-tab">
                      {chartHeaderData.map((item, index)=>(
                        <Nav.Item as="li" className="nav-item" key={index}>
                            <Nav.Link  eventKey={item.title}
                              onClick={()=>dataSeries(item.type)}
                            >{item.title}</Nav.Link>
                        </Nav.Item>
                      ))}
                  </Nav>
            </div>
            <div className="card-body  p-0">                 
                <div id="overiewChart">       
                  <ReactApexChart
                    options={options}
                    series={series}
                    ref={chartRef}
                    type="line"
                    height={300}
                  />
                </div>                                
            </div>
          </Tab.Container>
      </>
    );
  
}

export default CompanyOverView;