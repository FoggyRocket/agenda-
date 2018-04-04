import React, {Component,Fragment} from "react";
import {connect} from 'react-redux';
import {ProjectTitle as ProjectInfo} from './ProjectTitle';
import Gantt from './Gantt';
import './ProjectStyles.css';
import moment from 'moment';


class DetailProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    goToEdit = () => {
        this.props.history.push(`/agenda/project/${this.props.id}`)
    };

    render() {
        const {project,fetched,tasks} = this.props;
        console.log(tasks)
        const mytasks = tasks.map( task => ({
            id: task.id,
            text: task.name,
            start_date: moment(task.starts, moment.ISO_8601).format('DD-MM-YYYY'),
            // duration: moment(task.expiry, moment.ISO_8601).from(moment(task.starts, moment.ISO_8601)),
            duration:3,
            progress: 1
        }));
        let newList = []
        tasks.forEach(function(tasks) {
            var singleObj = {}
            singleObj['text'] = tasks.name;
            singleObj['id'] = tasks.id;
            singleObj['start_date']=moment(tasks.starts, moment.ISO_8601).format('DD-MM-YYYY');
            singleObj['duration']=3;
            singleObj['progress']=1;
            newList.push(singleObj);
        });
        console.log(newList)
        const data = {
            data: newList,
            links: [     ]

          // data:[
          //     {id:9, text:"Saber como construir", start_date:"12-04-2018", duration:3},
          //     // {id:2, text:"Task #1",       start_date:"12-04-2013", duration:3, parent:1},
          //     // {id:3, text:"Alpha release",   parent:1,
          //     //     start_date:"14-04-2013"},
          //     // {id:4, text:"Task #2",       start_date:"17-04-2013", duration:3, parent:1}
          //   ],
          // links:[]
        };
        console.log(data)
        return (
            <Fragment>
                {
                    !fetched ? <h1>Loading</h1> :
                        <div className="detail">
                            <ProjectInfo
                                project={project}
                                goToEdit={this.goToEdit}
                            />
                            <div style={{height: 500, width: '100%'}}>
                                <Gantt tasks={data}/>
                            </div>
                        </div>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const project = state.projects.list.filter( project => project.id == id)[0];
    const tasks = state.tasks.list.filter( task => task.project == id);
    return {
        id,
        project,
        fetched: state.projects.areFetched,
        tasks
    }

};

DetailProjectPage = connect(mapStateToProps,{})(DetailProjectPage);
export default DetailProjectPage;
