import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function Switches(props) {
  const [state, setState] = React.useState({
    checkedA: props.type,
    checkedB: true,
  });

  const handleChange = name => event => {
      console.log(name,"gg",event.target.checked)
    setState({ ...state, [name]: event.target.checked });
    props.change({value:event.target.checked,userId:props.id})
  };
console.log(props.type)
  return (
    
      <Switch
        checked={state.checkedA}
        onChange={handleChange('checkedA')}
        value="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
     
    
  );
}
