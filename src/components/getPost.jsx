import React ,{Component} from 'react'
import {url} from './../api/apiService'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {getPosts,deletePost} from './../api/apiService'
import {  toast } from 'react-toastify';
import { Button } from 'reactstrap';
import {withRouter} from 'react-router-dom'
import { Player, BigPlayButton } from 'video-react';
import Pagination from './pagination'



 class Posts extends Component {

    constructor(props){
        super(props);
        this.state={
            result:[],
            limit:4,
            page:0,
            isOpen:false,
            videoUrl:'',
            count:null,
            total:0,
            audioLink:"",
            isAudio:false
        }
    }


     componentDidMount() {
       
        this.callPostApi(this.state.page,this.state.limit)
     }
     callPostApi(page, limit){
        getPosts({ eventId: this.props.eventId, limit: this.state.limit, page:page }).then((response) => {
           
            this.setState({ result: [ ...response.result], total: response.count })
        }).catch((err) => {
            console.log(err)
        })
     }

     handleVideo = (url) => {
         this.setState({ isOpen: true, videoUrl: url })
     }

     handleClose = () => {
         this.setState({ isOpen: false })
     }

     handlePagination = (page, limit) => {
        

         this.callPostApi(page,limit)

     }

     deletePost = (postId) => {
         deletePost(postId).then((result) => {
            this.callPostApi()
             toast(result.data)
         }).catch(error => {
             toast(error.err)
         })
     }

    handleAudio = (link) =>{
      
        this.setState({audioLink:link,isAudio:true})
    }

    render(){
        
        return (
            <React.Fragment>
                <div className="contest_btn">
                
                <span><h1>Posts</h1>
                <h3>{this.props.title}</h3></span>
                <Button color="primary contest_btn " onClick= {()=>{this.props.history.push('/contest')}}>Back To Contest</Button>
                </div>
         
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
                <th>Discription</th>
                <th>Banner</th>
             
                <th>Ratings</th>
                <th>Support</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((each,i)=>
                  <tr key={i}>
                  <td>{each.title}</td>
                  <td>{each.discription}</td>
              <td> { each.fileType === "image" ? (<img src={`${url}${each.fileLink[0]}`} />):(each.fileType ==="audio")?
              
               
                    <button className="btn" onClick={()=>this.handleAudio(`${url}${each.fileLink[0]}`)}><i class="material-icons">
                    audiotrack
                    </i></button>
                :
                 <button className="btn" onClick={()=>this.handleVideo(`${url}${each.fileLink[0]}`)}><i class="material-icons">video_label</i></button> }  </td>
             
              <td>{each.ratings}</td>
              <td>{each.support}</td>
              <td className="actions">
                  <button onClick={()=>this.deletePost(each._id)}> <img src={process.env.PUBLIC_URL + '/images/icon2.png'}  /></button>
                 </td>
              
              </tr>)}
          
              
            
            </tbody>
          </Table>}
          <div className="pagination">


          <Pagination total ={this.state.total} limit={this.state.limit} handlePagination = {this.handlePagination}/>
         </div>   
            </React.Fragment>
        )
    }
}

let mapStateToProps = (state)=>{
   
    return { eventId:state.dataReducer.contest.id,title:state.dataReducer.contest.title } 
}
export default connect(mapStateToProps)(withRouter(Posts))