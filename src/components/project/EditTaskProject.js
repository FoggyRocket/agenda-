import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import Icon from 'material-ui/svg-icons/action/delete';
import {IconButton} from 'material-ui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tasksActions from '../../redux/actions/tasksActions';
import * as userAllActions from '../../redux/actions/userAllActions';
import {Toast, ToastDanger} from 'react-toastr-basic';

class AlertProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {menu:[
                {id:1,
                    value:'Q3'},
                {id:2,
                    value:'Q2'},
                {id:3,
                    value:'Q1'}
            ],
            task:{},
            priority:null,
            Edit:true,
            openDelete:false,

        }
    }


    //text Name task
    taskHandleChange = (e) => {
        let task = Object.assign({}, this.state.task);
        task[e.target.name] = e.target.value;
        this.setState({task});
        console.log(task)
    };
    //text descripction task
    textHandleChange = (e) => {
        let task = Object.assign({}, this.state.task);
        task[e.target.name] = e.target.value;
        this.setState({task});
        console.log(task)
    };
    //date
    dateStart = (e,date) => {
        let task= Object.assign({},this.state.task);
        task['start'] = date;
        this.setState({task})
        console.log(task)
    };
    dateFinish = (e,date) => {
        let task= Object.assign({},this.state.task);
        task['end'] = date;
        this.setState({task})
        console.log(task)
    };
    //Priodridad de tarea
    priorityHandle=(value)=>{
        let task= Object.assign({},this.state.task);
        task['priority'] =value
        this.setState({task})
        console.log(task)
    }
    phandleChange = (event, index, value) => {

        this.setState({priority:value})
        console.log("")
    };
    //User task
    userHandelChange = (chosenRequest, index)=>{
        let task= Object.assign({},this.state.task);
        task['user_id'] =chosenRequest.id
        this.setState({task})
        console.log(task);
    }
    enter = (e) => {
        if (e.which ===13) {
            console.log('Enter ke pressed');
            e.preventDefault();

        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        let newTask= Object.assign({},this.state.task);
        let {Edit}=this.state;
        //newTask['meeting_id']=null;
        newTask['id']=this.props.id;
        this.props.tasksActions.editTask(newTask)
            .then(r=>{
                Toast('¡Tarea editada correctamente!')
            }).catch(e=>{
            console.log(e)
            ToastDanger('¡Algo paso!')

        });

        this.setState({Edit:true})
        this.props.close();
    };
    //Active Edit
    edit=()=>{
        let {Edit}=this.state;
        let task= Object.assign({},this.state.task);
        task = {}
        Edit = !Edit ;
        this.setState({Edit,task})

    }
    //Delete Modal
    delete=()=>{
        let {openDelete}=this.state;
        openDelete= !openDelete;
        this.setState({openDelete})
    }
    //Confirm Delete
    confirmDelete=()=>{
        let id = parseInt(this.props.id)
        this.props.tasksActions.deleteTask(id)
            .then(r=>{
                Toast('¡Tarea eliminada!')


            }).catch(e=>{
            console.log(e)

            ToastDanger('¡Algo paso!')

        });
        this.delete();
        this.props.close();
        console.log("se fue")
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.close}
            />,

            <FlatButton
                label="Editar"
                primary={true}
                onClick={this.edit}
            />
        ];
        const actionUser =[
            <FlatButton
                label="Cerrar"
                primary={true}
                onClick={this.props.close}
            />
        ];
        const actionsEdit =[
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.edit}
            />,
            <FlatButton
                label="Guardar"
                primary={true}
                onClick={this.onSubmit}

            />
        ];
        const actionsDelete =[
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.delete}

            />,
            <FlatButton
                label="Eliminar"
                primary={true}
                onClick={this.confirmDelete}

            />
        ];

        const dataSourceConfig = {
            text: 'username',
            value: 'id',
        };

        let task = this.props.tareas.filter(task => task.id == this.props.id)[0];
        if(task == undefined){
            return false
        }
        let date_start = new Date(task.start);
        let date_finish = new Date(task.end);

        const Titulo = [
            <div style={{display:'flex',padding:'10px'}}>

                    <TextField
                        key={1}
                        name="title"
                        defaultValue={task.title}
                        required
                        disabled={this.state.Edit}
                        inputStyle={{textAlign:'center'}}
                        underlineStyle={{display :  ' none '}}
                        onChange={this.taskHandleChange}
                        fullWidth={true}
                    />
                {this.props.user ?
                    <IconButton onClick={this.delete}>
                        <Icon/>
                    </IconButton>
                    : false
                }
            </div>

        ];
        let {userAll} = this.props;
        return (
            <div>
                <Dialog
                    title={Titulo}
                    modal={false}
                    open={this.props.open}
                    titleStyle={{backgroundColor:'blue'}}
                    bodyStyle={{display:'flex', justifyContent:'space-around'}}
                    onRequestClose={this.props.close}
                    actions={!this.props.user ? actionUser: [(this.state.Edit ? actions: actionsEdit)]}
                >
                    <Dialog
                     title={"¿Quieres eliminar esta tarea?"}
                     modal={false}
                     open={this.state.openDelete}
                     actions={actionsDelete}
                     titleStyle={{padding:'24px 24px 10px', fontSize:'18px',lineHeight: '16px'}}
                     contentStyle={{width:'254px'}}
                     bodyStyle={{padding:'0'}}
                    />

                    <div>
                        <TextField
                            name='text'
                            required={true}
                            style={{textAlign:'start'}}
                            floatingLabelText="Descripción"
                            defaultValue={!task.text ? "Sin Descripción" : task.text}
                            multiLine={true}
                            disabled={this.state.Edit}
                            onChange={this.textHandleChange}
                            rows={2}
                        /> <br/>

                        <AutoComplete
                            floatingLabelText="¿Quien la hara?"
                            floatingLabelFixed={true}
                            filter={AutoComplete.fuzzyFilter}
                            disabled={this.state.Edit}
                            hintText={!task.user ?  "Sin Asignar" : task.user.username}
                            dataSource={userAll}
                            dataSourceConfig={dataSourceConfig}
                            maxSearchResults={5}
                            onNewRequest={this.userHandelChange}
                            onKeyPress={this.enter}
                        />
                    </div>
                    <div>
                        <DatePicker
                            name='start'
                            floatingLabelText="Fecha de inicio"
                            defaultDate={date_start}
                            autoOk={true}
                            onChange={this.dateStart}
                            disabled={this.state.Edit}
                        /><br/>
                        <DatePicker
                            name='expiry'
                            floatingLabelText="Fecha de termino"
                            defaultDate={date_finish}
                            disabled={this.state.Edit}
                            autoOk={true}
                            onChange={this.dateFinish}
                        />
                        <SelectField
                            disabled={this.state.Edit}
                            style={{textAlign:'start'}}
                            floatingLabelText="Prioridad"
                            floatingLabelFixed={true}
                            value={this.state.priority}
                            onChange={this.phandleChange}
                            hintText={!task.priority ? "Sin asignar":task.priority}
                        >
                            { this.state.menu.map(data =>
                                <MenuItem key={data.id}  value={data.id}  primaryText={data.value} onClick={()=>this.priorityHandle(data.value)}   />
                            )}
                        </SelectField>
                    </div>

                </Dialog>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {




    return {
        userAll: state.userAll.list,

    }
}

function mapDispatchToProps(dispatch) {
    return{
        userAllActions:bindActionCreators(userAllActions,dispatch),
        tasksActions:bindActionCreators(tasksActions,dispatch),
    }
}

AlertProject = connect(mapStateToProps, mapDispatchToProps)(AlertProject);
export default AlertProject;






