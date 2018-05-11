import React, {Component,Fragment} from "react";
import {ProjectTitle as ProjectInfo} from './ProjectTitle';
import Gantt from './Gantt';
import './ProjectStyles.css';
import moment from 'moment';
import Loader from '../common/Loading'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewLightBox from './NewLightBox';
import AlertProject from './AlertProject';
import AcordionProject from './AcordionProject'
import AddParticipants from "../meetings/AddParticipants";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tasksActions from '../../redux/actions/tasksActions';
import * as userAllActions from '../../redux/actions/userAllActions';
import * as userActions from "../../redux/actions/userActions";
import * as employeesActions from "../../redux/actions/employeesActions";
import * as projectActions from "../../redux/actions/projectActions";
import {Toast, ToastDanger} from "react-toastr-basic";

class DetailProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openLightBox:false,
            openAlertP:false,
            id:null,
            taskId:null,
            mytasks:{},
            emploList:[],
            usersList:props.employees,
            employSelec:{},
            listAddEmp:true,
            openParticipant:false,
            user:{},
        };
    }
    //importate para el filtro
    componentWillReceiveProps(){

        this.usersList()
    }

    usersList=()=>{
        let usersList = this.props.employees;
        this.setState({
            usersList
        })
    }

    filterUserslistDisplay=()=>{
        let {usersList} = this.state;
        let project = this.props.project;
        if(project){
            let participants = project.participants;
            let filtered = usersList.filter(u=>{

                let participant = participants.find(p=>{
                    return p.id === u.id
                })
                if(participant!==undefined){
                    console.log(participant)
                    console.log(u)
                    //return u
                }else{
                    return u
                }
            })
            usersList = filtered
            console.log(usersList)
        }else{
            usersList = this.props.employees
        }
        this.setState({
            usersList
        })
    }
///////////////////////////////////////////////////////////////////77
    goToEdit = () => {
        this.props.history.push(`/agenda/project/${this.props.id}`)
    };
    openNewTask=()=>{
        let {openLightBox}=this.state;
        openLightBox = !openLightBox
        this.setState({openLightBox})
        console.log(openLightBox)
    }
    openAlert =(idT)=>{
        let {openAlertP}=this.state;
        let {id}= this.state;
        openAlertP = !openAlertP
        this.setState({openAlertP, id:idT})
    }
    //list User
    openParticipant=()=>{
        let {openParticipant} = this.state;
        openParticipant = !openParticipant;
        this.setState({openParticipant,emploList:this.props.project.participants})
        this.filterUserslistDisplay()

    }
    addEmployes=(data)=>{

        let emploList = this.state.emploList.slice();
        let usersList = this.state.usersList.slice();

        emploList.push(data);
        let filtered = usersList.filter(user=>{
            return user.id!==data.id
        })
        this.setState({
            emploList,
            usersList:filtered
        })

    }
    deleteEmployees = (data) => {
        let emploList = this.state.emploList.slice();
        let usersList = this.state.usersList.slice();

        usersList.push(data);
        let filtered = emploList.filter(user=>{
            return user.id!==data.id
        })
        this.setState({
            emploList:filtered,
            usersList
        })

    };

    openListAdd = () => {
        let {listAddEmp} = this.state;
        listAddEmp = !listAddEmp;
        this.setState({listAddEmp})
        console.log("FFFFF")
    };
    addParticipants=()=>{
        let project=this.props.project;
        let data=Object.assign({},this.state.emploList);
        let users=[];
        for(let i in data){
            users.push(data[i].id)
        }

        project['participants_id']= users;
        this.props.projectActions.updateProject(project)
            .then(r=>{
                Toast('¡Modifico correctamente!')

            }).catch(e=>{
            console.log(e)

            ToastDanger('¡Algo paso!')

        });
       this.setState({openParticipant:false})
        console.log(project)
    }
//////////////////////////////////
    prueba =(tarea)=>{
        console.log('vemos si funciona')
    }



    render() {
        let {project,fetched,tasks,id,user,employees} = this.props;
        let mytasks = Object.assign({},this.state.mytasks);
        let usersList = this.state.usersList;

        console.log(project)

        if(!fetched)return (<Loader/>)
        if(!user.is_staff && !user.is_superuser){
            tasks=project.tasks
        }
         mytasks = tasks.map( task => ({
            id: task.id,
            text: task.name,
            start_date: moment(task.starts, moment.ISO_8601).format('DD-MM-YYYY'),
            duration: parseInt(moment(task.expiry).diff(task.starts,'days'))+1,
            progress: 0
        }));
         let participants = project.participants.map(p =>({
            id: p.user.id,
            username: p.user.username,
        }));

        let data = {
            data: mytasks,
            links: [ ]
        }

        return (
            <Fragment>
                {

                        <div className="detail">
                            <NewLightBox open={this.state.openLightBox} close={this.openNewTask} id={id} participants={participants}/>
                            <AlertProject  open={this.state.openAlertP} id={this.state.id} tareas={tasks} close={this.openAlert}/>
                            <AddParticipants
                                open={this.state.openParticipant}
                                employessListAdd={this.state.emploList}
                                employees={usersList}
                                meeting={project}
                                deleteEmployees={this.deleteEmployees}
                                addEmployes={this.addEmployes}
                                addParticipants={this.addParticipants}
                                openParticipant={this.openParticipant}
                            />
                            <div style={{display:'flex'}}>
                                <ProjectInfo
                                    project={project}
                                    goToEdit={this.goToEdit}
                                />
                                <AcordionProject
                                    project={project}
                                    isStaff={user.is_staff}
                                    employees={employees}
                                    meeting={project}
                                    id={id}
                                    usersList={this.usersList}
                                    openListAdd={this.openParticipant}
                                />
                            </div>


                            <div style={{height: 500, width: '100%', display:'flex'}}>

                                <Gantt tasks={data}
                                       modalOpen={this.openAlert}
                                       deleteTask={this.state.deleteT}
                                       taskId={this.state.taskId}
                                       prueba={this.prueba}
                                />

                            </div>
                            {user.is_staff ?<div style={{display:'flex', justifyContent:'flex-end',marginRight:'20px'}}>
                                <FloatingActionButton primary="true" onClick={this.openNewTask} style={{bottom:'50px', position:'fixed'}}  >
                                    <ContentAdd />
                                </FloatingActionButton>
                            </div>: false }

                        </div>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let project;
    let user= state.user.object;
    let tasks=state.tasks.list;
    if(user.is_superuser){
        project = state.projects.list.filter( project => project.id == id)[0];
        tasks = state.tasks.list.filter(b=>{

            if ( !isNaN(b.project)) {
                return false;

            } else {
                return id == b.project.id;
            }
        })
    }else{
        project=state.projects.myProjects.find(a=>{
            return id == a.id;
        });
    }

    return {
        id,
        user,
        project,
        tasks,
        userAll: state.userAll.list,
        employees: state.employees.list,
        fetched: tasks !==undefined && project !==undefined
    }

};
function mapDispatchToProps(dispatch) {
    return{
        employeesActions:bindActionCreators(employeesActions,dispatch),
        userAllActions:bindActionCreators(userAllActions,dispatch),
        userActions:bindActionCreators(userActions,dispatch),
        tasksActions:bindActionCreators(tasksActions,dispatch),
        projectActions:bindActionCreators(projectActions,dispatch),
    }
}
DetailProjectPage = connect(mapStateToProps, mapDispatchToProps)(DetailProjectPage);
export default DetailProjectPage;
