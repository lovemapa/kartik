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
   let [data,changeData] =useState([])

   

   useEffect(()=>{
    createMonthlyChart()

    changeData(props.data)
  
   
   })



const createMonthlyChart=()=>{
 
    var ctx = document.getElementById(props.id);
  
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels:props.labels,
            datasets: [
                {
                    data: props.data,
                    backgroundColor: [
                        "#FF6384",
                        "#63FF84",
                       /*  "#84FF63", */
                        "#8463FF",
                        "#6384FF"
                    ]
                }]
        }
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
   
    
})
}


   
    return(
        <div className="pie_parent">
            <canvas id={props.id} width="400" height="200"></canvas>

        </div>
    )



}
export default Charts

