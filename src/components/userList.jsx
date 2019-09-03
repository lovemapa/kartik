import React ,{Component} from 'react'
import {Table} from 'react-bootstrap'
import {userList,changeUserStatus,changeUserType} from './../api/apiService'
import Pagination from './pagination'
import SimpleRating from './../elemnts/ratings'
import Switches from './../elemnts/switch'


export default class UserList extends Component {
    constructor(props){
        super(props)
        this.state={
            result:[],
            page:0,
            limit:10,
            total:0
        }
    }
    componentDidMount(){
        this.apiForGetUserList(this.state.page)
    }
    
    apiForGetUserList=(page) =>{
        
        userList(this.state.limit,page).then((result)=>{
             
            this.setState({result:[...result.data],total:result.total})
        }).catch(err=>console.log(err))
    }
    changeStatus = (data) =>{

        changeUserStatus({status:data.value?1:0,userId:data.userId}).then((result)=>{
            this.apiForGetUserList(this.state.page)
        })
    }

    changeUser = data =>{
        changeUserType({type:data.value?2:1,userId:data.userId}).then((result)=>{

        })
    }
    

    handlePagination =(page)=> {
      
        this.apiForGetUserList(page,this.state.limit)
    }

    render(){
        return(
            <React.Fragment>
                <h1>Users</h1>
            <Table responsive>
  <thead>
    <tr>
     
      <th>Name</th>
      <th>Username</th>
      <th>User Type</th>
        <th>Status</th>
      <th>Ratings</th>
      <th>Requests</th>
     {/*  <th>points</th> */}
      
    </tr>
  </thead>
  <tbody>
    {this.state.result.map((each,i)=>
        <tr key={i}>
        <td>{`${each.firstName} ${each.lastName}`}</td>
        <td>{each.email}</td>
        <td>{"Viewer"}<Switches id= {each._id} change ={(data)=>this.changeUser(data)}  type={each.userType==1?false:true}  />{"Performer"} {/*each.userType==1?"Viewer":"Performer"*/} </td>
        <td>{"offline"} <Switches  id= {each._id} change ={(data)=>this.changeStatus(data)} type= {each.status==0?false:true}/>
        {"online"}</td>
        <td><SimpleRating value={each.userRatings}/></td>
        <td>{each.requests}</td>
       {/*  <td>{each.point?each.point:0}</td> */}
    </tr>)}

    
  
  </tbody>
</Table>
<div className="pagination">


<Pagination total ={this.state.total} limit={4} limit={this.state.limit} handlePagination = {(value)=>this.handlePagination(value)}/>
</div>
            
            </React.Fragment>
        )
    }
}

