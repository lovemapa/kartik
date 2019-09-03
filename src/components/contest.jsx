import React ,{Component} from 'react'
import {Table} from 'react-bootstrap'
import { Button } from 'reactstrap';
import {connect} from 'react-redux'
import {getcontest,deleteContest} from './../api/apiService'
import {url} from './../api/apiService'
import {  toast } from 'react-toastify';
import Pagination from './pagination'
import {contestPost} from './../action/action'
import RulesModal from './../elemnts/model'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

  class Contest extends Component {

    constructor(props){
        super(props);
        this.state={
            result:[],
            limit:10,
            totalCount:5,
            displayRule:[],
            openModel:false,
            isOpen:false
            
        }
    }
    componentDidMount(){
      this.getContestApi(0,this.state.limit)
    }

    getContestApi(page,limit){
      getcontest({page,limit}).then((resp)=>{
        // console.log(result)
        this.setState({result:resp.data,totalCount:resp.count})
    }).catch((err)=>console.log(err))
    } 
    pushTocreateContest = ()=>{
        this.props.history.push("/createContest")
    }

    pushTogetPost =(contest) =>{
        this.props.contest(contest)
        this.props.history.push("/getPost")
    }

    handlePagination= (page,limit) =>{

      this.getContestApi(page,this.state.limit)

    }

    deleteContest = (contestId) =>{
      this.setState({isOpen:true})
      deleteContest(contestId).then((result) => {
        this.getContestApi()
         toast(result.data)
     }).catch(error => {
         toast(error.err)
     })
    
    }
    openRules =(eventId) =>{

      this.setState({displayRule: this.state.result.filter((each)=>each._id==eventId)[0].rules.value,openModel:true})
     
    }
    closeRules =()=>{
      this.setState({openModel:false})
    }
    handleClose= ()=>{
      this.setState({isOpen:false})
    }

    render(){
      
        
        return (
            <React.Fragment>
           <div class="contest_btn">
            <h1>Bookings</h1>
             {/* <Button color="primary contest_btn" onClick={this.pushTocreateContest}>Add new Contest</Button> */}
             </div>
             {/*<Dialog open={this.state.isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add sub field under Niche
          </DialogContentText>
          <input className="upload_btn" type="file" onChange={(e)=>{image(e)}}/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Sub Category"
            type="text"
            onChange={(e)=>{changeChategory(e.target.value)}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={} color="primary">
            Add
          </Button>
        </DialogActions>
        </Dialog>*/}
            <Table responsive>
            <thead>
              <tr>
               
                <th>sender</th>
                <th>Reciever</th>
                <th>status</th>
               
                
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((each,i)=>
                  <tr key={i}>
                  <td>{each.user.firstName} {each.user.lastName} </td>
                  <td>{each.performer.firstName} {each.performer.lastName}</td>
                  <td> {each.status==1?"Accepted":each.status==2?"Rejected":each.status==3?"Ignored":"Not Processed"} </td>
                  {/* <td><span><Button color="primary" onClick={()=>this.pushTogetPost({id:each._id,title:each.title})}>Post</Button> </span>  </td> */}
                  {/* <td><Button onClick={()=>this.openRules(each._id)} color="primary">Rules</Button></td> */}
                  {/* <td className="actions"> */}
                  {/* <button onClick={()=>this.deleteContest(each._id)}> <img src={process.env.PUBLIC_URL + '/images/icon2.png'}  /></button> */}
                 {/* </td> */}
              
              </tr>
              
              
              
             )}
          
              
            
            </tbody>
          </Table>
          <RulesModal open={this.state.openModel} rules={this.state.displayRule} closeModel={()=>this.closeRules()}/>
          <div className="pagination">
          <Pagination total = {this.state.totalCount} limit={this.state.limit} handlePagination = {(page)=>this.handlePagination(page)} />
            </div>
            </React.Fragment>
        )
    }
    






}

let mapDispatchToprops = (dispatch) =>({
    contest:(value)=>dispatch(contestPost(value))
})

export default connect(null,mapDispatchToprops)(Contest)