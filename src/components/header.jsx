import React from 'react';
import { Navbar,NavDropdown ,DropdownButton,Dropdown,Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'



import {login,controlSidebar} from './../action/action'
import {connect} from 'react-redux'


 class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      expanded:true
    }
  }


  handleLogout = () =>{
  
    this.props.login(false)
    
  }

  handleSidebar = ( ) =>{
    this.setState({expanded:!this.state.expanded})
    this.props.controlSidebar(!this.state.expanded)

  }
  handleChangePassword=()=>{
    this.props.history.push("/changePassword")
  }

  render() {
   
    return (
     <React.Fragment>
     <Navbar className="header" style={{ backgroundColor: '#b3d7ff ', borderColor: '#333' }}>
   
     <Navbar.Brand href="/">  {/*  style ={{width:"70px", height:"40px"}} */} CAYSHMET </Navbar.Brand>
     {  <button onClick={ ()=>this.handleSidebar()}><i className="material-icons">menu</i></button>}
     <DropdownButton id="dropdown-basic-button"  className="headerMargin"  title="Account">
  <Dropdown.Item > <Button  className="dropdown-item logout_btn" onClick={this.handleLogout}><div className="log_drop"><img src={process.env.PUBLIC_URL+"/logout.png"}/></div>Logout</Button></Dropdown.Item>
  <NavDropdown.Divider />
  {/* <Dropdown.Item > <Button  className="dropdown-item logout_btn" onClick={this.handleChangePassword}><div className="log_drop"><img src={process.env.PUBLIC_URL+"/key.png"}/></div>change Password</Button></Dropdown.Item> */}
</DropdownButton>





     
    </Navbar> 
     </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) =>({
  login:(value) => dispatch(login(value)),  
  controlSidebar:(value)=>{dispatch(controlSidebar(value))}
})

export default connect(null,mapDispatchToProps)(withRouter(Header))