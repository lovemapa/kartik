
import React ,{Component} from 'react'
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import {withRouter,NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


import '@trendmicro/react-sidenav/dist/react-sidenav.css';




class Sidebar extends Component {

constructor(props){
    super(props)
    this.state={

    }
}



    handleClick =(path)=>{
        this.props.history.push(path)
    }
    render(){
       console.log(this.props.expanded)
        return (
         
        <React.Fragment>
               <SideNav expanded={this.props.expanded}>
               {/*  <SideNav.Toggle/> */}
                <SideNav.Nav  defaultSelected="/">
                    <NavItem  onClick ={()=>this.handleClick('/home')} eventKey="">
                        <NavIcon>
                        <NavLink to="/home"><i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></NavLink> 
                        </NavIcon>
                        
                        <NavText>
                        <NavLink  to="/home">Dashboard</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="users" onClick ={()=>this.handleClick('/user')}> 
                        <NavIcon>
                        <NavLink to="/user"><i className="material-icons">supervised_user_circle</i></NavLink>
                        
                        </NavIcon>
                        <NavText>
                        <NavLink to="/user">Users</NavLink>
                        </NavText>
                   </NavItem> 
                    <NavItem eventKey="" onClick ={()=>this.handleClick('/booking')}>
                    <NavLink to="/booking"></NavLink>
                    <NavIcon>
                    <NavLink to="/booking"><i className="material-icons">crop_original</i></NavLink>
                    </NavIcon>
                    <NavText>
                    <NavLink to="/booking">Bookings</NavLink>
                    </NavText>
                </NavItem>

                {/* <NavItem eventKey="" onClick ={()=>this.handleClick('/contest')}>
                    <NavLink to="/contest"></NavLink>
                    <NavIcon>
                    <NavLink to="/contest"><i className="material-icons">poll</i></NavLink>
                    </NavIcon>
                    <NavText>
                    <NavLink to="/contest">Contest</NavLink>
                    </NavText>
                </NavItem>
                <NavItem eventKey="" onClick ={()=>this.handleClick('/challange')}>
                <NavLink to="/challange"></NavLink>
                <NavIcon>
                <NavLink to="/challange"><i className="material-icons">pages</i></NavLink>
                </NavIcon>
                <NavText>
                <NavLink to="/challange">Challanges</NavLink>
                </NavText>
            </NavItem>
            <NavItem eventKey="" onClick ={()=>this.handleClick('/niche')}>
                <NavLink to="/niche"></NavLink>
                <NavIcon>
                <NavLink to="/niche"><i className="material-icons">
face
</i></NavLink>
                </NavIcon>
                <NavText>
                <NavLink to="/niche">Niche</NavLink>
                </NavText>
            </NavItem> */}

                </SideNav.Nav>
             </SideNav>
        </React.Fragment>
    )}
    
   
}


let mapStateToProps = ( state) =>{
    return {expanded:state.dataReducer.expanded}
}

export default connect(mapStateToProps)(withRouter(Sidebar))