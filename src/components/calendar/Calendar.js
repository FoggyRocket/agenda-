import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AgendaView from './AgendaView';
import WeekView from './WeekView';
import MonthView from './MonthView';


const Pages = ({props}) => (
    <Switch>

        <Route path="/agenda/tasks/Agenda" component={AgendaView}/>
        <Route exact path="/agenda/tasks" component={MonthView}/>
        <Route path="/agenda/tasks/Week" component={WeekView}/>
    </Switch>

);
export default Pages;
