import React  from 'react'

import {Form,Button} from "react-bootstrap"
import {  toast } from 'react-toastify';
import {connect} from 'react-redux'
import {login,saveEmail} from './../action/action'
import {forgetPassword} from './../api/apiService'
import { Alert } from 'reactstrap';


 class foregetPassword  extends React.Component {

    constructor(props){
        super(props);
        this.state= {
          email:'',
          password:'',
          err:[]
        }
    }

    componentDidMount(){


        this.props.login(false)
     
    
    
    }

    handleValidation(){
      let err =[]
      if(this.state.email.length ==0){
        err.push("Email required")
      }
      if(this.state.password.length==0){
        err.push("Password required")
      }
      
      if(err.length>0){
        this.setState({err:[err[0]]})
      }
      return err.length>0?false:true
    }

    handleSubmit=(event) =>{
      event.preventDefault();
      forgetPassword(this.state.email).then((result)=>{
          console.log(result)
            toast(result.message)
        this.props.history.push("/")
      }).catch((error)=>{
        this.props.history.push("/")
        toast.error(error.err)
      })
  }


    render(){
      
      
        return (
          <React.Fragment>
             <div className="login-outer">
            {this.state.err.length>0&&<Alert color="danger">{this.state.err[0]}</Alert>}
            <h1>Picasso</h1>
             <div className="login">
                <h2>Forget Password</h2>
            <Form action="/home" onSubmit={(e)=>this.handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" onChange={(e)=>{this.setState({email:e.target.value})}} value={this.state.email} placeholder="Enter email" />
             
            </Form.Group>
          
            {/* <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e)=>{this.setState({password:e.target.value})}} value={this.state.password}  placeholder="Password" />
            </Form.Group> */}
            <div class="login_btn">
            <Button  disabled={!(this.state.email.length>3)} variant="primary" type="submit">
              Submit
            </Button></div>
           
          </Form>
            </div>
            </div> 
            
          </React.Fragment>
           
        
        );

    }
 
};

let mapStateToProps = (state) =>{
    return {
        email:state.dataReducer.email
    }
}

let mapDispatchToProps = (dispatch)=>({
login:(isLogin)=>{dispatch(login(isLogin))}
})
export default connect(mapStateToProps,mapDispatchToProps)(foregetPassword)

