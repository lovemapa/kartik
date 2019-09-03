import React ,{Component} from 'react'
import {Form,Button,Col} from 'react-bootstrap'
import {contest,createContest,getNicheList} from '../api/apiService'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu,Dropdown,isOpen, DropdownItem } from 'reactstrap';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from 'reactstrap';
import RulesModal from './../elemnts/model'

export default class CreateContest extends Component {

    constructor(props){
        super(props);
        this.state={
            err:[],
            result:[],
            checked:false,
            rules:[],
            indexes:[],
            ruleList:{},
            title:'',
            discription:'',
            file:null,
            niche:'Niche',
            dropdownField:[],
            about:{},
            isOpen:false
            
        }
    }

        componentDidMount(){
           
            contest().then((result)=>{
               this.getNiche()
       
                this.setState({result:[...result]})
            }).catch((err)=>console.log(err))
            
        }



        getNiche=()=>{
            getNicheList({limit:0,page:0}).then(data=>{
              
                this.setState({dropdownField:[,...data.result.map((each)=>each.niche)]})
            })
        }
        handleCheckBox = (event,i) =>{
           
            
            if(event.target.checked){

                
                this.setState({rules:[...this.state.rules,event.target.value],indexes:[...this.state.indexes,i]})
            }else{
               
                let obj = this.state.ruleList

                for (let field in obj){
                    delete obj[event.target.value]
                }
                this.setState({rules:[...this.state.rules.filter((each)=>
                    each!==event.target.value
                )],indexes:[...this.state.indexes.filter((each)=>each!==i)],ruleList:{...obj}})
            }
            
        }

        handleRadio = (event) =>{
            let {name,value} = event.target
          
            value = isNaN(value) ? value:parseInt(value)
            let obj =this.state.ruleList
           for(let field in obj){
               if(field==name){
                delete obj[name]
               }
               
           }
           let discription =this.state.result.filter((each)=>each.ruleName===name)[0].discription
     
            this.setState({ruleList:{...obj,[name]:value},about:{...this.state.about,[name]:discription}})
        }
        handleValidation = () =>{
            let err =[]
            if(this.state.title.length==0){
              err.push("Title required")
            }
            if(this.state.discription.length==0){
              

                err.push("Discription required")
            }   
            if(!this.state.file){
            
                err.push("Banner required")
            }
            if(this.state.niche.length==0){
            
                err.push("Niche  required")
            }
         
            if(Object.keys(this.state.ruleList).length <this.state.result.length){
                    err.push("select all rules")
            }
            if(err.length>0){
                this.setState({err:[err[0]]})
            }
            return err.length>0?false:true
            
        }

        handleSubmit = (event) =>{
            event.preventDefault()
            if(!this.handleValidation()){
             
            }else{
                
            
            let formdata = new FormData()
            formdata.set('title',this.state.title)
            formdata.set('discription',this.state.discription)
            formdata.set('rules',JSON.stringify([this.state.ruleList,this.state.about]))
            formdata.append('file',this.state.file)
            formdata.set('userId',"5cd535eeb931d94c6c2a0497")
            formdata.set('niche',this.state.niche)
            
            
            createContest(formdata).then((result)=>{
              
                this.props.history.push('contest')
                toast("success")
            }).catch((err)=>{
                toast(err)
            
            })
        }
        }

        handleFile = (event) =>{
          
            this.setState({file:event.target.files[0]})
        }
        handleChange =(e) =>{
            
        }
        handleNiche = (e) =>{
          
            this.setState({niche:e.target.value,isOpen:false})
        }
        toogle = () =>{
            this.setState({isOpen:!this.state.isOpen})
        }

    render(){
      
        return (
            <React.Fragment>
              

                    {this.state.err.length>0&&<Alert color="danger">{this.state.err[0]}</Alert>}

                    <div class="contest_btn">
            <h1>Contest</h1>
            
             <Button color="primary" onClick={this.pushTocreateContest}>Back to List</Button></div>
                <div class="add_contest">
                <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={(e)=>{this.setState({title:e.target.value})}}  placeholder="Title"/>
                </Form.Group>
                
            
                </Form.Row>

                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e)=>{this.setState({discription:e.target.value})}} placeholder="Description" />
                </Form.Group>

                

                <Form.Row>
                   {/*  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                    </Form.Group> */}

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Banner</Form.Label>
                        <input className="upload_btn" type="file" name ="file" onChange={this.handleFile} />
                    
                    
                   {/*  <Form.Control as="select">
                        <option>Choose...</option>
                        <option>...</option>
                         </Form.Control> */}
                    </Form.Group>
          
                    <Form.Group as={Col} controlId="formGridZip">
                      
               
                <div className="nicheDropdown">

                <Dropdown isOpen={this.state.isOpen} toggle={this.toogle}>
  <DropdownToggle caret>
  {this.state.niche}
  </DropdownToggle>
  <DropdownMenu
    modifiers={{
      setMaxHeight: {
        enabled: true,
        order: 890,
        fn: (data) => {
          return {
            ...data,
            styles: {
              ...data.styles,
              overflow: 'auto',
              maxHeight: 200,
            },
          };
        },
      },
    }}
  >
    {this.state.dropdownField.map((each,i)=>  <DropdownItem  key={i} onClick ={this.handleNiche} value={each} >{each}</DropdownItem>)}
    
  </DropdownMenu>
</Dropdown>
                
               
               
            
                </div>
         
            </Form.Group> 
                </Form.Row>

                <Form.Group id="formGridCheckbox">
             
              
                  
                </Form.Group>
                {this.state.result.map((each,i)=> {
                    return ( <div className ="checkBoxHandle" key={i}>
                         
                         <span><input type="checkbox"
                            name={each.ruleName}   
                            onChange={(e)=>this.handleCheckBox(e,i)} 
                            value={each.ruleName}/> {each.discription} </span>
                          
                          { /* console.log(this.state.indexes.indexOf(i)>-1,each.possibleValue) */ }{ this.state.indexes.indexOf(i)>-1
                        &&  each.possibleValue.map(((value,n)=> <span key={n}><input name={each.ruleName} onChange={this.handleRadio} type="radio" value={value}/> {value}</span>))  }
                          <br/></div> )   })}
                        <div class="contest_add_btn">
                <Button variant="primary" type="submit">
                    Submit
                </Button></div>
                
               
                
                </Form>
                </div>
              
            
            </React.Fragment>
        )
    }

}