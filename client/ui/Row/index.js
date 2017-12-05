
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class GridRow extends React.PureComponent{
    render(){
        return(
            <Grid fluid>
                <Row>
                    {this.props.children}
                </Row>
            </Grid>
                    
        )
    }
}

export default GridRow;

