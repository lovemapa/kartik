import React  from 'react'
import {NavLink} from 'react-router-dom'
import {Form,Button} from "react-bootstrap"
import {  toast } from 'react-toastify';
import {connect} from 'react-redux'
import {login,saveEmail} from './../action/action'
import {loginApi} from './../api/apiService'
import { Alert } from 'reactstrap';


 class Login  extends React.Component {

    constructor(props){
        super(props);
        this.state= {
          email:'',
          password:'',
          err:[]
        }
    }

    componentDidMount(){

      if(this.props.isLogin){
 
        /* toast("Already logged In ") */
        this.props.history.push("/home")
      }else{
        this.props.login(false)
        this.props.history.push("/")
      }
    
    
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
      if(this.handleValidation()){
        loginApi({email:this.state.email,password:this.state.password}).then((result)=>{
         
          this.props.saveEmail(this.state.email)
           this.props.login(true)
        this.props.history.push('/home')
          toast("Login Success")
        }).catch((err)=>{
          console.log(err)
          toast.error(err.err, {
            position: toast.POSITION.TOP_RIGHT
          });
         /*  toast("Invalid Password") */
        })
    }
  }


    render(){
      
      
        return (
          <React.Fragment>
             <div className="login-outer">
            {this.state.err.length>0&&<Alert color="danger">{this.state.err[0]}</Alert>}
            <h1>CAYSHMET</h1>
             <div className="login">
               <h2>Login</h2>
            
            <Form action="/home" onSubmit={(e)=>this.handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" onChange={(e)=>{this.setState({email:e.target.value})}} value={this.state.email} placeholder="Enter email" />
             
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e)=>{this.setState({password:e.target.value})}} value={this.state.password}  placeholder="Password" />
            </Form.Group>
            {/* <NavLink to="forget"><p>Forget Password</p></NavLink> */}
            <div class="login_btn">
            <Button   variant="primary" type="submit">
              Submit
            </Button></div>
           
          </Form>
            </div>
            </div> 
            
          </React.Fragment>
           
        
        );

    }
 
};

let mapStateToProps = (state)=>{
  
  return {isLogin:state.dataReducer.isLogin}
  
}

let mapDispatchToProps = (dispatch) =>({
  login:(isLogin) =>dispatch(login(isLogin)),
  saveEmail:(email)=>dispatch(saveEmail(email))
})

 export default connect(mapStateToProps,mapDispatchToProps)(Login)
