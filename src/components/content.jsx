import React ,{Component} from 'react'
import Cards from './../elemnts/card'
import { Button } from 'react-bootstrap';
import {count,countGraph} from './../api/apiService'
import Chart from './../components/chart'
import Pie from './../elemnts/pie'
import { ENETUNREACH } from 'constants';

class Content extends Component {

constructor(props){
    super(props);
    this.state={
        count:{},
        chart:{},
        button:"weekly",
        current:['Monthly','Weekly','Weekly','Weekly'],
        user:[],
        spotlite:'',
        challenge:'',
        contest:'',
        type:1,
        pie:[1,2,3],
        pie1:[1,2,3]
        }
}
componentDidMount(){
   this.handleCount(this.state.type)
   this.handleChange(1,"user",2)
}

handleCount = (type) =>{
    count(type).then((result)=>{
     console.log(result,"handleCount")
     this.setState({count:result.account,pie:result.pie.first,pie1:result.pie.second})
        // this.setState({count:result,chart:result.chart,user:result.chart.user,
        //   spotlite:result.chart.spotlite,contest:result.chart.contest,challenge:result.chart.challenge,pie:result.count.pie})
    }).catch((err)=>{
        console.log(err)
    })
}


handleChange = (index,val,type) =>{
  console.log(index,val,type,"hhh")
  let newCurrent =this.state.current
  newCurrent[index] =this.state.current[index]==="Weekly"?"Monthly":"Weekly"
   
  countGraph(type).then((result)=>{
     console.log(result)
    this.setState({current:newCurrent,[val]:result})
}).catch((err)=>{
    console.log(err)
})
    /* let type =this.state.button==="weekly"?2:1 */
  /*  this.setState({current:newCurrent}) */
  /*  this.handleCount(type) */
}

render(){
   console.log(this.state.count);
   
  let {user,request,viewers,performer} = this.state.count
  let {pie} = this.state
  
    return(
        <React.Fragment>

          <div class="dashboard_main">
       
            <div class="user_valu">
              <ul>
                <li>
                  <div class="card_view_val">
                    <div className="value_icon">
                    <img src={process.env.PUBLIC_URL+"/001-profile-copy.png"} />
                    </div>
                    <div class="user_value">
                        <h3>User</h3>
                        <p>{user}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="card_view_val challange">
                    <div class="value_icon">
                    <img src={process.env.PUBLIC_URL+"/003-trophy-copy.png"} />
                    </div>
                    <div class="user_value">
                        <h3>Viewers</h3>
                        <p>{viewers}</p>
                    </div>
                  </div>
                </li>
                <li class="contest_vlu">
                  <div class="card_view_val contest">
                    <div class="value_icon">
                    <img src={process.env.PUBLIC_URL+"/photo-library-copy.png"} />
                    </div>
                    <div class="user_value">
                        <h3>Performers</h3>
                        <p>{performer}</p>
                    </div>
                  </div>
                </li>
                <li class="contest_vlu">
                  <div class="card_view_val spotlight">
                    <div class="value_icon">
                    <img src={process.env.PUBLIC_URL+"/Group-25-Copy.png"} />
                    </div>
                    <div class="user_value">
                        <h3>Requests</h3>
                        <p>{request}</p>
                    </div>
                  </div>
                </li>
              </ul>

            </div>
   
        <div class="user_chart_main">
        
          <div class="user_chart_vlu">
          <h2>User</h2>  </div>
          <div class="pie_chart_box">
          <Pie labels = {["viewers" ,"performers"]}  id ="pie2" data={pie}/>
          <div className="pieList">

            <h4 className="profile">Viewers <span>{pie[0]}</span></h4>
            <h4  className="profile1">Performers <span>{pie[1]}</span></h4>
            {/* <h4 className="profile2">Incomplete Profile<span>{pie[2]}</span></h4> */}
          </div>

          
          {/*  <img src={process.env.PUBLIC_URL+"/images/user-chart.png"} /> */}
        </div>

     
       
        </div>
           </div>

      


       
       <div class="dash_user_chart">
        <ul>

            <li>
                <div class="user_tables_cha">
                  <div class="user_monthly">
                <h2>User</h2>
                <button class="user_btn" onClick={()=>this.handleChange(0,'user',this.state.current[0]==="Weekly"?0:1)}>{this.state.current[0]}</button>
                </div>
                
                <div class="user_chart">
                <Chart  current={this.state.current[0]} charLabel="user" id="chart1" chart={this.state.user}/>
               {/*  <img src={process.env.PUBLIC_URL+"/barchart1.png"}/> */}
                </div>
                </div>
            </li>
            <li>
            {/* <div class="user_tables_cha">
            <div class="user_monthly">
                <h2>Challange</h2>
                <button class="user_btn" onClick={()=>this.handleChange(1,'challenge',this.state.current[1]==="Weekly"?0:1)}>{this.state.current[1]}</button>
                </div>
                <div class="user_chart">
                  <Chart  current={this.state.current[1]} charLabel="Challange" id="chart2" chart={this.state.challenge}/>
                <img src={process.env.PUBLIC_URL+"/graphchart1.png"}/>
                  </div>
               
                </div>
            </li>
            
            <li>
                <div class="user_tables_cha">
                <div class="user_monthly">
                <h2>Contest</h2>
                <button class="user_btn" onClick={()=>this.handleChange(2,'contest',this.state.current[2]==="Weekly"?0:1)}>{this.state.current[2]}</button>
                </div>
                
                <div class="user_chart">
                <Chart  current={this.state.current[2]} charLabel="Contest" id="chart3" chart={this.state.contest}/>
                <img src={process.env.PUBLIC_URL+"/barchart2.png"}/>
                </div>
                </div>
            </li>
            <li>
            <div class="user_tables_cha">
            <div class="user_monthly">
                <h2>Spotlight</h2>
                <button class="user_btn" onClick={()=>this.handleChange(3,'spotlite',this.state.current[3]==="Weekly"?0:1)}>{this.state.current[3]}</button>
                </div>
                <div class="user_chart">
                <Chart  current={this.state.current[3]} charLabel="Spotlight" id="chart4" chart={this.state.spotlite}/>
                <img src={process.env.PUBLIC_URL+"/barchart3.png"}/>
                  </div>
               
                </div> */}
                     <div class="user_chart_main table_chart">
           <div class="user_chart_vlu">
          <h2>Bookings</h2>  </div>
          <div class="pie_chart_box">
          <Pie labels = {["Accepted" ,"Rejected", "Ignored"]} id ="pie1" data={this.state.pie1}/>
          <div className="pieList">

            <h4 className="profile">Accepted <span>{this.state.pie1[0]}</span></h4>
            <h4  className="profile1">Rejected <span>{this.state.pie1[1]}</span></h4>
            <h4   className="profile2">Ignored <span>{this.state.pie1[2]}</span></h4>
            {/* <h4 className="profile2">Incomplete Profile<span>{pie[2]}</span></h4> */}
          </div>

          
          {/*  <img src={process.env.PUBLIC_URL+"/images/user-chart.png"} /> */}
        </div>
        </div>
            </li>
        </ul>

       </div>

        </React.Fragment>
    )
}

}
export default Content
