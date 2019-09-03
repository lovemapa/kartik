import React ,{Component} from 'react'
import {Table} from 'react-bootstrap'
import {spotliteList} from './../api/apiService'
import {url} from './../api/apiService'
import {Button} from 'reactstrap'
import Pagination from './pagination'
import { Player, BigPlayButton } from 'video-react';


export default  class SpotLite extends Component {

    constructor(props){
        super(props);
        this.state={
            result:[],
            limit:10,
            total:5
            
        }
    }

    componentDidMount(){
       this.getSpotliteApi(0,4)
    }
    getSpotliteApi=(page,limit) =>{
        spotliteList(page,limit).then((result)=>{
            this.setState({result:[...result.result],total:result.count})
        }).catch((err)=>{
            console.log(err)
        })
    }

    handleVideo = (url)=>{
        this.setState({isOpen:true,videoUrl:url})
    }
    handleAudio = (link) =>{
       
        let src = `${url}`
        this.setState({audioLink:link,isAudio:true})
    }

    handleClose =() =>{
        this.setState({isOpen:false})
    }
    handlePagination =(page)=> {
      
        this.getSpotliteApi(page,this.state.limit)
    }

    render(){
        return (
            <React.Fragment>
              
            <h1>Spotlight</h1>
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
            {!this.state.isOpen&&<Table responsive>
            <thead>
              <tr>
               
                <th>Title</th>
                <th>Description</th>
                <th>spotlight</th>
                
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((each,i)=>
                  <tr key={i}>
                  <td>{each.title}</td>
                  <td>{each.discription}</td>
                  <td className="toogle">{ each.fileType === "image" ? (<img src={`${url}${each.fileLink[0]}`} />):(each.fileType ==="audio")?
              
               
              <Button className="media" onClick={()=>this.handleAudio(`${url}${each.fileLink[0]}`)}><i class="material-icons">
              audiotrack
              </i></Button>
          :
           <Button className="media" onClick={()=>this.handleVideo(`${url}${each.fileLink[0]}`)}><i class="material-icons">video_label</i></Button> } </td> 
              
              </tr>)}
             
            </tbody>
          </Table>}
          <div className="pagination">


                <Pagination total ={this.state.total} limit={this.state.limit} handlePagination = {(value)=>this.handlePagination(value)}/>
                </div>
            </React.Fragment>
        )
    }






}

