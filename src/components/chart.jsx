import React ,{useState,useEffect} from 'react'
import Chart from 'chart.js'


const  Charts = (props) => {
/* 
constructor(props){
    super(props);
    this.state={
        monthly:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept','Oct','Nov','Dec'],
        weekly:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        current:'weekly',
        chart:{},
        user:[]
    }
   
} */


   let [monthly]=useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept','Oct','Nov','Dec'])
   let [weekly]=useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
   let [current,changeCurrent]=useState('Weekly')
   let [chart,changeChart]=useState([])

   

   useEffect(()=>{
    createMonthlyChart()

    changeChart(props.chart)
    changeCurrent(props.current)
   
   })



const createMonthlyChart=()=>{
 

    var ctx = document.getElementById(props.id);
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:current=='Weekly'?weekly:monthly,
        datasets: [{
            label: `# of ${props.charLabel}`,
            data: chart,
            borderColor: 'blue',
            borderWidth: 1,
           /*  borderColor: "#bae755", */
            borderDash: [5, 5],
            backgroundColor: "#74b8ff",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
        }/* ,
        {
            label: '# of Challange',
            data:chart.challenge,
          
            borderColor: 'rgba(250, 0, 80, 1)',
            borderWidth: 1
        },
        {
            label: '# of contest',
            data:chart.contest,
            
            borderColor: 'rgba(100, 40, 40, 1)',
            borderWidth: 1
        },
        {
            label: '# of spotlite',
            data:chart.spotlite,
          
            borderColor: 'rgba(200, 0, 0, 1)',
            borderWidth: 1
        } */




    ]
    },
    options: {
        backgroundColor:'rgb(10,10,10)',
        color: [
            'red',    // color for data at index 0
            'blue',   // color for data at index 1
            'green',  // color for data at index 2
            'black',  // color for data at index 3
            //...
        ],
        backgroundColor:'rgb(10,10,10)',
        
            legend: {
               display: false
            },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 20
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }
    
            }],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
                },
                ticks: {
                    padding: 20,
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold"
                }
            }]
        },
        
    }
});
}


   
    return(
        <div>
            <canvas id={props.id} width="400" height="200"></canvas>

        </div>
    )



}
export default Charts

