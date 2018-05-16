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

const style = {
    color: "white"
};

class Calendar extends React.Component {


prueba = ()=>{
    console.log("Hola si funciono")
}
    updateTasks=(tasks)=>{
        //let listTasks = this.props.myTasks;
        $('#calendar').fullCalendar('destroy');
        console.log("No se que hace",tasks)
        $('#calendar').fullCalendar({
            header: {
                center: 'agendaWeek, month, agendaDay',
                right:'prev, next',
            },
            eventClick:(calEvent, jsEvent, view)=> {

                var moment = $('#calendar').fullCalendar('getDate');
                alert("The current date of the calendar is " + moment.format());
                console.log("DYLAN", calEvent)
                },
            eventDrop:(event, delta, revertFunc)=> {
                var dateStart= new Date(event.start)
                console.log("Arrastro", dateStart)
                this.prueba()
                alert(event.title + " was dropped on " + event.start.format());
            },
            eventResize:(event, jsEvent, ui, view)=>{
                var dateEnd= new Date(event.end)
                alert(event.title +"fue arrastrado en "+ event.end);
                console.log("Arrastro 2",dateEnd)

            },
            displayEventTime: false,
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function () {
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },

            events: tasks
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
        console.log("Mis tareas Calendar:", myTasks)


        return (
            <div className={'cal-container'}>
                <div id="calendar"></div>

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