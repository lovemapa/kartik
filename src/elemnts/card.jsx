import React from 'react';
import { Card, CardTitle, CardImgOverlay ,Button, Row, Col} from 'reactstrap';

const Cards = (props) => {
  return (
    <Row  >
    <Col sm="2">
    
    <Card className="Card" body inverse style={{ backgroundColor: '#fff' }}>
   
    <CardImgOverlay>
      <CardTitle className="cardTitle">{props.title}</CardTitle>
      {/* <CardText className="cardText"> </CardText> */}
       <Button color="secondary" disabled>{props.value}</Button>
     
    </CardImgOverlay>
  </Card>
    </Col>
         
    </Row>
  );
};
export default Cards