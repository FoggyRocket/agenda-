import React from 'react';
import * as $ from "jquery";
import {List, ListItem} from 'material-ui/List'
import * as tasksActions from '../../redux/actions/tasksActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loader from '../common/Loading';


import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddTask from "./AddTask";


const styledIconButton = {
    width: 40,
    height: 40,

};

class EditTask extends React.Component {

    state = {
        open: false,
        newTask:[],
        menu:[{
            id:1,
            value:"Q3"
        },
            {
                id:2,
                value:"Q2"
            },
            {
                id:3,
                value:"Q1"
            }],
        priority:null


    };









    handleChange = e => {
        let newTask = Object.assign({},this.state.newTask);
        newTask[e.target.name] = e.target.value;
        this.setState({newTask});
    };

    handleDatePickerChange = (e, date) => {
        let newTask = this.state.newTask;
        newTask['start'] = date;
        this.setState({
            newTask,

        });
        console.log("Demito newTask:", newTask)
    };

    handleDatePickerEnd = (e, date) => {
        console.log(date)
        let newTask = this.state.newTask;
        newTask['end'] = date;
        this.setState({
            newTask,

        });
        console.log("Demito newTask:", newTask)
    };

    handleSubmit = e => {
        e.preventDefault();
        let {newTask} = this.state;
        newTask['meeting_id']=null;
        newTask['user_id']=this.props.user.id;
        newTask['project_id'] = null;
        console.log("Event: ",this.state.newTask)
        //this.props.tasksActions.saveTask(newTask);

    };


    priorityHandle = value =>{
        let newTask = this.state.newTask;
        newTask['priority']=value;
        this.setState({
            newTask
        })
        console.log("Dylan", newTask)
    }

    phandleChange = (event, index, value)=>{
        this.setState({
            priority:value
        })
    }



    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.close}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleSubmit}
            />,
        ];

        return (
            <div>

                <Dialog
                    title="Agregar nueva tarea"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.close}
                    contentStyle={{width:'50%', minWidth:'250px'}}
                    autoScrollBodyContent={true}
                >
                    <AddTask
                        handleChange={this.handleChange}
                        onDatePickerChange={this.handleDatePickerChange}
                        onSubmit={this.handleSubmit}
                        handleDatePickerEnd={this.handleDatePickerEnd}
                        menu={this.state.menu}
                        priorityHandle={this.priorityHandle}
                        phandleChange={this.phandleChange}
                        priority = {this.state.priority}

                    />
                </Dialog>

            </div>
        )
    }

}
/*
function mapsStateToProps(state, ownProps) {
    return{
        myTasks:state.tasks.myTasks,
        user:state.user.object,
        fetched:state.tasks.myTasks !== undefined && state.user.object !== undefined
    }
}

function mapDispatchToProps(dispatch) {
    return{
        tasksActions: bindActionCreators(tasksActions, dispatch)
    }
}

Events = connect(mapsStateToProps, mapDispatchToProps)(Events);*/

export default EditTask;