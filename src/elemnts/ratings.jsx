import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {
  const [value, setValue] = React.useState(2.5);

  return (
    
      <Box component="fieldset" mb={3} borderColor="transparent">
       {/*  <Typography component="legend">Controlled</Typography> */}
        <Rating
          name="simple-controlled"
          value={props.value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
    
  );
}