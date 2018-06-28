import React from 'react';
import * as $ from 'jquery';
import 'fullcalendar';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import '../../../node_modules/jquery/dist/jquery.js';
import '../../../node_modules/jquery/dist/jquery.min';
import '../../../node_modules/jquery-ui-dist/jquery-ui.min';
import '../../../node_modules/moment/moment.js';

import './Calendar.css';

import * as tasksActions from '../../redux/actions/tasksActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loader from '../common/Loading';
import moment from 'moment';
import EditTask from "./EditTask";


const style = {
    color: "white"
};

class Calendar extends React.Component {
    state = {
        open:false,
        tareitas:{},
    }

    prueba = ()=>{

        let tareitas = this.props.myTasks.map( task => ({
            id: task.id,
            title: task.title,
            start: task.start,
            allDay:task.allDay,
            end:new Date((new Date(task.end)).setDate((new Date(task.end)).getDate() +1)),
            text:task.text,
        }));
        this.setState({tareitas})
    }
    handleOpen = () => {
        let {open} = this.state;
        open = !open
        this.setState({open});
    };
    updateTasks=(tasks)=>{

        let tareitas = tasks.map( task => ({
            id: task.id,
            title: task.title,
            start: task.start,
            allDay:task.allDay,
            end:new Date((new Date(task.end)).setDate((new Date(task.end)).getDate() +1)),
            text:task.text,
        }));
        //let listTasks = this.props.myTasks;
        $('#calendar').fullCalendar('destroy');

        /*$('#calendar').fullCalendar({
            defaultView: 'basicWeek'
        });*/

        $('#calendar').fullCalendar({
            header: {
                right:'prev, next',
            },
            defaultView: 'agendaDay',

            //displayEventTime: false,
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function () {
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },

            events: tareitas



        })


    };


    componentDidMount() {

        this.updateTasks(this.props.myTasks)
    }
    componentDidUpdate(){

        this.updateTasks(this.props.myTasks)
    }

    render() {
        let {myTasks, fetched} = this.props;

        if(!fetched)return<Loader/>
        console.log("myTasks",myTasks)

        return (
            <div className={'cal-container'}>

                <div id="calendar"></div>
                <EditTask open={this.state.open} close={this.handleOpen}/>
            </div>

        );
    }
}

function mapsStateToProps(state, ownProps) {
    return{
        myTasks:state.tasks.myTasks,
        fetched:state.tasks.myTasks !== undefined
    }
}

function mapDispatchToProps(dispatch) {
    return{
        tasksActions: bindActionCreators(tasksActions, dispatch)
    }
}

Calendar = connect(mapsStateToProps, mapDispatchToProps)(Calendar);

export default Calendar;