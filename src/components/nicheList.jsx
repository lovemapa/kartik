import React, {Component} from 'react'
import {getNicheList,addNiche,NicheDelete} from './../api/apiService'
import {Table,Button} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import Chip from './chip'
import Pagination from './pagination'




class Niche extends Component{

    constructor(props){
        super(props);
        this.state={
            niche:[],
            name:'',
            total:12,
            add:false,
            limit:4,
            file:null
        }
       
    }

    componentDidMount(){
        this.getNiche(0,this.state.limit)
      }

    getNiche =(page,limit) =>{
        getNicheList({page,limit}).then((data)=>{
          
            this.setState({niche:[...data.result],total:data.count})
        }).catch((err)=>{

        })
    }
    pushToAddNiche=()=>{
        this.setState({add:true})
    }
    addNiche =() =>{
        addNiche(this.state.name,this.state.file).then((result)=>{
            this.getNiche(0,this.state.limit)
            this.setState({add:false,file:null})
        }).catch((err)=>{
            
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
              });
        })
    }
    deleteNiche =(id) =>{
        NicheDelete(id).then((result)=>{
            this.getNiche(0,this.state.limit)
        }).catch((err)=>{
            
        })
    }
    handlePagination =(page)=> {
      
     this.getNiche(page,this.state.limit)
    }

    handleNicheFile =(e) =>{

        if(e.target.files[0].type.search('image')!==-1){
            this.setState({file:e.target.files[0]})
        }else{
            toast.error('Invalid File Type')
        }
        
    }


    render(){
        return (
            <div>
             
                <div class="niche_btn"><h2>Niche</h2>  <Button color="primary" onClick={this.pushToAddNiche}><div class="contest_niche">Add new Niche</div></Button> 
               
                    
                </div>{this.state.add&& <div className="newNiche">
                <input type="text" name="niche" onChange= {(e)=>{this.setState({name:e.target.value})}} /> 
                    
                    <input type="file" className="nicheFile" name="" id="" onChange={(e)=>{this.handleNicheFile(e)}}/>
                 <Button disabled={!(this.state.name.length>3&&this.state.file)} onClick={this.addNiche} color="primary add_btn" ><i class="material-icons">
                         add_alarm
                    </i></Button> 


                </div>}
              
                 <Table responsive>
                 <thead>
              <tr>

               <th></th>
                <th>Niche</th>
                <th>Sub Categories</th>
                <th>Action</th>
               
              </tr>
            </thead>
                
                {this.state.niche.map((each,i)=>
                    <tr>
                        <td>{i}</td>
                        <td> {each.niche}</td>
                        <td><Chip niche= {each } getNiche={()=>{this.getNiche()}}/></td>
                        <td> <div className="delete"><button onClick={()=>this.deleteNiche(each._id)}> <img src={process.env.PUBLIC_URL + '/images/icon2.png'}  /></button> </div></td>
                   
                    </tr>

                    )}

               
                </Table>
            
                <Pagination total ={this.state.total} limit={4} limit={this.state.limit} handlePagination = {(value)=>this.handlePagination(value)}/>
            </div>
        )
    }
}

export  default Niche