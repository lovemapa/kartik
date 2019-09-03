import React ,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [rules,setRules] =React.useState([])
  const [values,setValues] =React.useState([])

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
      props.closeModel()
    setOpen(false);
  };

  useEffect(()=>{
      setOpen(props.open)
  },[props.open])

 useEffect(()=>{
  
     let heading = []
     let headValues =[]
     let arr =[]
    for(let val in props.rules[0]){
        
        headValues.push(props.rules[0][val])
        console.log(val)
    }

    for(let val in props.rules[1]){
        
        heading.push(props.rules[1][val])
        console.log(val)
    }
    for(let i=0;i<heading.length;i++){
        arr.push({k:heading[i],v:headValues[i]})
    }
    setRules(arr)
    setValues(headValues)
    setOpen(props.open)
    
  },[props.rules])
  console.log(rules)

  return (
    <div>
      
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="modal-title">Rules</h2>
            {rules.map((each)=> <div><span>{each.k}:{each.v}</span> <br/></div>  )}
         
        </div>
      </Modal>
    </div>
  );
}