import React ,{Component} from 'react'
import './../changePassword.css'
import {Form,Button} from "react-bootstrap"

import {  toast } from 'react-toastify';
import {changePost} from './../api/apiService'
import {login} from './../action/action'
import {connect} from 'react-redux'
import { Alert } from 'reactstrap';


 class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.state={
            oldPassword:"",
            newPassword:'',
            confirmPassword:'',
            isCorrect:false

        }
    }

    handleSubmit = (event) =>{
       
      event.preventDefault()
        if(this.state.oldPassword.length>2){
            changePost({email:this.props.email,oldPassword:this.state.oldPassword,newPassword:this.state.newPassword}).then((response)=>{
                toast(response.message)
                this.props.login(false)
                
            }).catch((err)=>{
                toast(err)
            })
            
        }else{
            toast("Old password required")
        }
        
       
    }

    render(){
       
        return(
            <React.Fragment>
              <div class="reset_pass_main">
            <div className="login-outer change_pass">
          { //this.state.err.length>0&&<Alert color="danger">{this.state.err[0]}</Alert>}
          }
           <h1>Change Password</h1>
            <div className="login reset_pass">
           
           <Form action="/home" onSubmit={(e)=>this.handleSubmit(e)}>
           <Form.Group controlId="formBasicEmail">
             <Form.Label>Old password</Form.Label>
             <Form.Control type="password" onChange={(e)=>this.setState({oldPassword:e.target.value})}  placeholder="old password" id="passzero" value={this.state.oldPassword} />
             <Form.Text className="text-muted">
             </Form.Text>
           </Form.Group>
           <Form.Group controlId="formBasicEmail">
             <Form.Label>New Password</Form.Label>
             <Form.Control  type="password" onChange={(e)=>this.setState({newPassword:e.target.value})}  placeholder="New Password" id="passOne" />
             <Form.Text className="text-muted">
             </Form.Text>
           </Form.Group>
         
            
           <Form.Group controlId="formBasicPassword">
             <Form.Label>Confirm Password</Form.Label>
             <Form.Control type="password" onChange={(e)=>this.setState({confirmPassword:e.target.value})} placeholder="Confirm Password" id="passTwo" />
           </Form.Group>
           <div class="login_btn">
           <Button disabled={this.state.newPassword!==this.state.confirmPassword} onClick={(e)=>this.handleSubmit(e)} variant="primary" type="submit">
             Submit
           </Button></div>
          
         </Form>
           </div>
           </div>
           </div>
         
           
         </React.Fragment>
         //   <div id="container">

               // <div id="header">
                   // <center><h1>Change Password</h1></center>
             //   </div>
               // <div  id="form">
                //<input type="password" onChange={(e)=>this.setState({oldPassword:e.target.value})}  placeholder="old password" id="passzero" />
                  //  <input type="password" onChange={(e)=>this.setState({newPassword:e.target.value})}  placeholder="New Password" id="passOne" />
                   // <input type="password" onChange={(e)=>this.setState({confirmPassword:e.target.value})} placeholder="Confirm Password" id="passTwo" />
               // </div>
                //<div id="footer" class={this.state.newPassword===this.state.confirmPassword&&this.state.newPassword.length>0?"correct":"incorrect"}>
                  // <Button onClick={(e)=>this.handleSubmit(e)} style={{"background-color":"#F26B6B"}}>change Password</Button>
                //</div>
            //</div>
           
        )
    }

    
}
let mapStateToProps = (state) =>{
    return {
        email:state.dataReducer.email
    }
}

let mapDispatchToProps = (dispatch)=>({
login:(isLogin)=>{dispatch(login(isLogin))}
})
export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword)

