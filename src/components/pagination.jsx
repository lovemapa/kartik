import React  from 'react'
/* import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'; */
import Pagination from 'react-bootstrap/Pagination'


class Page extends React.Component {
    constructor(props){
     super(props)
     this.state= {
       leftLimit:0,
       disableNext:false,
       disablePrev:false,
       activePage:1,
       pageCount:1,
       limit:4,  //enteries per page 
       count:15,
       initial:1,
       total:5,
       pageLimit:4, //pagination pages 
       pos:0,
       end:1,

     }
    }
  



 componentWillReceiveProps(nextProps){
 
  let total =Math.ceil(nextProps.total/nextProps.limit)
  let pageLimit = total>4?4:total-1
  this.setState({total,pageLimit:pageLimit})

 }


  
 
    
 handlePage = (page)=>{ 

    this.props.handlePagination(page-1)
   this.setState({activePage:page})
 
 }
 handlenext =()=>{
   
  
  if(this.state.activePage < this.state.total){
      this.handlePage(this.state.activePage+1)
    let obj ={activePage:this.state.activePage+1}
    // if(this.state.initial<=this.state.activePage){
      
      if(this.state.total-this.state.pageLimit>this.state.initial){
        obj.initial=this.state.initial+1
     
        if(this.state.total-this.state.pageLimit>this.state.activePage){
          // obj.initial=this.state.initial+1
         
        
        }
      }
      

    
    // }
    this.setState(obj)
    
    
  
  }
   
 } 
 handlePrevious =( ) =>{
  this.handlePage(this.state.activePage-1)
  if(this.state.activePage >1&&this.state.activePage!==this.state.total){
    
    this.setState({activePage:this.state.activePage-1})
    if(this.state.activePage===this.state.initial&&this.state.activePage>=1){
      this.setState({initial:this.state.initial-1})
    }
  }else{
    this.setState({initial:this.state.total-this.state.pageLimit,activePage:this.state.activePage-1})
  }
 
 }
   handlePagination(){
     let table = []
     
  
     for (let i=this.state.initial; i<this.state.initial+this.state.pageLimit ; i++){
       table.push( <Pagination.Item onClick={()=>this.handlePage(i)} active={i===this.state.activePage?true:false} key={i}>

          {i}
        
       </Pagination.Item>)
     }
 
     return table
    
   }
 
   render() {
   
   
     return (
       <Pagination aria-label="Page navigation example">
       <Pagination.Prev  disabled={this.state.activePage-1<1} onClick={this.handlePrevious}/>
       {/* <Pagination.Item >...</Pagination.Item> */}
     
 
       {
         this.handlePagination()
        
       }

    {
     ( !(this.state.activePage>=this.state.total-1)||(this.state.initial!==this.state.total-this.state.pageLimit))&&this.state.total-this.state.initial>this.state.pageLimit
      &&<Pagination.Item >
       ...
     </Pagination.Item>}
      <Pagination.Item onClick={()=>this.handlePage(this.state.total)}  active={this.state.total===this.state.activePage?true:false} /* disabled={this.state.activePage==this.state.total} */>
         {this.state.total}
        </Pagination.Item>
        <Pagination.Next disabled={this.state.total===this.state.activePage} onClick={this.handlenext}/>
       </Pagination>
     );
   }
 }
 export default Page