import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tasksActions from '../../redux/actions/tasksActions';
import * as userAllActions from '../../redux/actions/userAllActions';
import {Toast, ToastDanger} from 'react-toastr-basic';




class NewLightBox extends React.Component {
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
        let newDate=  new Date(date)
        newDate.setHours(0,0,0,0)
        task['start'] = newDate;
        this.setState({task})
        console.log(task)
    };
    dateFinish = (e,date) => {
        let task= Object.assign({},this.state.task);
        let newDate=  new Date(date)
        newDate.setHours(23, 59, 59, 999)
        task['end'] = newDate ;
        this.setState({task})
        console.log("fecha final",task)
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
            // write your functionality here
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        let newTask= Object.assign({},this.state.task);
        newTask['meeting_id']=null;
        newTask['project_id']=this.props.id;

        if(newTask.start == null && newTask.end == null){
            ToastDanger("Por favor llena todos los campos")
        }else{
            this.props.tasksActions.saveTask(newTask)
                .then(r=>{
                    Toast('¡Nueva tarea agregada!')
                    this.props.close();

                }).catch(e=>{
                console.log(e)

                for (let i in e.response.data){
                    ToastDanger(e.response.data[i])
                }

            });
        }





    };
    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onClick={this.props.close}
            />,
            <FlatButton
                label="Guardar"
                primary={true}
                onClick={this.onSubmit}
            />,
        ];

        const dataSourceConfig = {
            text: 'username',
            value: 'id',
        };

        let {userAll} = this.props;

        let p =this.props.participants;

        console.log("participantes",p)
        return (
            <Dialog
                title="Nueva Tarea"
                modal={false}
                open={this.props.open}
                contentStyle={{}}
                bodyStyle={{display:'flex', justifyContent:'space-around'}}
                onNewRequest={this.props.close}
                actions={actions}
            >
                <div>
                    <TextField
                        floatingLabelText="Nombre de la tarea"
                        name="title"
                        required
                        onChange={this.taskHandleChange}
                    /><br/>
                    <TextField
                        name='text'
                        required={true}
                        style={{textAlign:'start'}}
                        floatingLabelText="Descripción"
                        multiLine={true}
                        onChange={this.textHandleChange}
                        rows={2}
                    /> <br/>
                    <AutoComplete
                        floatingLabelText="¿Quien lo hara?"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={p}
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
                        autoOk={true}
                        onChange={this.dateStart}
                    /><br/>
                    <DatePicker
                        name='end'
                        floatingLabelText="Fecha de termino"
                        autoOk={true}
                        onChange={this.dateFinish}
                    />
                    <SelectField
                        style={{textAlign:'start'}}
                        floatingLabelText="Prioridad"
                        value={this.state.priority}
                        onChange={this.phandleChange}
                    >
                        { this.state.menu.map(data =>
                            <MenuItem key={data.id}  value={data.id}  primaryText={data.value} onClick={()=>this.priorityHandle(data.value)}   />
                        )}
                    </SelectField>
                </div>

            </Dialog>
        );
    }
}


function mapStateToProps(state, ownProps) {

    let tasks = state.tasks.list;


    return {
        userAll: state.userAll.list,
        tasks,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        userAllActions:bindActionCreators(userAllActions,dispatch),
        tasksActions:bindActionCreators(tasksActions,dispatch),
    }
}

NewLightBox = connect(mapStateToProps, mapDispatchToProps)(NewLightBox);
export default NewLightBox;
