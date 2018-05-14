/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/locale/locale_es';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './ProjectStyles.css';


export default class Gantt extends Component {

    constructor(props) {
        super(props);
        console.log("Putito", props)
    }


    initGanttEvents() {


        gantt.attachEvent("onBeforeLightbox", function (id) {
            return false;
        });
        if(this.props.user){
            gantt.attachEvent("onAfterTaskDrag", (id, mode, e)=> {
                //any custom logic here
                var task = gantt.getTask(id);
                var dateEnd = gantt.calculateEndDate(task)
                if (this.props.dragDate){

                    this.props.dragDate(task,dateEnd)
                };


            });
        }else{
            gantt.config.drag_move = false;
            gantt.config.drag_resize = false;
        }


        gantt.attachEvent('onTaskClick', (id) => {
            if (this.props.modalOpen) {
                this.props.modalOpen(id);

            }

        });

        gantt.config.columns = [
            {name: "text", label: "Task name", width: "*", tree: true},
            {name: "start_date", label: "Start time", width: 150},
            {name: "duration", label: "Duration", width: 120}
        ];
        gantt.config.drag_links = false;
        gantt.config.drag_progress = false;


    }

    componentDidMount() {

        gantt.init(this.ganttContainer);
        this.initGanttEvents();
        gantt.clearAll();
        gantt.parse(this.props.tasks);


    }


    componentDidUpdate() {

        gantt.clearAll()
        gantt.parse(this.props.tasks);
    }

    render() {

        return (

            <div
                ref={(input) => {
                    this.ganttContainer = input
                }}
                style={{width: '100%', height: '100%'}}
            >
            </div>


        );
    }
}

