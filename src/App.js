import React from 'react';
import './App.css';
import { HashRouter,Route, Redirect, Switch ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';


// component
import Content from './components/content'
import UserList from './components/userList'
import Challenge from './../src/components/challenges'
import CreateContest from "./components/createContest";
import SpotLite from './components/spotLite'
import Niche from './components/nicheList'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Login from './components/login'
import Contest from './components/contest'
import Posts from './components/getPost'
import ChangePassword from './components/changePassword'
import forgetPassword from './components/forgetPassword' 
import SimpleMap from './elemnts/map'



class  App extends  React.Component {
    constructor(props){
      super(props);
    }
    
  

  render(){

   
    return (
      <div className="App">
      <HashRouter>
      <div className="header">
     {this.props.isLogin && <Header/>}
     <ToastContainer/>
      </div>
    
       <div className= {!this.props.isLogin?"main-con-login":"main-con"}>
      {this.props.isLogin && <Sidebar/>}
      <div className="mainParent">

      <div className ={this.props.isLogin?"contentOther":"contentlogin"}>
        <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/forget" exact component={forgetPassword}/>
        {this.props.isLogin&&<Route path="/changePassword" component={ChangePassword}/>}
      {this.props.isLogin&&<Route path="/home" exact component={Content}/>}
      {this.props.isLogin&& <Route path="/user" component={UserList} />}
      {this.props.isLogin&&<Route path="/booking" component={Contest}/>}
      {this.props.isLogin&&<Route path="/spotlight" component={SpotLite} />}
      {this.props.isLogin&&<Route path="/challange" component={Challenge} />}
      {this.props.isLogin&& <Route path="/getPost" component={Posts} />}
      {this.props.isLogin&&<Route path="/createContest" component={CreateContest}/>}
      {this.props.isLogin&&<Route path="/niche" component={SimpleMap}/>}
      <Redirect to="/"/>
        </Switch>
      


      

       
  
  
      </div>

      </div>
      
    </div> 
             
      </HashRouter>
      
      </div>
    )
  }
  
}
let mapStateToProps = (state ) =>{

  return {isLogin:state.dataReducer.isLogin}
}

export default connect(mapStateToProps)(App);
