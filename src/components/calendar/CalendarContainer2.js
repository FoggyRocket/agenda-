import React from 'react';
import Events from './Events2'
import Calendar from './Calendar';
import AgendaView from './AgendaView'
import './Calendar.css';




class CalendarContainer extends React.Component {
    render() {
        return (
            <div className={'conenedor-cal-task'}>
                <Events/>
                <Calendar/>

            </div>
        );
    }
}

export default CalendarContainer;
