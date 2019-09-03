import React ,{Component} from 'react'
import {Table} from 'react-bootstrap'
import {getChallangeList} from './../api/apiService'
import {url} from './../api/apiService'
import { Button } from 'reactstrap';
import { Player, BigPlayButton } from 'video-react';
import Pagination from './pagination'

export default  class Challenge extends Component {

    constructor(props){
        super(props);
        this.state={
            result:[],
            total:0,
            page:0,
            limit:10,
            sort:''
        }
    }
    componentDidMount(){
      this.getChallageFromApi(this.state.page,this.state.limit)
    }

    getChallageFromApi=(page,limit,sort)=>{
      getChallangeList(page,limit,sort).then((result)=>{
       
        this.setState({result:[...result.result],total:result.count})
    }).catch((err)=>console.log(err))
    }

    handleVideo = (url)=>{
      this.setState({isOpen:true,videoUrl:url,isAudio:false})
  }
  handleAudio = (link) =>{
     
      let src = `${url}`
      this.setState({audioLink:link,isAudio:true})
  }

  handleClose =() =>{
      this.setState({isOpen:false})
  }

  handlePagination =(page)=> {
      
    this.getChallageFromApi(page,this.state.limit)
}
  handleFilter = () =>{

  }
  handleSort = (sort) =>{
      this.setState({sort:this.state.sort==sort?"":sort})
      this.getChallageFromApi(0,this.state.limit,sort)
  }
    

    render(){
        return (
            <React.Fragment>

              <h1>Challanges</h1>
              {this.state.isAudio&&  
                    <div className="audio-player">
                    <audio controls src={this.state.audioLink}/>  
                   </div>}
                <div className={this.state.isOpen?"player":""}>
                  
                      
                {this.state.isOpen&& <div className="playerInside">
                <Button onClick={this.handleClose}><i className="material-icons">close</i></Button>
                   
                        <Player width={0} height={0}    src={this.state.videoUrl}>
                    <BigPlayButton position="center" />
                    </Player>
                         
                    </div>}
               
                </div>
            <Table responsive>
            <thead>
              <tr>
               
                <th>Title</th>
                <th>Description</th>
                <th>Challenge</th>{/* arrow_drop_up */}
                <th onClick={()=>this.handleSort('support')} >Support <i className="material-icons sort" >{this.state.sort=="support"?"arrow_drop_up":"arrow_drop_down"}</i></th>
                <th onClick={()=>this.handleSort('ratings')}>Rating <i className="material-icons sort">{this.state.sort=="ratings"?"arrow_drop_up":"arrow_drop_down"}</i></th>              
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((each,i)=>
                  <tr key={i}>
                  <td>{each.title}</td>
                  <td>{each.discription}</td>
                   <td className="toogle">{ each.fileType === "image" ? (<img src={`${url}${each.fileLink[0]}`} />):(each.fileType ==="audio")?
              
               
              <button className="btn" onClick={()=>this.handleAudio(`${url}${each.fileLink[0]}`)}><i class="material-icons">
              audiotrack
              </i></button>
          :
           <button className="btn" onClick={()=>this.handleVideo(`${url}${each.fileLink[0]}`)}><i class="material-icons">video_label</i></button> } </td> 
                  <td>{each.support}</td>
                  <td>{each.ratings}</td>
              </tr>)}
          
              
            
            </tbody>
          </Table>

          <Pagination total={this.state.total} limit={this.state.limit} handlePagination = {(value)=>this.handlePagination(value)}/>
            
            </React.Fragment>
        )
    }






}