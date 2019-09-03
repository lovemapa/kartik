import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AddSubNiche,uploadSubNicheImg} from './../api/apiService'
import {url} from './../api/apiService'





const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export default function Chips(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [category,changeChategory] = React.useState('')
  const [nicheId,changeNicheId] =React.useState(props.niche._id)

  const [img,changeImg] = React.useState('')

   
  function handleClickOpen() {
    setOpen(true);
   
  }

  const image = (e) =>{
  let formdata = new FormData()
 
    formdata.append('file',e.target.files[0])
    uploadSubNicheImg(formdata).then((result)=>{
       
        changeImg(result.img)

    })

  }
  const EditSubNiche = (type,name,img)=>{

      AddSubNiche({nicheId:nicheId,type,name:{name:name,img:img}}).then((result)=>{
       
        props.getNiche()
      }).catch((err)=>{
            console.log(err)
      })
  } 
  const handleAdd = () =>{
    if(category.length>0&&image.length>0){
      setOpen(false);
    
      EditSubNiche(1,category,img)
    }
   
    
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete(name) {
  
    EditSubNiche(2,name)
   
  }

  function handleClick() {
   
  }

  return (
    <div className={classes.root}>
     <div>
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add sub field under Niche
          </DialogContentText>
          <input className="upload_btn" type="file" onChange={(e)=>{image(e)}}/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Sub Category"
            type="text"
            onChange={(e)=>{changeChategory(e.target.value)}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        {props.niche.subNiche.map((each)=>
            <Chip
            avatar={<Avatar alt="Natacha" src={`${url}static/${each.img}`} />}
            label={each.name}
            onDelete={()=>handleDelete(each.name)}
            className={classes.chip}
          />
        )}

      
      <Chip
        avatar={<Avatar>
            <FaceIcon />
          </Avatar>}
        label="Add Category"
        onClick={handleClickOpen}
        className={classes.chip}
      />
      
    </div>
  );
}
