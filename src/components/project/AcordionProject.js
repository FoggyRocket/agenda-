import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MeetingsListUser from '../meetings/MeetingsListUser';



export default class AcordionProject extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled:true,
            active:false
        };
    }

    /**/



    render(){


        return(
            <div style={{width:'25%',display:'flex',justifyContent:'center'}}>

                <Card style={{marginTop:'13px', position:'absolute'}} containerStyle={{paddingBottom:'none'}}>
                    <CardHeader
                        title={"USUARIOS ("+this.props.project.participants.length+")"}
                        actAsExpander={true}
                        showExpandableButton={true}
                        titleStyle={{textAlign:'start',color:'white'}}
                        style={{backgroundColor:"#63a2f1",textAlign:'start'}}
                    />
                    <CardText expandable={true} style={{padding:'none',paddingBottom:'0px'}}>
                        <MeetingsListUser
                            employees={this.props.employees}
                            meeting={this.props.project}
                            openListAdd={this.props.openListAdd}
                            isStaff={this.props.isStaff}
                        />
                    </CardText>
                </Card>
            </div>
        );
    }
}
const style = {
    btnNew:{
        marginTop:'5px',
    }
};
